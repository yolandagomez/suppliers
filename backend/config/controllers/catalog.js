const Supplier = require("../models/Supplier");
const ErrorResponse = require("../utils/errorResponse");

//@access public
exports.getAllSuppliers = (req, res, next) => {
  Supplier.find()
    .then((suppliers) =>
      res.status(200).json({
        success: true,
        suppliers: suppliers,
      })
    )
    .catch((error) => next(error));
};

//@access public
exports.getByCategory = (req, res, next) => {
  Supplier.find({ category: req.params.category })
    .then((suppliers) =>
      res.status(200).json({
        success: true,
        suppliers: suppliers,
      })
    )
    .catch((error) => next(error));
};

//@access public
exports.searchByTitle = (req, res, next) => {
  Supplier.find({ $text: { $search: `${req.query.title}` } })
    .then((supplier) =>
      res.status(200).json({
        success: true,
        suppliers: supplier,
      })
    )
    .catch((error) => next(error));
};

//@access public
exports.getSupplierbyId = (req, res, next) => {
  Supplier.findById(req.params.id)
    .then((supplier) =>
      res.status(200).json({
        success: true,
        supplier: supplier,
      })
    )
    .catch(() =>
      next(new ErrorResponse(`Supplier not found with id ${req.params.id}`, 404))
    );
};