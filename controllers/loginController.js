const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Customer = mongoose.model("Customer");

exports.isAuthenticated = (req, res, next) => {
  let token;
  let validTokens;
  let stayLoggedIn = req.body.stayLoggedIn || false;
  let expirationTime;
  let numOfDays = 1;
  stayLoggedIn
    ? (expirationTime = { expiresIn: "1y" })
    : (expirationTime = { expiresIn: numOfDays + "d" });
  Customer.findOne({
    email: req.body.email,
  })
    .then((customer) => {
      if (!customer) {
        let error = new Error("Invalid email or password.");
        error.status = 422;
        throw error;
      }
      if (bcrypt.compareSync(req.body.password, customer.password)) {
        token = jwt.sign(
          {
            email: customer.email,
            id: customer._id,
            role: "customer",
          },
          process.env.secretKey,
          expirationTime
        );
        validTokens = customer.tokens || [];
        validTokens = validTokens.filter((t) => {
          try {
            jwt.verify(t, process.env.secretKey);
            return true;
          } catch (error) {
            return false;
          }
        });
        return Customer.findByIdAndUpdate(customer._id, {
          tokens: [...validTokens, token],
        });
      } else {
        const error = new Error("Invalid email or password.");
        error.status = 422;
        throw error;
      }
    })
    .then((customer) => {
      res.status(200).json({ data: "ok", token });
    })
    .catch((error) => next(error));
};
