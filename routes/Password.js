const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");

const router = express.Router();


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_MAIL,
    pass: process.env.APP_PASSWORD,
  },
});


router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        message: "If that email exists, a reset link has been sent.",
      });
    }

    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET + user.password, 
      { expiresIn: "15m" }
    );

    const resetLink = `http://localhost:5174/reset-password/${user._id}/${resetToken}`;

    await transporter.sendMail({
      from: `"Mercova" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Reset your Mercova password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #2563EB;">Mercova</h2>
          <p>Hi ${user.firstname},</p>
          <p>We received a request to reset your password. Click the button below to continue.</p>
          <a href="${resetLink}"
            style="display: inline-block; background: #0045dc; color: white; padding: 12px 24px;
            border-radius: 8px; text-decoration: none; font-weight: bold; margin: 16px 0;">
            Reset My Password
          </a>
          <p style="color: #888; font-size: 13px;">This link expires in 15 minutes. If you didn't request this, ignore this email.</p>
          <p style="color: #888; font-size: 13px;">© 2026 Mercova. Built for the Digital Curator.</p>
        </div>
      `,
    });

    res.json({ message: "If that email exists, a reset link has been sent." });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ message: "Something went wrong. Try again." });
  }
});


router.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    jwt.verify(token, process.env.JWT_SECRET + user.password);


    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(id, { password: hashedPassword });

    res.json({ message: "Password reset successful! You can now log in." });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(400).json({ message: "Reset link is invalid or has expired." });
  }
});


const protect = require("../middleware/authMiddleware");

router.patch("/change-password", protect, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
  
    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(req.user.id, { password: hashedPassword });

    res.json({ message: "Password changed successfully!" });
  } catch (err) {
    console.error("Change password error:", err);
    res.status(500).json({ message: "Something went wrong. Try again." });
  }
});

module.exports = router;