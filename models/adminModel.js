const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminSchema = mongoose.Schema({
    userName: { Type: String, required: true },
    email: { Type: String, required: true, unique: true },
    password: { Type: String, required: true }
});

module.exports = mongoose.model('Admin', customerSchema);

customerSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) { next(error); }
});