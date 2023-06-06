module.exports.isAdmin = (req, res, next) => {
  if (req.decodedToken.role == "admin") next();
  else {
    let error = new Error("not authorized");
    error.status = 403;
    next(error);
  }
};

module.exports.isCustomer = (req, res, next) => {
  if (req.decodedToken.role == "customer") next();
  else {
    let error = new Error("not authorized");
    error.status = 403;
    next(error);
  }
};

module.exports.isAdminOrCustomer = (req, res, next) => {
  if (req.decodedToken.role == "admin" || req.decodedToken.role == "customer")
    next();
  else {
    let error = new Error("not authorized");
    error.status = 403;
    next(error);
  }
};
