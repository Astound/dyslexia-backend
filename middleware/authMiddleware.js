//authorization middleware

const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  // console.log(req);
  // if (
  //   req.headers.authorization &&
  //   req.headers.authorization.startsWith("Bearer")
  // ) {
  //   try {
  //     token = req.headers.authorization.split(" ")[1];
  //     const decoded = jwt.verify(token, "SECRET");
  //     req.user = await User.findById(decoded.id).select("-password");
  //     console.log("Token worked");
  //     next();
  //   } catch (error) {
  //     res.status(401);
  //     throw new Error("Not authorized, token failed");
  //   }
  // }
  // if (!token) {
  //   res.status(401);
  //   throw new Error("Not authorized, no token");
  // }
  next();
});

module.exports = { protect };
