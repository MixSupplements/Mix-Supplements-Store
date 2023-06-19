const { body, param } = require("express-validator");

module.exports.search = [
  param("searchText").notEmpty().withMessage("Search text is required")
]

module.exports.create = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name can only be alphabets"),

  body("brand")
    .optional()
    .isMongoId()
    .withMessage("Brand ID is not valid"),

  body("category")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Brand ID is not valid"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price must be Number"),

  body("quantity").optional().isInt().withMessage("Quantity must be integers"),

  body("sale").optional().isNumeric(),

  body("description")
    .notEmpty()
    .withMessage("Product description is required")
    .isString()
    .withMessage("Description must be string"),

  body("details")
    .optional()
    .isObject()
    .withMessage("Details should be object"),

  body("details.color")
    .optional()
    .isString()
    .withMessage("Color must be string"),

  body("details.size")
    .optional()
    .isIn(["sm", "md", "lg", "xl", "xxl", "xxxl"])
    .withMessage("Size must be one of [sm ,md ,lg ,xl ,xxl ,xxxl]")
    .optional(),

  body("details.weight")
    .optional()
    .isString()
    .withMessage("Weight must be string"),

  body("details.material")
    .optional()
    .isString()
    .withMessage("Material must be string"),

  body("details.origin")
    .optional()
    .isString()
    .withMessage("Origin must be string"),

  body("details.flavor")
    .optional()
    .isString()
    .withMessage("flavor must be string"),
];

module.exports.update = [
  param("id").isMongoId().withMessage("ID is not valid"),

  body("name")
    .optional()
    .isString()
    .withMessage("Name can only be alphabets"),

  body("brand")
    .optional()
    .isMongoId()
    .withMessage("Brand ID is not valid"),

  body("category")
    .optional()
    .isMongoId()
    .withMessage("Brand ID is not valid"),

  body("price")
    .optional()
    .isNumeric()
    .withMessage("Price must be Number"),

  body("quantity").optional().isInt().withMessage("Quantity must be integers"),

  body("sale").optional().isNumeric(),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be string"),

  body("details")
    .optional()
    .isObject()
    .withMessage("Details should be object"),

  body("details.color")
    .optional()
    .isString()
    .withMessage("Color must be string"),

  body("details.size")
    .optional()
    .isIn(["sm", "md", "lg", "xl", "xxl", "xxxl"])
    .withMessage("Size must be one of [sm ,md ,lg ,xl ,xxl ,xxxl]")
    .optional(),

  body("details.weight")
    .optional()
    .isString()
    .withMessage("Weight must be string"),

  body("details.material")
    .optional()
    .isString()
    .withMessage("Material must be string"),

  body("details.origin")
    .optional()
    .isString()
    .withMessage("Origin must be string"),

  body("details.flavor")
    .optional()
    .isString()
    .withMessage("flavor must be string"),
];

module.exports.destroy = [
  param("id").isMongoId().withMessage("ID is not valid")
]