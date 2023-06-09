const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const addressSchema = new mongoose.Schema(
  {
    governorate: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
  },
  {
    _id: false,
  }
);

const cartItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 },
  },
  {
    _id: false,
  }
);

const customerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumbers: [String],
    addresses: [addressSchema],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    cart: [cartItemSchema],
    deleted: { type: Boolean, default: false },
    tokens: [{ type: Object }],
  },
  {
    timestamps: true,
  }
);

/**
 * encrypt the password when the customer data are first saved on Database
 */
customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try
  {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error)
  {
    next(error);
  }
});

/**
 * encrypt the password when the customer data are updated
 */
customerSchema.pre("updateOne", async function (next) {
  const update = this.getUpdate();
  if (update.$set.password)
  {
    try
    {
      const salt = await bcrypt.genSalt(10);
      update.$set.password = await bcrypt.hash(update.$set.password, salt);
    } catch (error)
    {
      next(error);
    }
  }
  next();
});

module.exports = mongoose.model("Customer", customerSchema);
