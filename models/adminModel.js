const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  tokens: [{ type: Object }]
});

adminSchema.pre("save", async function (next) {
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

adminSchema.pre("updateOne", async function (next) {
  const update = this.getUpdate();
  if (update.$set.password)
  {
    try
    {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(update.$set.password, salt);
      this.setUpdate({ $set: { password: hashedPassword } });
    } catch (error)
    {
      next(error);
    }
  }
  next();
});

module.exports = mongoose.model("Admin", adminSchema);
