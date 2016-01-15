'use strict';
module.exports = function (sequelize, DataTypes) {
    var MyUser = sequelize.define('MyUser', {
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        passwordHash: DataTypes.TEXT,
        passwordSalt: DataTypes.TEXT
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return MyUser;
};