const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = mongoose.model('Admin');

exports.add = (req, res, next) => {
    let { username, email, password } = req.body;

    let admin = new Admin({
        username: username,
        email: email,
        password: password
    })

    admin.save()
        .then(() => {
            res.status(200).json({ message: "Admin added successfully" });
        }).catch(err => next(err))
}

/**
 * can update only the email and password 
 */
exports.update = (req, res, next) => {
    let { username, ...data } = req.body;
    Admin.updateOne({ _id: req.params.id }, { $set: data })
        .then((data) => {
            if (data.matchedCount === 1)
                res.status(200).json({ message: "Admin updated successfully" });
            else 
            {
                let error = new Error('ID not found');
                error.status = 422;
                throw error;
            }
        }).catch(err => next(err))
}

exports.destroy = (req, res, next) => {
    Admin.deleteOne({ _id: req.params.id })
        .then((data) => {
            if (data.deletedCount === 1)
                res.status(200).json({ message: "Admin deleted successfully" });
            else 
            {
                let error = new Error('ID not found');
                error.status = 422;
                throw error;
            }

        }).catch(error => next(error))
}