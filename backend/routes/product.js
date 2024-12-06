const express = require("express");

const productController = require("../controllers/product");
const isAdmin = require("../middleware/is-admin");

const router = express.Router();

router.post("/add-product", isAdmin, productController.postAddProduct);

module.exports = router;
