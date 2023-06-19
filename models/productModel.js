const mongoose = require('mongoose');


const ProductDetails = new mongoose.Schema({
    color: String,
    size: { type: String, enum: ['sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'] },
    weight: String,
    material: String,
    origin: String,
    flavor: String,
}, { _id: false })

const ReviewsSchema = new mongoose.Schema({
    _id: { type: mongoose.SchemaTypes.ObjectId, ref: "Review" },
    score: { type: Number, enum: [1, 2, 3, 4, 5] },
})

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: mongoose.SchemaTypes.ObjectId, ref: "Brand" },
    category: { type: mongoose.SchemaTypes.ObjectId, ref: "Category", required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    sale: { type: Number, default: 0 },
    description: { type: String, required: true },
    images: [{ type: Object }],
    details: ProductDetails,
    rating: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false },
    reviews: [ReviewsSchema]
}, {
    timestamps: true
})

mongoose.model("Product", ProductSchema);