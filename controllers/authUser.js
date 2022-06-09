const { UserGame } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('../lib/passport');

// const userLogin = async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const userLogin = await UserGame.findOne({
//       where: { username: username },
//     });
//     if (!userLogin) return res.status(400).json({ msg: 'email tidak ada' });
//     const isPasswordCorrect = await bcrypt.compare(
//       password,
//       userLogin.password
//     );
//     if (!isPasswordCorrect) {
//       req.flash('msgFail', 'Email or Password invalid');

//       return res.redirect('/');
//     }

//     res.cookie(
//       'logged',
//       { key: process.env.COOKIES_SECRET_KEY, data: userLogin },
//       {
//         httpOnly: true,
//         maxAge: 24 * 60 * 60 * 1000,
//       }
//     );

//     res.redirect('/dashboard');
//   } catch (error) {
//     res.status(400).json({ msg: error.message });
//   }
// };

const loginUser = passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureMessage: '/register',
  failureFlash: true,
});

const logoutUser = (req, res) => {
  try {
    req.session.destroy(function (err) {
      res.redirect('/'); //Inside a callback… bulletproof!
    });
  } catch (error) {
    console.log(error.message);
  }
};

const changePassword = async (req, res) => {
  const { id } = req.params;
  try {
    const dataUser = await UserGame.findOne({
      where: {
        id: id,
      },
    });

    const matchPassword = await bcrypt.compare(
      req.body.oldPassword,
      dataUser.password
    );

    if (!matchPassword)
      return res.status(400).json({ msg: 'password tidak sama' });

    const newPassword = await bcrypt.hash(req.body.newPassword, 12);

    const updatedData = await UserGame.update(
      {
        ...UserGame,
        password: newPassword,
      },
      { where: { id: id } }
    );
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = { loginUser, logoutUser, changePassword };
