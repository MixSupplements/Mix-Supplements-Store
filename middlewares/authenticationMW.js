const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");
const Admin = mongoose.model("Admin");

module.exports = (req, res, next) => {
  try {
    const token = req.get("authorization").split(" ")[1];
    req.decodedToken = jwt.verify(token, process.env.secretKey);
    if (req.decodedToken.role == "customer") {
      Customer.findOne({ _id: req.decodedToken.id })
        .then((customer) => {
          if (customer?.tokens?.some((t) => t == token)) next();
          else {
            const error = new Error("not authenticated");
            error.status = 402;
            throw error;
          }
        })
        .catch((error) => next(error));
    } else if (req.decodedToken.role == "admin") {
      Admin.findOne({ _id: req.decodedToken.id })
        .then((admin) => {
          if (admin?.tokens?.some((t) => t == token)) next();
          else {
            const error = new Error("not authenticated");
            error.status = 402;
            throw error;
          }
        })
        .catch((error) => next(error));
    }
  } catch (error) {
    if (!req.get("authorization")) {
      const noTokenError = new Error("not authenticated");
      noTokenError.status = 402;
      next(noTokenError);
    } else next(error);
  }
};
