const Product = require("../models/product");
const User = require("../models/user");
const { userLogin } = require("./auth");

exports.postAddToCart = async (req, res, next) => {
  const userId = req.userId;
  const productId = req.body.productId;

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

exports.getCartItems = async (req, res, next) => {
  const userId = req.userId;


  try {
    const userwithCartProducts = await User.findById(userId).populate(
      "cart.items.productId"
    );

    console.log("car is ==> ", userwithCartProducts);
    res.status(200).send({
      items: userwithCartProducts.cart.items,
      message: "Retrieved successfully",
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    throw error;
  }
};

exports.postDeleteFromCart = async (req, res, next) => {
  const productId = req.body.productId;
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    const result = await user.removeFromCart(productId);
    console.log(result);
    res.status(200).send({
      message: "Successfully removed from cart!",
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    throw error;
  }
};
