const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: Object },
});

mongoose.model("Brand", brandSchema);
