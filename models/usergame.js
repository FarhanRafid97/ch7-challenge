'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
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
    static async authenticate({ username, password }) {
      try {
        const user = await this.findOne({ where: { username: username } });
        console.log(user);
        if (!user) return Promise.reject('user not found');
        const isPassValid = await bcrypt.compare(password, user.password);
        if (!isPassValid) Promise.reject('password invalid');
        return Promise.resolve(user);
      } catch (error) {
        return Promise.reject(error);
      }
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
