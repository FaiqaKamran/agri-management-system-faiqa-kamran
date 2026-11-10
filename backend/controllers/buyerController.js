const Buyer = require("../models/buyerModel");
const Crop = require("../models/cropModel");
const { ok, fail } = require("../utils/response");
const fs = require("fs");
const path = require("path");

// CNIC format: 12345-1234567-1
const formatCNIC = (cnic) => {
  const digits = String(cnic || "").replace(/\D/g, "");

  if (digits.length !== 13) {
    return null;
  }

  return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
};

// Get all buyers
exports.getBuyers = async (req, res) => {
  try {
    const buyers = await Buyer.findAll({
      include: [
        {
          model: Crop,
          attributes: ["id", "name", "field"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return ok(res, buyers, "Buyers fetched successfully");
  } catch (error) {
    return fail(res, error.message, 500);
  }
};

// Get buyer by ID
exports.getBuyerById = async (req, res) => {
  try {
    const buyer = await Buyer.findByPk(req.params.id, {
      include: [
        {
          model: Crop,
          attributes: ["id", "name", "field"],
        },
      ],
    });

    if (!buyer) {
      return fail(res, "Buyer not found", 404);
    }

    return ok(res, buyer, "Buyer fetched successfully");
  } catch (error) {
    return fail(res, error.message, 500);
  }
};

// Create buyer
exports.createBuyer = async (req, res) => {
  try {
    const { name, cnic, cropId, quantity } = req.body;

    if (!name || !cnic || !cropId || !quantity) {
      return fail(
        res,
        "Name, CNIC, crop and quantity are required",
        400
      );
    }

    // Name validation
    if (!/^[A-Za-z ]+$/.test(name) || name.trim().length < 3) {
      return fail(
        res,
        "Buyer name must contain only letters and spaces and be at least 3 characters",
        400
      );
    }

    // CNIC formatting
    const formattedCNIC = formatCNIC(cnic);

    if (!formattedCNIC) {
      return fail(
        res,
        "CNIC must contain exactly 13 digits",
        400
      );
    }

    // Duplicate CNIC
    const existingBuyer = await Buyer.findOne({
      where: { cnic: formattedCNIC },
    });

    if (existingBuyer) {
      return fail(res, "Buyer with this CNIC already exists", 409);
    }

    // Photo required
    if (!req.file) {
      return fail(res, "Buyer photo is required", 400);
    }

    // Crop validation
    const crop = await Crop.findByPk(cropId);

    if (!crop) {
      return fail(res, "Crop not found", 404);
    }

    // Quantity validation
    if (Number(quantity) > Number(crop.harvestQty || 0)) {
      return fail(
        res,
        "Buyer quantity cannot exceed available harvest quantity",
        400
      );
    }

    const buyer = await Buyer.create({
      name: name.trim(),
      cnic: formattedCNIC,
      cropId,
      quantity,
      photo: `/images/${req.file.filename}`,
    });

    return ok(res, buyer, "Buyer created successfully", 201);
  } catch (error) {
    return fail(res, error.message, 500);
  }
};

// Update buyer
exports.updateBuyer = async (req, res) => {
  try {
    const buyer = await Buyer.findByPk(req.params.id);

    if (!buyer) {
      return fail(res, "Buyer not found", 404);
    }

    const { name, cnic, cropId, quantity } = req.body;

    let updatedData = {};

    if (name !== undefined) {
      if (!/^[A-Za-z ]+$/.test(name) || name.trim().length < 3) {
        return fail(res, "Invalid buyer name", 400);
      }

      updatedData.name = name.trim();
    }

    if (cnic !== undefined) {
      const formattedCNIC = formatCNIC(cnic);

      if (!formattedCNIC) {
        return fail(res, "CNIC must contain exactly 13 digits", 400);
      }

      const duplicate = await Buyer.findOne({
        where: { cnic: formattedCNIC },
      });

      if (duplicate && duplicate.id !== buyer.id) {
        return fail(res, "Buyer with this CNIC already exists", 409);
      }

      updatedData.cnic = formattedCNIC;
    }

    let crop = null;

    if (cropId !== undefined) {
      crop = await Crop.findByPk(cropId);

      if (!crop) {
        return fail(res, "Crop not found", 404);
      }

      updatedData.cropId = cropId;
    } else {
      crop = await Crop.findByPk(buyer.cropId);
    }

    if (quantity !== undefined) {
      if (Number(quantity) > Number(crop.harvestQty || 0)) {
        return fail(
          res,
          "Buyer quantity cannot exceed available harvest quantity",
          400
        );
      }

      updatedData.quantity = quantity;
    }

    // Optional new photo
    if (req.file) {
      const oldPhoto = buyer.photo;

      updatedData.photo = `/images/${req.file.filename}`;

      if (oldPhoto) {
        const oldFilePath = path.join(
          __dirname,
          "..",
          "public",
          oldPhoto.replace("/images/", "")
        );

        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
    }

    await buyer.update(updatedData);

    return ok(res, buyer, "Buyer updated successfully");
  } catch (error) {
    return fail(res, error.message, 500);
  }
};

// Delete buyer
exports.deleteBuyer = async (req, res) => {
  try {
    const buyer = await Buyer.findByPk(req.params.id);

    if (!buyer) {
      return fail(res, "Buyer not found", 404);
    }

    if (buyer.photo) {
      const filePath = path.join(
        __dirname,
        "..",
        "public",
        buyer.photo.replace("/images/", "")
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await buyer.destroy();

    return ok(res, null, "Buyer deleted successfully");
  } catch (error) {
    return fail(res, error.message, 500);
  }
};