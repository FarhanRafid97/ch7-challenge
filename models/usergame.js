'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserGame.hasOne(models.UserGameBiodata, {
        foreignKey: 'idUser',
        as: 'userGameBiodata',
      });
      UserGame.hasMany(models.UserGameHistory, {
        foreignKey: 'idUser',
        as: 'UserGameHistories',
      });
    }
  }
  UserGame.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'UserGame',
    }
  );
  return UserGame;
};
