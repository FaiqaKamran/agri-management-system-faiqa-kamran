const express = require("express");

const {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getOrders);

router.get("/:id", protect, getOrderById);

router.post(
  "/",
  protect,
  authorize("admin", "manager"),
  createOrder
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateOrder
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteOrder
);

module.exports = router;