const jwt = require("jsonwebtoken");
require("dotenv/config");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error("Not authenticated");
    error.statusCode = 401;
    throw error;
  }

  req.adminId = decodedToken.adminId;
  next();
};
