const mongoose = require("mongoose");
const Category = mongoose.model("Category");
const Product = mongoose.model('Product');

exports.index = (request, response, next) => {
  Category.find()
    .select('-__v')
    .then((data) => {
      response.status(200).json(data);
    })
    .catch((error) => next(error));
};

exports.getProducts = (request, response, next) => {
  Product.find({ category: request.params.id })
    .then((data) => {
      if (data)
        response.status(200).json(data);
      else
        throw Object.assign(new Error("Category not found"), { status: 422 });
    })
    .catch((error) => next(error));
};

exports.add = (request, response, next) => {
  let category = new Category(request.body);
  category.save()
    .then(() => {
      response.status(201).json({ message: "Category Added Successfully" });
    })
    .catch((error) => {
      next(error);
    });
};

exports.update = (request, response, next) => {
  Category.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true })
    .then((data) => {
      if (data)
        response.status(200).json({ message: "Category Updated Successfully" });
      else
        throw Object.assign(new Error("Category not found"), { status: 422 });
    })
    .catch((error) => next(error));
};

exports.destroy = (request, response, next) => {
  Category.deleteOne({ _id: request.params.id })
    .then(data => {
      if (data.deletedCount === 1)
        response.status(200).json({ message: "Category deleted Successfully" });
      else
        throw Object.assign(new Error('Category not found'), { status: 422 });
    })
    .catch((error) => next(error));
};
