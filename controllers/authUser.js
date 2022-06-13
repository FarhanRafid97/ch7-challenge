const { UserGame } = require('../models');
const bcrypt = require('bcrypt');
const passport = require('../lib/passport');

const loginUser = async (req, res) => {
  try {
    const user = await UserGame.authenticate(req.body);
    const { id, username } = user;
    res.json({ id, username, accessToken: user.generateToken() });
  } catch (error) {
    res.json({ error: error.message });
  }
};

const whoAmI = (req, res) => {
  const curentUser = req.user;
  res.json(curentUser);
};

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

module.exports = { loginUser, whoAmI, logoutUser, changePassword };
