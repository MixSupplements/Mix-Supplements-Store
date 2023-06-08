const mongoose = require('mongoose');

const ProductStoreSchema = mongoose.Schema({
    productId: { type: mongoose.Types.ObjectId, required: true },
    email: { type: mongoose.Types.ObjectId, required: true, unique: true },
    quantity: { type: Number, default: 0 }
});

module.exports = mongoose.model('ProductStore', ProductStoreSchema);