const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  try {
    const {
      fullName,
      username,
      email,
      password,
    } = req.body;

    if (
      !fullName ||
      !username ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        succeeded: false,
        message: "All fields are required.",
        data: null,
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        succeeded: false,
        message: "Password must be at least 6 characters.",
        data: null,
      });
    }

    const cleanFullName = fullName.trim();
    const cleanUsername = username.trim();
    const cleanEmail = email.trim().toLowerCase();

    const existingUsername = await User.findOne({
      where: {
        username: cleanUsername,
      },
    });

    if (existingUsername) {
      return res.status(409).json({
        succeeded: false,
        message: "Username already exists.",
        data: null,
      });
    }

    const existingEmail = await User.findOne({
      where: {
        email: cleanEmail,
      },
    });

    if (existingEmail) {
      return res.status(409).json({
        succeeded: false,
        message: "Email already exists.",
        data: null,
      });
    }

    const user = await User.create({
      fullName: cleanFullName,
      username: cleanUsername,
      email: cleanEmail,
      password,
      role: "manager",
    });

    return res.status(201).json({
      succeeded: true,
      message: "Registration successful",
      data: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      succeeded: false,
      message: "Registration failed.",
      data: null,
    });
  }
};


const login = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
    } = req.body;

    if (
      (!username && !email) ||
      !password
    ) {
      return res.status(400).json({
        succeeded: false,
        message: "Username/email and password are required.",
        data: null,
      });
    }

    const user = await User.findOne({
      where: username
        ? {
            username: username.trim(),
          }
        : {
            email: email.trim().toLowerCase(),
          },
    });

    if (!user) {
      return res.status(401).json({
        succeeded: false,
        message: "Invalid credentials.",
        data: null,
      });
    }

    const passwordMatch =
      await user.comparePassword(password);

    if (!passwordMatch) {
      return res.status(401).json({
        succeeded: false,
        message: "Invalid credentials.",
        data: null,
      });
    }

    const token = generateToken(user);

    return res.status(200).json({
      succeeded: true,
      message: "Login successful",
      user: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role,
        token,
      },
    });

  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      succeeded: false,
      message: "Login failed.",
      data: null,
    });
  }
};


const getMe = async (req, res) => {
  return res.status(200).json({
    succeeded: true,
    message: "User profile",
    data: req.user,
  });
};


const logout = async (req, res) => {
  return res.status(200).json({
    succeeded: true,
    message: "Logout successful",
    data: null,
  });
};


module.exports = {
  register,
  login,
  getMe,
  logout,
};