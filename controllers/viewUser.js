const bcrypt = require('bcrypt');
const { UserGame, UserGameBiodata } = require('../models');

const loginUserView = async (req, res) => {
  res.render('pages/loginPage/login', {
    msgFail: req.flash('msgFail'),
    layout: 'layouts/login',
  });
};
const registerView = async (req, res) => {
  res.render('pages/loginPage/register', {
    msg: req.flash('msg'),
    msgFail: req.flash('msgFail'),
    layout: 'layouts/login',
  });
};
const registerAdmin = async (req, res) => {
  res.render('pages/loginPage/registerAdmin', {
    msg: req.flash('msg'),
    msgFail: req.flash('msgFail'),
    layout: 'layouts/login',
  });
};
const dashboardView = async (req, res) => {
  try {
    const dataUserGames = await UserGame.findAll();

    res.render('pages/dashboard/dashboard', {
      dataUserGames,
      msg: req.flash('msg'),
    });
  } catch (error) {
    console.log(error.message);
  }
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

  res.render('pages/dashboard/detail', {
    dataUser,
  });
};
const createUserView = async (req, res) => {
  res.render('pages/dashboard/createUser', {
    msg: req.flash('msg'),
    msgFail: req.flash('msgFail'),
  });
};

const createUser = async (req, res) => {
  const postData = req.body;
  try {
    const findUsername = await UserGame.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (findUsername) {
      req.flash('msgFail', 'username alredy exist');
      return res.redirect('/dashboard/create');
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
    res.status(200).redirect('/dashboard/create');
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const userBio = await UserGameBiodata.findOne({
    where: {
      idUser: id,
    },
  });
  res.render('pages/dashboard/edit', {
    userBio,
    msg: req.flash('msg'),
    msgFail: req.flash('msgFail'),
  });
};
module.exports = {
  loginUserView,
  registerView,
  dashboardView,
  createUserView,
  detailUser,
  createUser,
  editUser,
  registerAdmin,
};
