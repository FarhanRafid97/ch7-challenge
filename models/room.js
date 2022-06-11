'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Room.hasMany(models.PlayGame, {
        foreignKey: 'roomId',
        as: 'playGame',
      });
    }
    generateToken() {
      // Jangan memasukkan password ke dalam payload
      const payload = {
        id: this.id,
        name: this.name,
      };
      // Rahasia ini nantinya kita pakai untuk memverifikasi apakah token ini benar-benar berasal dari aplikasi kita
      const secret = 'the most secret key';
      // Membuat token dari data-data diatas
      const token = jwt.sign(payload, secret);
      return token;
    }
  }
  Room.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Room',
    }
  );
  return Room;
};
