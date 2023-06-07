const mongoose = require("mongoose");
const ShippingFee = mongoose.model("ShippingFee");

exports.getAllShippingInfo = (request, response, next) => {
  ShippingFee.find()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.getOneshippingInfo = (request, response, next) => {
  ShippingFee.findOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) throw new error("category not found");
      else response.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.addShippingGovernate = (request, response, next) => {
  let object = new ShippingFee(request.body);
  object
    .save()
    .then((data) => {
      response.status(201).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

exports.updateShippingGovernate = (request, response, next) => {
  ShippingFee.findOneAndUpdate({ _id: request.params.id }, request.body)
    .then((data) => {
      if (data == null) throw new error("Shipping not found");
      else response.status(200).json(data);
    })
    .catch((error) => next(error));
};
