'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PlayGames', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      roomId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Rooms',
          key: 'id',
        },
      },
      p1Id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'UserGames',
          key: 'id',
        },
      },
      p2Id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'UserGames',
          key: 'id',
        },
      },
      p1choose: {
        type: Sequelize.STRING,
      },
      p2choose: {
        type: Sequelize.STRING,
      },
      condition: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PlayGames');
  },
};
