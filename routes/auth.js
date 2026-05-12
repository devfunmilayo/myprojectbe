const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { sendWelcomeEmail } = require("../utils/email");

const router = express.Router();

const safeUser = (user) => ({
  id: user._id,
  firstname: user.firstname,
  lastname: user.lastname,
  email: user.email,
  title: user.title,
  isSeller: user.isSeller,
  isNewUser: user.isNewUser,
  avatar: user.avatar,
});

router.post("/signup", async (req, res) => {
  const { firstname, lastname, email, title, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      title,
      password: hashedPassword,
      isSeller: false,
      isNewUser: true,
    });

    const token = jwt.sign(
      { id: newUser._id, isSeller: newUser.isSeller,  firstname: newUser.firstname,
    lastname: newUser.lastname, },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );


    // ✅ Send welcome email — we don't await it so signup isn't slowed down
    sendWelcomeEmail(newUser).catch((err) =>
      console.error("Welcome email failed:", err.message)
    );

    res.status(201).json({ token, user: safeUser(newUser) });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Something went wrong. Try again." });
  }
});

// ── POST /auth/login ──────────────────────────────────────────────────────────
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, isSeller: user.isSeller, firstname: user.firstname, lastname: user.lastname },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user: safeUser(user) });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Something went wrong. Try again." });
  }
});

module.exports = router;