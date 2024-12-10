const express = require("express");

const shopController = require("../controllers/shop");
const isUser = require("../middleware/is-user");

const router = express.Router();

router.post("/cart", isUser, shopController.postAddToCart);
router.get("/cart", isUser, shopController.getCartItems);

router.post("/cart-delete-item", isUser, shopController.postDeleteFromCart);

module.exports = router;
