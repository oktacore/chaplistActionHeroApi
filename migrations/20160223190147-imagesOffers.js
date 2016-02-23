'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
            'ProductStores',
            'image',
            Sequelize.STRING
        );
    queryInterface.addColumn(
            'ProductStores',
            'image1',
            Sequelize.STRING
        );
    queryInterface.addColumn(
            'ProductStores',
            'image2',
            Sequelize.STRING
        );
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
