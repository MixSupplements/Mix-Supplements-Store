const mongoose = require("mongoose");
const Category = mongoose.model("Category");

exports.getAllCategory = (request, response, next) => {
  Category.find()
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.getOneCategory = (request, response, next) => {
  Category.findOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) throw new error("category not found");
      else response.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.addCategory = (request, response, next) => {
  let object = new Category(request.body);
  object
    .save()
    .then((data) => {
      response.status(201).json(data);
    })
    .catch((error) => {
      next(error);
    });
};

exports.updateOneCategory = (request, response, next) => {
  Category.findOneAndUpdate({ _id: request.params.id }, request.body)
    .then((data) => {
      if (data == null) throw new error("category not found");
      else response.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.deleteCategory = (request, response, next) => {
  Category.findOneAndRemove({ _id: request.params.id })
    .then((data) => {
      if (data == null) throw new error("category not found");
      else response.status(200).json(data);
    })
    .catch((error) => next(error));
};
