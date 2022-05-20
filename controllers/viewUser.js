const { UserGame, UserGameBiodata } = require('../models');

const loginUserView = async (req, res) => {
  res.render('pages/loginPage/login');
};
const registerView = async (req, res) => {
  res.render('pages/loginPage/register', {
    msg: req.flash('msg'),
    msgFail: req.flash('msgFail'),
  });
};
const dashboardView = async (req, res) => {
  try {
    res.render('pages/dashboard/dashboard', {
      msg: req.flash('msg'),
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { loginUserView, registerView, dashboardView };
