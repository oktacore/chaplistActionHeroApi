'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('ProductStores', {
            productId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Products",
                    key: "id"
                },
                allowNull: false,
                primaryKey: true
            },
            offerId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Offers",
                    key: "id"
                },
                allowNull: false,
                primaryKey: true
            },
            normalPrice: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            offerPrice: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            likes: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            image: {
                type: Sequelize.STRING,
                allowNull: true
            },
            image1: {
                type: Sequelize.STRING,
                allowNull: true
            },
            image2: {
                type: Sequelize.STRING,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('ProductStores');
    }
};
