const { UserGame, UserGameBiodata } = require('../models');

const loginUserView = async (req, res) => {
  try {
    res.render('pages/loginPage/login');
  } catch (error) {
    console.log(error.message);
  }
};
const registerView = async (req, res) => {
  try {
    res.render('pages/loginPage/register', {
      msg: req.flash('msg'),
      msgFail: req.flash('msgFail'),
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { loginUserView, registerView };
