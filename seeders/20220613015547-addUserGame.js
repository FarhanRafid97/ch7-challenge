'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('UserGames', [
      {
        username: 'farhanUser',
        email: 'farhanUser@gmail.com',
        password: await bcrypt.hash('farhan123', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'wahyuUser',
        email: 'wahyu123User@gmail.com',
        password: await bcrypt.hash('wahyu123', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('UserGames', {
      [Op.or]: [{ username: 'farhanUser' }, { username: 'wahyuUser' }],
    });
  },
};
