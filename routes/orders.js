const express = require("express");
const Order = require("../models/order");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ── POST /orders ──────────────────────────────────────────────────────────────
// Called after Paystack confirms payment — saves to MongoDB
router.post("/", protect, async (req, res) => {
  const { productId, amount, paystackReference } = req.body;

  try {
    // Check if this exact Paystack reference already exists — prevent duplicates
    const existing = await Order.findOne({ paystackReference });
    if (existing) {
      return res.status(200).json({ message: "Order already recorded", order: existing });
    }

    const newOrder = await Order.create({
      buyerId: req.user.id,
      productId,
      amount,
      paystackReference,
      status: "completed",
    });

    res.status(201).json({ message: "Order saved!", order: newOrder });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ message: "Could not save order" });
  }
});

// ── GET /orders/my-purchases ──────────────────────────────────────────────────
// Returns all orders for the logged-in buyer from MongoDB
router.get("/my-purchases", protect, async (req, res) => {
  try {
    const orders = await Order.find({ buyerId: req.user.id })
      .sort({ createdAt: -1 }); // newest first

    res.json(orders);
  } catch (err) {
    console.error("Fetch orders error:", err);
    res.status(500).json({ message: "Could not fetch orders" });
  }
});

module.exports = router;