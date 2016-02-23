'use strict';
module.exports = function (sequelize, DataTypes) {
    var ProductStore = sequelize.define('ProductStore', {
        likes: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        normalPrice: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        offerPrice: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        image: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        image1: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        image2: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return ProductStore;
};
