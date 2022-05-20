const { UserGame, UserGameBiodata } = require('../models');
const bcrypt = require('bcrypt');

const getUser = async (req, res) => {
  const data = await UserGame.findAll({
    include: {
      model: UserGameBiodata,
    },
  });
  res.status(200).json(data);
};

const addUser = async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = await UserGame.create({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });
    if (!newUser) return res.status(400).json({ msg: 'data gagal di simpan' });
    await UserGameBiodata.create({
      id_user: newUser.id,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      birthday: req.body.birthday || null,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const editUser = async (req, res) => {
  const { id } = req.params;

  try {
    const dataUser = await UserGame.findOne({
      where: {
        id: id,
      },
    });
    const hashPassword = await bcrypt.hash(req.body.password, 12);

    await UserGame.update(
      {
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (!newUser) return res.status(400).json({ msg: 'data gagal di simpan' });
    await UserGameBiodata.create(
      {
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        birthday: req.body.birthday || null,
      },
      {
        where: {
          id: id,
        },
      }
    );
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = { addUser, getUser, editUser };
