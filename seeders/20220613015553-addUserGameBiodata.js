'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('UserGameBiodata', [
      {
        firstName: 'farhan',
        lastName: 'syauqi',
        idUser: 1,
        address: 'padang',
        phoneNumber: '0812345678',
        birthday: 2022 - 05 - 04,
        admin: false,
        jenisKelamin: 'male',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'wahyu',
        lastName: 'bucil',
        idUser: 2,
        address: 'bali',
        phoneNumber: '0812345678',
        birthday: 2022 - 05 - 04,
        admin: false,
        jenisKelamin: 'male',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('UserGameBiodata', {
      [Op.or]: [{ idUser: 1 }, { idUser: 2 }],
    });
  },
};
