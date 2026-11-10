const express = require("express");
const rateLimit = require("express-rate-limit");

const {
  register,
  login,
  getMe,
  logout,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

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

router.post("/register", register);
router.post("/login", loginLimiter, login);
router.get("/me", protect, getMe);
router.post("/logout", protect, logout);

module.exports = router;