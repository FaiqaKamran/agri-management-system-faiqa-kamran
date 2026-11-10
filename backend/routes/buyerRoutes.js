const express = require("express");

const {
  getBuyers,
  getBuyerById,
  createBuyer,
  updateBuyer,
  deleteBuyer,
} = require("../controllers/buyerController");

const { protect, authorize } = require("../middleware/authMiddleware");

const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", protect, getBuyers);

router.get("/:id", protect, getBuyerById);

router.post(
  "/",
  protect,
  authorize("admin", "manager"),
  upload.single("photo"),
  createBuyer
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  upload.single("photo"),
  updateBuyer
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteBuyer
);

module.exports = router;