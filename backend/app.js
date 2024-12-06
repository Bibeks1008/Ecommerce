const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require("dotenv/config");
const cors = require("cors");
const multer = require("multer");

const adminRoutes = require("./routes/adminAuth");
const productRoutes = require("./routes/product");

const { fileStorage, fileFilter } = require("./helpers/multer");

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.use("/admin/auth", adminRoutes);
app.use("/admin", productRoutes);

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
    console.log("Database connection ready at port:", process.env.PORT);
  })
  .catch((err) => console.error("Failed to connect to the database:", err));
