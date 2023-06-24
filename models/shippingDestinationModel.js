const mongoose = require("mongoose");

const ShippingDestinationSchema = new mongoose.Schema({
  governorate: { type: String, required: true, },
  fees: { type: Number, required: true, },
  active: { type: Boolean, required: true, default: true },
  shippingDays: { type: Number, required: true, },
});

module.exports = mongoose.model("ShippingDestination", ShippingDestinationSchema);
