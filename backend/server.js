// using type:module, need to add extension for files
import express from "express"; // create routes
import dotenv from "dotenv"; // use constants
import connectDB from "./config/db.js"; // db connection
import { notFound, errorHandler } from "./middleware/errorHandler.js"; // errorHandler funcs

// import routes
import productRoutes from "./routes/productRoutes.js";

const app = express();

dotenv.config(); // use env file

// connect to db
connectDB();

app.get("/", (req, res) => {
  res.send("API is running..");
});

// Products routes: any route that uses api/products use productRoutes
app.use("/api/products/", productRoutes);

// use error functions
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}...`));
