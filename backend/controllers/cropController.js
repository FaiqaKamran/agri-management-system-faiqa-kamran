const Crop = require("../models/cropModel");
const { ok, fail } = require("../utils/response");

exports.getCrops = async (req, res) => {
  try {
    const { search, status } = req.query;

    const where = {};

    if (status) {
      where.status = status;
    }

    const crops = await Crop.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });

    let result = crops;

    if (search) {
      const searchText = search.toLowerCase();

      result = crops.filter(
        (crop) =>
          crop.name.toLowerCase().includes(searchText) ||
          crop.field.toLowerCase().includes(searchText)
      );
    }

    return ok(res, result, "Crops fetched successfully");
  } catch (error) {
    return fail(res, error.message, 500);
  }
};

exports.getCropById = async (req, res) => {
  try {
    const crop = await Crop.findByPk(req.params.id);

    if (!crop) {
      return fail(res, "Crop not found", 404);
    }

    return ok(res, crop, "Crop fetched successfully");
  } catch (error) {
    return fail(res, error.message, 500);
  }
};

exports.createCrop = async (req, res) => {
  try {
    const {
      name,
      field,
      plantingDate,
      cuttingDate,
      healthScore,
      status,
      expectedQty,
      harvestQty,
    } = req.body;

    if (!name || !field || !plantingDate) {
      return fail(
        res,
        "Name, field and planting date are required",
        400
      );
    }

    const crop = await Crop.create({
      name,
      field,
      plantingDate,
      cuttingDate,
      healthScore,
      status,
      expectedQty,
      harvestQty,
      createdBy: req.user.id,
    });

    return ok(res, crop, "Crop created successfully", 201);
  } catch (error) {
    return fail(res, error.message, 500);
  }
};

exports.updateCrop = async (req, res) => {
  try {
    const crop = await Crop.findByPk(req.params.id);

    if (!crop) {
      return fail(res, "Crop not found", 404);
    }

    await crop.update(req.body);

    return ok(res, crop, "Crop updated successfully");
  } catch (error) {
    return fail(res, error.message, 500);
  }
};

exports.deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findByPk(req.params.id);

    if (!crop) {
      return fail(res, "Crop not found", 404);
    }

    await crop.destroy();

    return ok(res, null, "Crop deleted successfully");
  } catch (error) {
    return fail(res, error.message, 500);
  }
};