const { UserGame } = require('../models');
const bcrypt = require('bcrypt');

const userLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userLogin = await UserGame.findOne({
      where: { username: username },
    });
    if (!userLogin) return res.status(400).json({ msg: 'email tidak ada' });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userLogin.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ msg: 'password anda salah' });
    res.cookie('logged', process.env.COOKIES_SECRET_KEY, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      id: userLogin.id,
      username: userLogin.username,
      email: userLogin.email,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    const cookiesLogged = req.cookies.logged;
    if (!cookiesLogged) return res.sendStatus(204);

    res.clearCookie('logged');
    return res.sendStatus(200).json({ msg: 'and berhasil logout' });
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

module.exports = { userLogin, logoutUser, changePassword };
