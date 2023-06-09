const { body, validationResult } = require("express-validator");

module.exports.addProduct = [
  body("name")
    .notEmpty()
    .withMessage("name cant be blank")
    .isString()
    .withMessage("name must be alphapetic"),

  body("brand")
    .notEmpty()
    .withMessage("brand can't be blank")
    .isMongoId()
    .withMessage("brand_ID must be mongoid"),

  body("category")
    .notEmpty()
    .withMessage("category can't be blank")
    .isMongoId()
    .withMessage("category_ID must be mongoid"),

  body("price")
    .notEmpty()
    .withMessage("price cant be blank")
    .isNumeric()
    .withMessage("price must be Number"),

  body("quantity").isInt().withMessage("Quantity must be Number"),

  body("sale").isNumeric().optional(),

  body("description")
    .notEmpty()
    .withMessage("Please enter the detailss")
    .isString()
    .withMessage("Description must be string"),

  body("images")
    .notEmpty()
    .withMessage("images cant be blank")
    .isString()
    .withMessage("images must be string"),

  body("details")
    .notEmpty()
    .withMessage("Must enter the product detailsss")
    .isObject()
    .withMessage("details should be object"),

  body("details.color")
    .notEmpty()
    .withMessage("it can't be blank")
    .isString()
    .withMessage("color must be string"),

  body("details.size")
    .notEmpty()
    .withMessage("it can't be blank")
    .isIn(["sm", "md", "lg", "xl", "xxl", "xxxl"])
    .withMessage("size must be in [sm ,md ,lg ,xl ,xxl ,xxxl]")
    .optional(),

  body("details.weight")
    .notEmpty()
    .withMessage("it can't be blank")
    .isString()
    .withMessage("weight must be Number"),

  body("details.material")
    .notEmpty()
    .withMessage("it can't be blank")
    .isString()
    .withMessage("material must be string"),

  body("details.origin")
    .notEmpty()
    .withMessage("it can't be blank")
    .isString()
    .withMessage("origin must be string"),

  body("details.flavor")
    .notEmpty()
    .withMessage("it can't be blank")
    .isString()
    .withMessage("flavor must be string"),

  body("rating")
    .notEmpty()
    .withMessage("rating cant be blank")
    .isNumeric()
    .withMessage("rating must be Number"),

  body("deleted")
    .notEmpty()
    .withMessage("select if it deleted or not ")
    .isBoolean()
    .withMessage("true or false only"),

  body("reviews")
    .notEmpty()
    .withMessage("Must enter the product detailss")
    .isArray()
    .withMessage("reviews should be array"),

  body("reviews.*.id")
    .notEmpty()
    .withMessage("ID can't be blank")
    .isMongoId()
    .withMessage("reviews_ID Must be mongo_id"),

  body("reviews.*.score")
    .notEmpty()
    .withMessage("score can't be blank")
    .isIn([1, 2, 3, 4, 5])
    .withMessage("score should be [1, 2, 3, 4, 5]"),

  // (req, res) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array() });
  //   }

  //   // code to add product to database

  //   res.status(200).json({ message: "Product added successfully" });
  // },
];
