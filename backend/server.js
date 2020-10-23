const express = require("express"); // create routes
const products = require("./data/products");
const app = express();

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

app.listen(5000, console.log("Server listening on port 5000..."));
