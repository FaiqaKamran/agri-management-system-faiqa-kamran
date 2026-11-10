const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const register = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    if (!fullName || !username || !email || !password) {
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

    const existingUsername = await User.findOne({
      where: { username },
    });

    if (existingUsername) {
      return res.status(409).json({
        succeeded: false,
        message: "Username already exists.",
        data: null,
      });
    }

    const existingEmail = await User.findOne({
      where: { email },
    });

    if (existingEmail) {
      return res.status(409).json({
        succeeded: false,
        message: "Email already exists.",
        data: null,
      });
    }

    const user = await User.create({
      fullName,
      username,
      email,
      password,
      role: "manager",
    });

    const token = generateToken(user);

    return res.status(201).json({
      succeeded: true,
      message: "Registration successful",
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
    console.error(error);

    return res.status(500).json({
      succeeded: false,
      message: "Registration failed.",
      data: null,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if ((!username && !email) || !password) {
      return res.status(400).json({
        succeeded: false,
        message: "Username/email and password are required.",
        data: null,
      });
    }

    const user = await User.findOne({
      where: username ? { username } : { email },
    });

    if (!user) {
      return res.status(401).json({
        succeeded: false,
        message: "Invalid credentials.",
        data: null,
      });
    }

    const passwordMatch = await user.comparePassword(password);

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
    console.error(error);

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