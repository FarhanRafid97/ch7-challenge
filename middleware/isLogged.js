const isLogged = (req, res, next) => {
  const authHeader = req.cookies.logged;

  console.log(authHeader);
  if (authHeader !== process.env.COOKIES_SECRET_KEY) return res.redirect('/');

  next();
};

module.exports = { isLogged };
