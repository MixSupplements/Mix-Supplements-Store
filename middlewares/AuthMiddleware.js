const mongoose = require("mongoose");
const Customer = mongoose.model("Customer");
const Admin = mongoose.model("Admin");
const jwt = require("jsonwebtoken");

/**
 * Authenticates the request only without any authorization
 */
module.exports.Authenticate = async (req, res, next) => {
  try
  {
    const token = req.get("authorization").split(" ")[1];
    req.decodedToken = jwt.verify(token, process.env.secretKey);

    if (req.decodedToken.role == "customer")
    {
      let customer = await Customer.findOne({ _id: req.decodedToken.id, deleted: false });
      if (customer?.tokens?.some((t) => t == token)) next();
      else throw new Error;

    }
    else if (req.decodedToken.role == "admin")
    {
      let admin = await Admin.findOne({ _id: req.decodedToken.id });
      if (admin?.tokens?.some((t) => t == token)) next();
      else throw new Error;
    }
  } catch (error)
  {
    error.message = "Not authenticated";
    error.status = 402;
    next(error);
  }
}

/**
 * Authenticate the request and check if the role is Admin
 */
module.exports.isAdmin = (req, res, next) => {

  this.Authenticate(req, res, () => {
    if (req.decodedToken?.role === "admin") next();
    else
    {
      let error = new Error("Not authorized");
      error.status = 403;
      next(error);
    }
  });
};

/**
 * Authenticate the request and check if the role is Customer
 */
module.exports.isCustomer = (req, res, next) => {

  this.Authenticate(req, res, () => {
    if (req.decodedToken?.role === "customer") next();
    else
    {
      let error = new Error("Not authorized");
      error.status = 403;
      next(error);
    }
  });
};