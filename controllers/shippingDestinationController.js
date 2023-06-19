const mongoose = require("mongoose");
const ShippingDestination = mongoose.model("ShippingDestination");

exports.index = (request, response, next) => {
  ShippingDestination.find()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.getOne = (request, response, next) => {
  ShippingDestination.findOne({ _id: request.params.id })
    .then((data) => {
      if (data)
        response.status(200).json(data);
      else
        throw Object.assign(new Error("Category not Found"), { status: 422 });
    })
    .catch((error) => next(error));
};

exports.add = (request, response, next) => {
  let shippingDestination = new ShippingDestination(request.body);
  shippingDestination.save()
    .then(() => {
      response.status(201).json({ message: "Shipping Destination added successfully" });
    })
    .catch((error) => {
      next(error);
    });
};

exports.update = (request, response, next) => {
  ShippingDestination.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
    .then((updated) => {
      if (updated)
        response.status(200).json({ message: "Shipping Destination updated successfully" });
      else
        throw Object.assign(new Error("Category not Found"), { status: 422 });
    })
    .catch((error) => next(error));
};

exports.disable = (request, response, next) => {
  ShippingDestination.findOneAndUpdate({ _id: request.params.id }, { active: false }, { new: true })
    .then((updated) => {
      if (updated)
        response.status(200).json({ message: "Shipping Destination disabled" });
      else
        throw Object.assign(new Error("Category not Found"), { status: 422 });
    })
    .catch((error) => next(error));
};