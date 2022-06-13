const { Admin } = require('../models');
const passport = require('../lib/passport');

const registerAdmin = async (req, res, next) => {
  try {
    const isDuplicate = await Admin.findOne({
      where: { username: req.body.username },
    });
    console.log(isDuplicate);
    if (isDuplicate) return res.json({ msg: 'username Sudah Ada' });
    await Admin.register(req.body);
    res.redirect('/');
  } catch (error) {
    next(error);
  }
};

const loginAdmin = passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/register-admin',
  failureMessage: 'register',
  failureFlash: true,
});

module.exports = { loginAdmin, registerAdmin };
