const Order = require("../models/orderModel");
const Crop = require("../models/cropModel");
const { ok, fail } = require("../utils/response");

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Crop,
          attributes: ["id", "name", "field"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return ok(res, orders, "Orders fetched successfully");
  } catch (error) {
    return fail(res, error.message, 500);
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [
        {
          model: Crop,
          attributes: ["id", "name", "field"],
        },
      ],
    });

    if (!order) {
      return fail(res, "Order not found", 404);
    }

    return ok(res, order, "Order fetched successfully");
  } catch (error) {
    return fail(res, error.message, 500);
  }
};

exports.createOrder = async (req, res) => {
  try {
    const {
      cropId,
      quantity,
      orderDate,
      status,
    } = req.body;

    if (!cropId || !quantity || !orderDate) {
      return fail(
        res,
        "Crop, quantity and order date are required",
        400
      );
    }

    const crop = await Crop.findByPk(cropId);

    if (!crop) {
      return fail(res, "Crop not found", 404);
    }

    if (Number(quantity) > Number(crop.harvestQty || 0)) {
      return fail(
        res,
        "Order quantity cannot exceed available harvest quantity",
        400
      );
    }

    const order = await Order.create({
      cropId,
      quantity,
      orderDate,
      status: status || "Pending",
    });

    return ok(res, order, "Order created successfully", 201);
  } catch (error) {
    return fail(res, error.message, 500);
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return fail(res, "Order not found", 404);
    }

    if (req.body.cropId) {
      const crop = await Crop.findByPk(req.body.cropId);

      if (!crop) {
        return fail(res, "Crop not found", 404);
      }
    }

    await order.update(req.body);

    return ok(res, order, "Order updated successfully");
  } catch (error) {
    return fail(res, error.message, 500);
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return fail(res, "Order not found", 404);
    }

    await order.destroy();

    return ok(res, null, "Order deleted successfully");
  } catch (error) {
    return fail(res, error.message, 500);
  }
};