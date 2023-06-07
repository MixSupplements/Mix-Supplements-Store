const mongoose = require("mongoose");

const typeCustomer = new mongoose.Schema({
  _id: { type: mongoose.Types.ObjectId, ref: "Customer" },
  name: { type: String, required: true },
});

const schema = new mongoose.Schema({
  productId: { type: mongoose.Types.ObjectId, ref: "Product" },
  customer: typeCustomer,
  score: { type: Number,required: true , enum: [1, 2, 3, 4, 5] },
  comment: {type: String ,required: true },
});

mongoose.model("Review", schema);
