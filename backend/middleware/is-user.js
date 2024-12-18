const jwt = require("jsonwebtoken");
require("dotenv/config");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    const error = new Error(err);
    error.statusCode = 500;
    throw error;
  }

  if (!decodedToken) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  next();
};
