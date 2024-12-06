const express = require("express");
const { body } = require("express-validator");

const Admin = require("../models/admin");

const adminAuthController = require("../controllers/adminAuth");

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom(async (value) => {
        const userDoc = await Admin.findOne({ email: value });
        if (userDoc) {
          return Promise.reject("E-Mail address already exists!");
        }
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  adminAuthController.signup
);

router.post("/login", adminAuthController.login);

module.exports = router;
