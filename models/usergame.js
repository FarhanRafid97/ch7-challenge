'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  class UserGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserGame.hasMany(models.PlayGame, {
        foreignKey: 'p1Id',
        as: 'player1',
      });
      UserGame.hasMany(models.PlayGame, {
        foreignKey: 'p2Id',
        as: 'player2',
      });
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
    generateToken() {
      // Jangan memasukkan password ke dalam payload
      const payload = {
        id: this.id,
        username: this.username,
      };
      // Rahasia ini nantinya kita pakai untuk memverifikasi apakah token ini benar-benar berasal dari aplikasi kita
      const secret = 'the most secret key';
      // Membuat token dari data-data diatas
      const token = jwt.sign(payload, secret);
      return token;
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
