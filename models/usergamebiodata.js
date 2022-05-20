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
        foreignKey: 'id_user',
        as: 'userGame',
      });
    }
  }
  UserGameBiodata.init(
    {
      id_user: DataTypes.INTEGER,
      address: DataTypes.TEXT,
      phoneNumber: DataTypes.STRING,
      birthday: DataTypes.DATE,
      admin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'UserGameBiodata',
    }
  );
  return UserGameBiodata;
};
