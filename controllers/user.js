const { UserGame, UserGameBiodata } = require('../models');
const bcrypt = require('bcrypt');

const getUser = async (req, res) => {
  const data = await UserGame.findAll({
    include: ['userGameBiodata', 'UserGameHistories'],
  });
  res.status(200).json(data);
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
      idUser: newUser.id,
      birthday: req.body.birthday || null,
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
        idUser: id,
      },
    });
    await UserGameBiodata.update(
      {
        ...update,
        birthday: req.body.birthday || data.birthday,
      },
      {
        where: {
          idUser: id,
        },
      }
    );
    res.redirect('/dashboard');
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await UserGameBiodata.destroy({
    where: {
      idUser: id,
    },
  });

  await UserGame.destroy({
    where: {
      id: id,
    },
  });

  req.flash('msg', 'delete data success');
  res.redirect('/dashboard');
};

module.exports = { getUser, addUser, editUser, deleteUser };
