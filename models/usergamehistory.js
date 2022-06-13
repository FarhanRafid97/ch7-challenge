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
        as: 'player',
      });
      UserGameHistory.belongsTo(models.UserGame, {
        foreignKey: 'idEnemy',
        as: 'enemy',
      });
    }
  }
  UserGameHistory.init(
    {
      idRoom: DataTypes.INTEGER,
      idUser: DataTypes.INTEGER,
      idEnemy: DataTypes.INTEGER,
      winLose: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'UserGameHistory',
    }
  );
  return UserGameHistory;
};
