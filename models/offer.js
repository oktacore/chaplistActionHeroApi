'use strict';
module.exports = function(sequelize, DataTypes) {
  var Offer = sequelize.define('Offer', {
    dateInit: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    dateEnd: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    current: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Offer;
};