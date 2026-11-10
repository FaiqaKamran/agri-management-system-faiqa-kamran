const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        succeeded: false,
        message: "Not authorized. Token required.",
        data: null,
      });
    }

    const token = authHeader.split(" ")[1];
console.log("JWT SECRET LOADED:", process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({
        succeeded: false,
        message: "User not found.",
        data: null,
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("JWT Error:", error.message);

    return res.status(401).json({
      succeeded: false,
      message: "Invalid or expired token.",
      data: null,
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        succeeded: false,
        message: "You are not authorized for this action.",
        data: null,
      });
    }

    next();
  };
};

module.exports = {
  protect,
  authorize,
};