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
    res.cookie('logged', 'secret', {
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

module.exports = { userLogin, logoutUser };
