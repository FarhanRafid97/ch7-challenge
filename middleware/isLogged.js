const isLogged = (req, res, next) => {
  const authHeader = req.cookies.logged?.key;

  if (authHeader !== process.env.COOKIES_SECRET_KEY) return res.redirect('/');

  next();
};

module.exports = { isLogged };
