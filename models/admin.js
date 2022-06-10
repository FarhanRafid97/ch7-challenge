'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async register({ username, email, password }) {
      const encryptedPassword = await bcrypt.hash(password, 10);
      /*
        #encrypt dari static method
        encryptedPassword akan sama dengan string 
        hasil enkripsi password dari method #encrypt
      */
      return this.create({ username, email, password: encryptedPassword });
    }
    static associate(models) {
      // define association here
    }
    static async authenticate({ username, password }) {
      try {
        const admin = await this.findOne({ where: { username: username } });
        console.log(admin);
        if (!admin) return Promise.reject('admin not found');
        const isPassValid = await bcrypt.compare(password, admin.password);
        if (!isPassValid) Promise.reject('password invalid');
        return Promise.resolve(admin);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  }
  Admin.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Admin',
    }
  );
  return Admin;
};
