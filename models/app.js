'use strict';
module.exports = function (sequelize, DataTypes) {
    var App = sequelize.define('App', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        appSecret: {
            type: DataTypes.STRING,
            allowNull: false
        },
        packageName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hashKey: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return App;
};