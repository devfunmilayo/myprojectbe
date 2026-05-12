const express = require("express");
const Product = require("../models/product");
const Order = require("../models/order");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// ── GET /seller/all-products ──────────────────────────────────────────────────
// All published products — powers the buyer marketplace
router.get("/all-products", protect, async (req, res) => {
  try {
    const products = await Product.find({ status: "published" })
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch products" });
  }
});

// ── GET /seller/product/:id ───────────────────────────────────────────────────
// Single product by MongoDB _id — used by ProductDetail page
router.get("/product/:id", protect, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch product" });
  }
});

// ── GET /seller/stats ─────────────────────────────────────────────────────────
router.get("/stats", protect, async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.user.id });
    const productIds = products.map((p) => p._id.toString());
    const orders = await Order.find({ productId: { $in: productIds } });

    const totalRevenue = orders.reduce((sum, o) => sum + o.amount, 0);
    const totalSales = orders.length;
    const productsLive = products.filter((p) => p.status === "published").length;

    const recentOrders = orders
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 10);

    const recentSales = recentOrders.map((order) => {
      const product = products.find((p) => p._id.toString() === order.productId);
      return {
        productTitle: product ? product.title : "Unknown Product",
        amount: order.amount,
        date: new Date(order.createdAt).toLocaleDateString("en-GB", {
          day: "numeric", month: "short", year: "numeric",
        }),
      };
    });

    res.json({ stats: { totalRevenue, totalSales, productsLive }, recentSales });
  } catch (err) {
    console.error("Seller stats error:", err);
    res.status(500).json({ message: "Could not fetch stats" });
  }
});

// ── GET /seller/products ──────────────────────────────────────────────────────
router.get("/products", protect, async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.user.id })
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch products" });
  }
});

// ── POST /seller/products ─────────────────────────────────────────────────────
router.post("/products", protect, async (req, res) => {
  const { title, description, price, type, category, fileUrl, thumbnailUrl } = req.body;
  try {
    const product = await Product.create({
      sellerId: req.user.id,
      sellerName: `${req.user.firstname} ${req.user.lastname}`,
      title,
      description,
      price: parseFloat(price),
      type,
      category,
      fileUrl: fileUrl || "",
      thumbnailUrl: thumbnailUrl || "",
      status: "published",
    });
    res.status(201).json({ message: "Product uploaded!", product });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Could not upload product" });
  }
});


router.delete("/products/:id", protect, async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id, sellerId: req.user.id });
    if (!product) return res.status(404).json({ message: "Product not found" });
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: "Could not delete product" });
  }
});


router.patch("/products/:id", protect, async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, sellerId: req.user.id },
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated", product });
  } catch (err) {
    res.status(500).json({ message: "Could not update product" });
  }
});

module.exports = router;