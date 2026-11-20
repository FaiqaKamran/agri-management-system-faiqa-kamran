const User = require("./userModel");
const Crop = require("./cropModel");
const Order = require("./orderModel");
const Buyer = require("./buyerModel");

// ===============================
// User → Crops
// ===============================

User.hasMany(Crop, {
  foreignKey: "createdBy",
  onDelete: "CASCADE",
});

Crop.belongsTo(User, {
  foreignKey: "createdBy",
});

// ===============================
// Crop → Orders
// ===============================

Crop.hasMany(Order, {
  foreignKey: "cropId",
  onDelete: "CASCADE",
});

Order.belongsTo(Crop, {
  foreignKey: "cropId",
});

// ===============================
// Crop → Buyers
// ===============================

Crop.hasMany(Buyer, {
  foreignKey: "cropId",
  onDelete: "CASCADE",
});

Buyer.belongsTo(Crop, {
  foreignKey: "cropId",
});

module.exports = {
  User,
  Crop,
  Order,
  Buyer,
};