// using type:module, need to add extension for files
import express from "express"; // create routes
import dotenv from "dotenv"; // use constants
import connectDB from "./config/db.js"; // db connection
import { notFound, errorHandler } from "./middleware/errorHandler.js"; // errorHandler funcs

// import routes
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

// access form data in body
app.use(express.json());

dotenv.config(); // use env file

// connect to db
connectDB();

app.get("/", (req, res) => {
  res.send("API is running..");
});

// Routes: all routes inside productRoutes, userRoutes prepended
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
// use error functions
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}...`));
