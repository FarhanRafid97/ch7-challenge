'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlayGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PlayGame.belongsTo(models.UserGame, {
        foreignKey: 'p1Id' && 'p2Id',
        as: 'user',
      });

      PlayGame.belongsTo(models.Room, {
        foreignKey: 'roomId',
        as: 'room',
      });
    }
  }
  PlayGame.init(
    {
      roomId: DataTypes.INTEGER,
      p1Id: DataTypes.INTEGER,
      p2Id: DataTypes.INTEGER,
      p1choose: DataTypes.STRING,
      p2choose: DataTypes.STRING,
      condition: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'PlayGame',
    }
  );
  return PlayGame;
};
