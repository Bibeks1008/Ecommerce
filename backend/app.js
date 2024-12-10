const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
require("dotenv/config");
const cors = require("cors");
const multer = require("multer");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const shopRoutes = require("./routes/shop");

const { fileStorage, fileFilter } = require("./helpers/multer");

const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use(shopRoutes);

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
