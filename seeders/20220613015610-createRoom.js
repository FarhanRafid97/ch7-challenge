'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Rooms', [
      {
        name: 'full cash only',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'no cheat',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Rooms', {
      [Op.or]: [{ name: 'full cash only' }, { name: 'no cheat' }],
    });
  },
};
