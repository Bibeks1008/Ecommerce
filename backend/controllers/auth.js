const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv/config");

const Admin = require("../models/admin");
const User = require("../models/user");

exports.adminSignup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed!");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email.toLowerCase().trim();
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

exports.adminLogin = async (req, res, next) => {
  const email = req.body.email.toLowerCase().trim();
  const password = req.body.password;

  try {
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      const error = new Error("A admin with this email could not be found.");
      error.statusCode = 401;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, admin.password);
    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: admin.email,
        adminId: admin._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).send({
      token: token,
      adminId: admin._id.toString(),
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.userSignup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed!");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email.toLowerCase().trim();
  const name = req.body.name;
  const password = req.body.password;

  try {
    const hashedPwd = await bcrypt.hash(password, 12);
    const user = new User({
      name: name,
      email: email,
      password: hashedPwd,
      cart: { items: [] },
    });
    const result = await user.save();
    res.status(201).send({ message: "User Created!", userId: result._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.userLogin = async (req, res, next) => {
  const email = req.body.email.toLowerCase().trim();
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("A admin with this email could not be found.");
      error.statusCode = 401;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email,
        adminId: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).send({
      token: token,
      adminId: user._id.toString(),
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
