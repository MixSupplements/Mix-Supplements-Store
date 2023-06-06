const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");
const bcrypt = require("bcrypt");

exports.signUp = (req, res, next) => {
  // const encryptedPassword = bcrypt.hashSync(req.body.password, 10);
  const customerBeingAdded = new Customer({
    _id: new mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    addresses: req.body.addresses,
  });
  customerBeingAdded
    .save()
    .then((object) => {
      res.status(201).json(object);
    })
    .catch((error) => next(error));
};
