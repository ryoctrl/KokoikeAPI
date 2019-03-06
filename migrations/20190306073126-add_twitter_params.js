'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return [
            queryInterface.addColumn('users', 'display_name', {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: '名無しさん',
            }),
            queryInterface.addColumn('users', 'screen_name', {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'NoName',
            }),
            queryInterface.addColumn('users', 'icon_url', {
                type: Sequelize.STRING
            }),
            queryInterface.addColumn('users', 'provider', {
                type: Sequelize.STRING,
                allowNull: false,
                defaultValue: 'None'
            })
        ];
    },
    down: (queryInterface, Sequelize) => {
        return [
            queryInterface.removeColumn('users', 'display_name'),
            queryInterface.removeColumn('users', 'screen_name'),
            queryInterface.removeColumn('users', 'icon_url'),
            queryInterface.removeColumn('users', 'provider')
        ];
    }
};

