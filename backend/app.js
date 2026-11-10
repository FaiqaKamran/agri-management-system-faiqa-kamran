const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const path = require("path");
const cropRoutes = require("./routes/cropRoutes");
const orderRoutes = require("./routes/orderRoutes");
const buyerRoutes = require("./routes/buyerRoutes");
const taskRoutes = require("./routes/taskRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const workerRoutes = require("./routes/workerRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const equipmentRoutes = require("./routes/equipmentRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");
const activityRoutes = require("./routes/activityRoutes");
require("dotenv").config();

const sequelize = require("./config/db");
require("./models/associations");

// Routes
const userRoutes = require("./routes/userRoutes");

const app = express();

// ===============================
// Security Middleware
// ===============================

app.use(helmet());


// ===============================
// CORS
// ===============================

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);


// ===============================
// Body Parser
// ===============================

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));


// ===============================
// Logger
// ===============================

app.use(morgan("dev"));


// ===============================
// General Rate Limiter
// ===============================

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: {
    succeeded: false,
    message: "Too many requests. Please try again later.",
    data: null,
  },
});

app.use("/api", apiLimiter);


// ===============================
// Static Images
// ===============================

app.use(
  "/images",
  express.static(path.join(__dirname, "public", "Images"))
);

// ===============================
// API Routes
// ===============================

app.use("/api/users", userRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/users", userRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/buyers", buyerRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/workers", workerRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/activity", activityRoutes);

// Health Check

app.get("/api/health", (req, res) => {
  res.status(200).json({
    succeeded: true,
    message: "Agriculture Management API is running",
    data: {
      status: "healthy",
    },
  });
});


// 404 Handler

app.use((req, res) => {
  res.status(404).json({
    succeeded: false,
    message: "Route not found",
    data: null,
  });
});


// Global Error Handler

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    succeeded: false,
    message: err.message || "Internal server error",
    data: null,
  });
});


// Start Server

const PORT = process.env.PORT_NAME || 5000;

const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log("PostgreSQL connected successfully");

    await sequelize.sync({ alter: true });

    console.log("Database tables synchronized successfully");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:");
    console.error(error.message);
  }
};

startServer();