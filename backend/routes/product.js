const express = require("express");

const productController = require("../controllers/product");

const router = express.Router();

router.post("/add-product", productController.postAddProduct);

module.exports = router;
