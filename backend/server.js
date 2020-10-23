import express from "express"; // create routes
import dotenv from "dotenv"; // use constants
import products from "./data/products.js"; //using type:module, need to add extension for files

const app = express();

dotenv.config(); // use env file

app.get("/", (req, res) => {
  res.send("API is running..");
});

app.get("/api/products", (req, res) => {
  res.json(products); // convert to json
});

app.get("/api/products/:id", (req, res) => {
  // mongoose expression
  const product = products.find(item => item._id === req.params.id); //gets placeholder in url :id
  res.json(product);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}...`));
