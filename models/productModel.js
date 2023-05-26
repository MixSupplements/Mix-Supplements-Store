const mongoose = require('mongoose');


const ProductDetails = new mongoose.Schema({
    color: String,
    size: { type: String, enum: ['sm', 'md', 'lg', 'xl', 'xxl', 'xxxl'] },
    weight: String,
    material: String,
    origin: String,
    flavor: String,
}, { _id: false })

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { Type: mongoose.SchemaTypes.ObjectId, ref: "Brand" },
    category: { Type: mongoose.SchemaTypes.ObjectId, ref: "Category", required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    sale: { type: Number, default: 1 },
    description: { type: String, required: true },
    images: [{ type: String, required: true }],
    details: ProductDetails,
    rating: Number, // to be detected
    reviews: [{
        id: { type: mongoose.SchemaTypes.ObjectId, ref: "Review" },
        scores: { type: Number, enum: [1, 2, 3, 4, 5] },
    }
    ]
})

mongoose.model("Product", ProductSchema);