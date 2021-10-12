const express = require("express");
const catalogController = require("../../controllers/catalog");
const router = express.Router();

router.get("/", catalogController.getAllSuppliers);
router.get("/categories/:category", catalogController.getByCategory);
router.get("/search", catalogController.searchByTitle);
router.get("/:id", catalogController.getSupplierById);

module.exports = router;