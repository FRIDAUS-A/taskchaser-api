const {Sequelize, DataTypes} = require("sequelize")
const sequelize = require('../config/db.config')

const Products = sequelize.define("Product", {
  productId: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  }
}, {
  timestamps: true,
});

module.exports = { Products };