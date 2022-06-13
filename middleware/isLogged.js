module.exports = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  req.flash('msgFail', 'register');
  res.redirect('/register-admin');
};
