'use strict';
module.exports = function(sequelize, DataTypes) {
  var productStore = sequelize.define('productStore', {
    normalPrice: {
        type :DataTypes.FLOAT,
        allowNull: false
    },
    offerPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return productStore;
};