const express = require("express");
const rateLimit = require("express-rate-limit");

const {
  register,
  login,
  getMe,
  logout,
} = require("../controllers/userController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    succeeded: false,
    message: "Too many login attempts. Please try again later.",
    data: null,
  },
});


/*
  Only Admin can register new users
*/
router.post(
  "/register",
  protect,
  authorize("admin"),
  register
);


/*
  Login is public
*/
router.post(
  "/login",
  loginLimiter,
  login
);


/*
  Get currently logged-in user
*/
router.get(
  "/me",
  protect,
  getMe
);


/*
  Logout
*/
router.post(
  "/logout",
  protect,
  logout
);


module.exports = router;