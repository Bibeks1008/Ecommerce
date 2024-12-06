const Product = require("../models/product");

exports.postAddProduct = async (req, res, next) => {
  const name = req.body.name;
  const new_price = req.body.new_price;
  const old_price = req.body.old_price;
  const category = req.body.category;
  const image = req.file;
  console.log("image in controller is ====>", image);
  if (!image) {
    const error = new Error("Attached file is not an image.");
    error.statusCode = 422;
    throw error;
  }

  const imageUrl = image.path;

  const product = new Product({
    name: name,
    new_price: new_price,
    old_price: old_price,
    category: category,
    image: imageUrl,
  });

  try {
    const result = await product.save();
    res.status(201).send({
      message: "Product created successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
