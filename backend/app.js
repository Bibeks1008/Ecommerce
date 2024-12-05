const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require("dotenv/config");

const adminRoutes = require("./routes/admin");

const app = express();

app.use(bodyparser.json());

app.use("/admin/auth", adminRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect(process.env.DB_URL)
  .then((result) => {
    app.listen(process.env.PORT);
    console.log("Database connection ready!");
  })
  .catch((err) => console.error("Failed to connect to the database:", err));

