const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const passwordRoutes = require("./routes/Password");
const newsletterRoutes = require("./routes/newsletter");
const orderRoutes = require("./routes/orders");
const sellerRoutes    = require("./routes/seller");

const app = express();

// ── Middleware ─────────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "https://myprojectfrontend-gamma.vercel.app", 
    ],
    credentials: true,
  }),
);
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/auth", authRoutes);

app.use("/auth", passwordRoutes);
app.use("/users", userRoutes);
app.use("/newsletter", newsletterRoutes);
app.use("/orders", orderRoutes);
app.use("/seller", sellerRoutes);

// ── Health check ──────────────────────────────────────────────────────────────
app.get("/", (req, res) => res.json({ message: "Mercova API running " }));

// ── Connect to MongoDB then start server ──────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" MongoDB connected successfully");
    app.listen(process.env.PORT || 5000, () => {
      console.log(` Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection failed:", err.message);
  });
