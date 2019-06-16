'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return [
          queryInterface.addColumn('user_privates', 'token', {
              type: Sequelize.STRING,
              allowNull: false,
          })
      ];
  },
  down: (queryInterface, Sequelize) => {
      return [
          queryInterface.removeColumn('user_privates', 'token')
      ];
  }
};
