'use strict';
module.exports = function(sequelize, DataTypes) {
  var App = sequelize.define('App', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return App;
};