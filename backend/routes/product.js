const express = require("express");

const productController = require("../controllers/product");
const isAdmin = require("../middleware/is-admin");

const router = express.Router();

router.post("/", isAdmin, productController.postAddProduct);
router.get("/", productController.getProducts);

module.exports = router;
