const express = require("express");
const rateLimit = require("express-rate-limit");

const {
  register,
  login,
  getMe,
  logout,
  getUsers,
  updateUser,
  deleteUser,
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


/*
  Get all users
  Only Admin can access this
*/
router.get(
  "/",
  protect,
  authorize("admin"),
  getUsers
);


/*
  Update user
  Only Admin can update users
*/
router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateUser
);


/*
  Delete user
  Only Admin can delete users
*/
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteUser
);


module.exports = router;