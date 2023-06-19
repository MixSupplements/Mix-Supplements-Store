const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Admin = mongoose.model("Admin");
const Customer = mongoose.model("Customer");

exports.adminLogin = (req, res, next) => {
    let token;
    let validTokens;
    let stayLoggedIn = req.body.stayLoggedIn || false;
    let expirationTime;
    let numOfDays = 1;
    stayLoggedIn
        ? (expirationTime = null)
        : (expirationTime = { expiresIn: numOfDays + "d" });
    Admin.findOne({
        username: req.body.username,
    })
        .then((admin) => {
            if (!admin)
            {
                let error = new Error("Invalid email or password.");
                error.status = 422;
                throw error;
            }
            if (bcrypt.compareSync(req.body.password, admin.password))
            {
                token = jwt.sign(
                    {
                        username: admin.username,
                        id: admin._id,
                        role: "admin",
                    },
                    process.env.secretKey,
                    expirationTime
                );
                validTokens = admin.tokens || [];
                validTokens = validTokens.filter((t) => {
                    try
                    {
                        jwt.verify(t, process.env.secretKey);
                        return true;
                    } catch (error)
                    {
                        return false;
                    }
                });
                return Admin.findByIdAndUpdate(admin._id, {
                    tokens: [...validTokens, token],
                });
            } else
            {
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

exports.login = (req, res, next) => {
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
            if (!customer)
            {
                let error = new Error("Invalid email or password.");
                error.status = 422;
                throw error;
            }
            if (bcrypt.compareSync(req.body.password, customer.password))
            {
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
                    try
                    {
                        jwt.verify(t, process.env.secretKey);
                        return true;
                    } catch (error)
                    {
                        return false;
                    }
                });
                return Customer.findByIdAndUpdate(customer._id, {
                    tokens: [...validTokens, token],
                });
            } else
            {
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

exports.logout = (req, res, next) => {
    try
    {
        const token = req.get("authorization").split(" ")[1];
        if (req.decodedToken.role === "customer")
        {
            Customer.findOneAndUpdate(
                { _id: req.decodedToken.id },
                { $pull: { tokens: token } }
            )
                .then((customer) => {
                    res.status(200).json({ message: "logged out" });
                })
                .catch((error) => next(error));
        }
        else if (req.decodedToken.role === "admin")
        {
            Admin.findOneAndUpdate(
                { _id: req.decodedToken.id },
                { $pull: { tokens: token } }
            )
                .then((admin) => {
                    res.status(200).json({ message: "logged out" });
                })
                .catch((error) => next(error));
        }
    } catch (error)
    {
        next(error);
    }
};