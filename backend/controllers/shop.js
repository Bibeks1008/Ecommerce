const Product = require("../models/product");
const User = require("../models/user");

exports.postAddToCart = async (req, res, next) => {
  const userId = req.userId;
  const productId = req.body.productId;

  console.log("in add to cart");

  try {
    const product = await Product.findById(productId);

    const user = await User.findById(userId);
    const result = await user.addToCart(product);
    console.log(result);
    res.status(200).send({ message: "Successfully added to cart!" });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    throw error;
  }
};
