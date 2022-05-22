'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserGameHistories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idUser: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'UserGames',
          key: 'id',
        },
      },
      score: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      gold: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      winLose: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      exp: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('UserGameHistories');
  },
};
