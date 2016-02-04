'use strict';
module.exports = function(sequelize, DataTypes) {
  var Supermarket = sequelize.define('Supermarket', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Supermarket;
};