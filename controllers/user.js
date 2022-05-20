const { UserGame, UserGameBiodata } = require('../models');
const bcrypt = require('bcrypt');

const getUser = async (req, res) => {
  const data = await UserGame.findAll({
    include: 'userGameBiodata',
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

    await UserGameBiodata.create({
      id_user: newUser.id,
      address: req.body.address,
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      phoneNumber: req.body.phoneNumber,
      birthday: req.body.birthday || null,
    });
    const dataUser = await UserGame.findOne({
      where: {
        id: newUser.id,
      },
      include: 'userGameBiodata',
    });
    res.status(200).json(dataUser);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const editUser = async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  try {
    const data = await UserGameBiodata.findOne({
      where: {
        id_user: id,
      },
    });
    await UserGameBiodata.update(
      {
        ...update,
        birthday: req.body.birthday || null,
      },
      {
        where: {
          id_user: id,
        },
      }
    );
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await UserGame.destroy({
    where: {
      id: id,
    },
  });
  await UserGameBiodata.destroy({
    where: {
      id_user: id,
    },
  });
  res.status(200).json({ msg: 'data berhasil di hapus' });
};

module.exports = { getUser, addUser, editUser, deleteUser };
