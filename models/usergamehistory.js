'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGameHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserGameHistory.belongsTo(models.UserGame, {
        foreignKey: 'idUser',
        as: 'userGame',
      });
    }
  }
  UserGameHistory.init(
    {
      idUser: DataTypes.INTEGER,
      score: DataTypes.INTEGER,
      gold: DataTypes.INTEGER,
      winLose: DataTypes.BOOLEAN,
      exp: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'UserGameHistory',
    }
  );
  return UserGameHistory;
};
