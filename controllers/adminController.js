const mongoose = require('mongoose');

const Admins = mongoose.model('Admin');

exports.postAdmin = (req, res, next) => {
    let {userName, email, password} = req.body;

    let newAdmin = new Admins({
        userName: userName,
        email: email,
        password: password
    })

    newAdmin.save()
    .then(data => {
        res.status(200).json({"message": "admin added successfully"});
    }).catch(err => next(err))
}

exports.patchAdmin = (req, res, next) => {
    Admins.findByIdAndUpdate(req.params.id, req.body)
    .then(data => {
        res.status(200).json({"message": "admin updated successfully"});
    }).catch(err => next(err))
}

exports.deleteAdmin = (req, res, next) => {
    Admins.deleteOne({_id: req.params.id})
    .then(data => {
        res.status(200).json({"message": "admin deleted successfully"})
    }).catch(err => next(err))
}