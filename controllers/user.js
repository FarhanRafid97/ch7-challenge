const { UserGame, UserGameBiodata } = require('../models');
const bcrypt = require('bcrypt');

const getUser = async (req, res) => {
  const data = await UserGame.findAll({
    include: 'userGameBiodata',
  });
  res.status(200).json(data);
};
const detailUser = async (req, res) => {
  const { id } = req.params;
  const dataUser = await UserGame.findOne({
    where: {
      id: id,
    },
    include: 'userGameBiodata',
  });
  if (!dataUser) return res.status(400).json({ msg: 'data tidak ada' });
  res.status(200).json(dataUser);
};

const addUser = async (req, res) => {
  const postData = req.body;
  try {
    const findUsername = await UserGame.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (findUsername) {
      req.flash('msgFail', 'username alredy exist');
      return res.redirect('/register');
    }
    const hashPassword = await bcrypt.hash(req.body.password, 12);

    const newUser = await UserGame.create({
      ...postData,
      password: hashPassword,
    });

    await UserGameBiodata.create({
      ...postData,
      id_user: newUser.id,
      birthday: req.body.birthday || null,
    });

    const dataUser = await UserGame.findOne({
      where: {
        id: newUser.id,
      },
      include: 'userGameBiodata',
    });
    req.flash('msg', 'Registration success');
    res.status(200).redirect('/register');
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

module.exports = { getUser, addUser, editUser, deleteUser, detailUser };
