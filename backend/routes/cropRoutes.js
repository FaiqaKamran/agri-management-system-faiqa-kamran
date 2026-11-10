const express = require("express");

const {
  getCrops,
  getCropById,
  createCrop,
  updateCrop,
  deleteCrop,
} = require("../controllers/cropController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getCrops);

router.get("/:id", protect, getCropById);

router.post(
  "/",
  protect,
  authorize("admin", "manager"),
  createCrop
);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateCrop
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteCrop
);

module.exports = router;