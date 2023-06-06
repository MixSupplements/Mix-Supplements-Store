const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Admin = mongoose.model("Admin");

exports.isAuthenticated = (req, res, next) => {
  let token;
  let validTokens;
  let stayLoggedIn = req.body.stayLoggedIn || false;
  let expirationTime;
  let numOfDays = 1;
  stayLoggedIn
    ? (expirationTime = null)
    : (expirationTime = { expiresIn: numOfDays + "d" });
  Admin.findOne({
    email: req.body.email,
  })
    .then((admin) => {
      if (!admin) {
        let error = new Error("Invalid email or password.");
        error.status = 422;
        throw error;
      }
      if (bcrypt.compareSync(req.body.password, admin.password)) {
        token = jwt.sign(
          {
            email: admin.email,
            id: admin._id,
            role: "admin",
          },
          process.env.secretKey,
          expirationTime
        );
        validTokens = admin.tokens || [];
        validTokens = validTokens.filter((t) => {
          try {
            jwt.verify(t, process.env.secretKey);
            return true;
          } catch (error) {
            return false;
          }
        });
        return Admin.findByIdAndUpdate(admin._id, {
          tokens: [...validTokens, token],
        });
      } else {
        const error = new Error("Invalid email or password.");
        error.status = 422;
        throw error;
      }
    })
    .then((admin) => {
      res.status(200).json({ data: "ok", token });
    })
    .catch((error) => next(error));
};
