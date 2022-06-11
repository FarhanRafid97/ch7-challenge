'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Admins', [
      {
        username: 'farhan123',
        email: 'farhan@gmail.com',
        password: await bcrypt.hash('farhan123', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'wahyu123',
        email: 'wahyu123@gmail.com',
        password: await bcrypt.hash('wahyu123', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete('Admins', {
      [Op.or]: [{ username: 'farhan123' }, { username: 'wahyu123' }],
    });
  },
};
