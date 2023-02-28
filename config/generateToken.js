const jwt = require("jsonwebtoken");
const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    "SECRET",
    {
      expiresIn: "30d",
    }
  );
};

module.exports = generateToken;
