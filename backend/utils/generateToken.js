import jwt from "jsonwebtoken";

const generateToken = id => {
  // create token using sign:user id, secret key, options
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

export default generateToken;
