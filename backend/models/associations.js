const User = require("./userModel");
const Crop = require("./cropModel");
const Order = require("./orderModel");
const Buyer = require("./buyerModel");
const Task = require("./taskModel");
const Expense = require("./expenseModel");
const Worker = require("./workerModel");
const Attendance = require("./attendanceModel");
const Equipment = require("./equipmentModel");
const Maintenance = require("./maintenanceModel");
const Activity = require("./activityModel");

// User → Crops
User.hasMany(Crop, {
  foreignKey: "createdBy",
  onDelete: "CASCADE",
});

Crop.belongsTo(User, {
  foreignKey: "createdBy",
});

// Crop → Orders
Crop.hasMany(Order, {
  foreignKey: "cropId",
  onDelete: "CASCADE",
});

Order.belongsTo(Crop, {
  foreignKey: "cropId",
});

module.exports = {
  User,
  Crop,
  Order,
};

Crop.hasMany(Buyer, {
  foreignKey: "cropId",
  onDelete: "CASCADE",
});

Buyer.belongsTo(Crop, {
  foreignKey: "cropId",
});

Crop.hasMany(Task, { foreignKey: "cropId", onDelete: "SET NULL" });
Task.belongsTo(Crop, { foreignKey: "cropId" });

Crop.hasMany(Expense, { foreignKey: "cropId", onDelete: "SET NULL" });
Expense.belongsTo(Crop, { foreignKey: "cropId" });

Worker.hasMany(Attendance, { foreignKey: "workerId", onDelete: "CASCADE" });
Attendance.belongsTo(Worker, { foreignKey: "workerId" });

Equipment.hasMany(Maintenance, {
  foreignKey: "equipmentId",
  onDelete: "CASCADE"
});
Maintenance.belongsTo(Equipment, {
  foreignKey: "equipmentId"
});

User.hasMany(Activity, {
  foreignKey: "userId",
  onDelete: "SET NULL"
});
Activity.belongsTo(User, {
  foreignKey: "userId"
});