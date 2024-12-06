const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const Admin = require("../models/admin");

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed!");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  try {
    const hashedPwd = await bcrypt.hash(password, 12);
    const admin = new Admin({ name: name, email: email, password: hashedPwd });
    const result = await admin.save();
    res.status(201).send({ message: "Admin Created!", adminId: result._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

