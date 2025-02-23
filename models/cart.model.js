const {Sequelize, DataTypes} = require("sequelize");
const sequelize = require('../config/db.config');
const { Products } = require('./product.model');

const Carts = sequelize.define("Carts", {
  cartId: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    references:{
      model: 'Users',
      key: 'userId'
    }
  },
  productId: {
    type: DataTypes.STRING,
    allowNull: false,
    references:{
      model: 'Products',
      key: 'productId'
    }
  },
}, {
  timestamps: true,
});
Carts.belongsTo(Products, { foreignKey: "productId", onDelete: "CASCADE" });
Products.hasMany(Carts, { foreignKey: "productId", onDelete: "CASCADE" });

module.exports = { Carts };