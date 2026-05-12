const express = require("express");
const User = require("../models/User");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ── GET /users/me ─────────────────────────────────────────────────────────────
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      title: user.title,
      isSeller: user.isSeller,
      isNewUser: user.isNewUser,
      avatar: user.avatar,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── PATCH /users/finish-onboarding ───────────────────────────────────────────
router.patch("/finish-onboarding", protect, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { isNewUser: false });
    res.json({ message: "Onboarding complete!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── PATCH /users/become-seller ────────────────────────────────────────────────
router.patch("/become-seller", protect, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { isSeller: true });
    res.json({ message: "You are now a seller on Mercova! 🎉" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ── PATCH /users/profile ──────────────────────────────────────────────────────
router.patch("/profile", protect, async (req, res) => {
  const { firstname, lastname, title, avatar } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { firstname, lastname, title, avatar },
      { new: true }
    ).select("-password");

    res.json({
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      title: user.title,
      isSeller: user.isSeller,
      isNewUser: user.isNewUser,
      avatar: user.avatar,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


router.delete("/delete-account", protect, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error("Delete account error:", err);
    res.status(500).json({ message: "Could not delete account" });
  }
});

module.exports = router;