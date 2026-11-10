const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Crop = sequelize.define(
  "Crop",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    field: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    plantingDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    cuttingDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    healthScore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
        max: 100,
      },
    },

    status: {
      type: DataTypes.ENUM(
        "Healthy",
        "Needs Attention",
        "Critical"
      ),
      allowNull: false,
      defaultValue: "Healthy",
    },

    expectedQty: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    harvestQty: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: "crops",
    timestamps: true,
  }
);

module.exports = Crop;