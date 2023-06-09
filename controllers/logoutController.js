const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");
const Admin = mongoose.model("Admin");

exports.logout = (req, res, next) => {
  try {
    const token = req.get("authorization").split(" ")[1];
    if (req.decodedToken.role == "customer") {
      Customer.findOneAndUpdate(
        { _id: req.decodedToken.id },
        { $pull: { tokens: token } }
      )
        .then((customer) => {
          res.status(200).json("logged out.");
        })
        .catch((error) => next(error));
    } else if (req.decodedToken.role == "admin") {
      Admin.findOneAndUpdate(
        { _id: req.decodedToken.id },
        { $pull: { tokens: token } }
      )
        .then((admin) => {
          res.status(200).json("logged out.");
        })
        .catch((error) => next(error));
    }
  } catch (error) {
    next(error);
  }
};
