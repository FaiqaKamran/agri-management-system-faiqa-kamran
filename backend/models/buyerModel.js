const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Buyer = sequelize.define(
  "Buyer",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 100],
        is: /^[A-Za-z ]+$/i,
      },
    },

    cnic: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    cropId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },

    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "buyers",
    timestamps: true,
  }
);

module.exports = Buyer;