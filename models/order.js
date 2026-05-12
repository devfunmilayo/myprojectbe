const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paystackReference: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "completed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema);
// module.exports = mongoose.model("Order", orderSchema);