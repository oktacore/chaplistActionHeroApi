'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Apps', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                references: { model: "Users", key: "id" },
                allowNull: false
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            appSecret: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            packageName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            hashKey: {
                type: Sequelize.STRING,
                allowNull: false,
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
        return queryInterface.dropTable('Apps');
    }
};