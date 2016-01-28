'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Offers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            supermarketId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "Supermarkets",
                    key: "id"
                },
                allowNull: false
            },
            dateInit: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            dateEnd: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            current: {
                type: Sequelize.BOOLEAN,
                allowNull: false
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
        return queryInterface.dropTable('Offers');
    }
};