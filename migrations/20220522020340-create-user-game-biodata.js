'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserGameBiodata', {
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
      address: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      phoneNumber: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      birthday: {
        type: Sequelize.DATE,
      },
      admin: {
        type: Sequelize.BOOLEAN,
      },
      jenisKelamin: {
        type: Sequelize.STRING,
      },
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
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
    await queryInterface.dropTable('UserGameBiodata');
  },
};
