'use strict';
module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define('Product', {
    upc: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Product;
};