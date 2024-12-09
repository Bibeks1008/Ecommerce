const express = require("express");
const { body } = require("express-validator");

const Admin = require("../models/admin");
const User = require("../models/user");

const authController = require("../controllers/auth");

const router = express.Router();

router.post(
  "/admin/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value) => {
        const adminDoc = await Admin.findOne({ email: value });
        if (adminDoc) {
          return Promise.reject("E-Mail address already exists!");
        }
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  authController.adminSignup
);

router.post("/admin/login", authController.adminLogin);

router.post(
  "/user/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value) => {
        const userDoc = await User.findOne({ email: value });
        if (userDoc) {
          return Promise.reject("E-Mail address already exists!");
        }
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  authController.userSignup
);

router.post("/user/login", authController.userLogin);

module.exports = router;
