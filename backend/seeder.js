import mongoose from "mongoose"; // use mongoose queries
import dotenv from "dotenv"; // use constants
// data to seed
import users from "./data/user.js";
import products from "./data/products.js";
//  models
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
// connect db
import connectDB from "./config/db.js";
// use constants
dotenv.config();

// connect to db
connectDB();

const importData = async () => {
  try {
    // wipe out collections
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // insert users array of objects in User db collection
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id; // get admin in user.js users array

    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser }; // add admin to products
    });

    await Product.insertMany(sampleProducts);
    console.log("Data imported!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1); // exit with failure
  }
};

const destroyData = async () => {
  try {
    // wipe out collections
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data destroyed!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1); // exit with failure
  }
};

// run seeder.js script in package.json file
// gets d at node backend/seeder -d
if (process.argv[2] === "-d") {
  destroyData();
} else {
  // node backend/seeder
  importData();
}
