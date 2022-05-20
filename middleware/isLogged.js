const isLogged = (req, res, next) => {
  const authHeader = req.headers.cookie;
  const dataCookie = authHeader.split(' ')[1];
  console.log(dataCookie);
  if (!dataCookie) return res.status(400).json({ msg: 'login dlu' });

  next();
};

module.exports = { isLogged };
