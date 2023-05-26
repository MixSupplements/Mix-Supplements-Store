const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const addressSchema = new mongoose.Schema({
    governorate: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    building: String
}, {
    _id: false
});

const customerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: String,
    addresses: [addressSchema],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
}, {
    timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);

customerSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();

    try
    {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) { next(error); }
});