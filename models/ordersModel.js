const mongoose = require('mongoose');

const typeShippingAddress = new mongoose.Schema({
    governorate: {type: String, required: true},
    city: {type: String, required: true},
    street: {type: Number, required: true},
    phoneNumber: {type: Number, required: true},
    building: {type: Number},
},{
    _id: false
})

const typeProductDetails = new mongoose.Schema({
    color: {type: String},
    size: {type: String, enum: ['sm', 'md', 'lg', 'xl', 'xxl', 'xxxl']},
    origin: {type: String}, 
    material: {type: String},
    weight: {type: String},
    flavor: {type: String}
},{
    _id: false
})

const typeProduct = new mongoose.Schema({
    _id: {type: mongoose.Types.ObjectId, required: true, ref: 'Product'},
    name: {type: String, required: true},
    price: {type: Number,  required: true},
    quantity: {type: Number, required: true},
    details: {type: typeProductDetails, required: true}
})

const schema = new mongoose.Schema({
    orderNumber: {type: Number, required: true},
    status: {type: String, required:true, enum:['confirmed', 'cancelled', 'pending', 'shipping', 'delivered']},
    totalPrice: {type: Number, required: true},
    shippingAddress: {type: typeShippingAddress},
    customerId: {type: mongoose.Types.ObjectId, ref: 'Customer'},
    product: [{type: typeProduct}]
},{
    timestamps: true
});

module.exports = mongoose.model('Order', schema)