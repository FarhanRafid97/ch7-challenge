'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGameBiodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserGameBiodata.belongsTo(models.UserGame, {
        foreignKey: 'idUser',
        as: 'userGame',
      });
    }
  }
  UserGameBiodata.init(
    {
      idUser: DataTypes.INTEGER,
      address: DataTypes.TEXT,
      phoneNumber: DataTypes.STRING,
      birthday: DataTypes.DATEONLY,
      admin: DataTypes.BOOLEAN,
      jenisKelamin: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'UserGameBiodata',
    }
  );
  return UserGameBiodata;
};
