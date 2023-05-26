const mongoose = require('mongoose');

const ProductStoreSchema = mongoose.Schema({
    productId: { Type: mongoose.Types.ObjectId, required: true },
    email: { Type: mongoose.Types.ObjectId, required: true, unique: true },
    quantity: { Type: Number, default:0 }
});

module.exports = mongoose.model('ProductStore', ProductStoreSchema);