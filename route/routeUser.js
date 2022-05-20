const express = require('express');
const {
  addUser,
  detailUser,
  getUser,
  deleteUser,
  editUser,
} = require('../controllers/user');

//=== auth user
const {
  userLogin,
  logoutUser,
  changePassword,
} = require('../controllers/authUser');
const { isLogged } = require('../middleware/isLogged');

const routerUser = express.Router();

routerUser.get('/api/user', getUser);
routerUser.get('/api/user/:id', detailUser);
routerUser.post('/api/user', addUser);
routerUser.put('/api/user/:id', editUser);
routerUser.delete('/api/user/:id', deleteUser);

//====> AUTH USER  <===
routerUser.post('/api/user/login', userLogin);
routerUser.put('/api/user/changePassword/:id', changePassword);
routerUser.delete('/api/user/logout', logoutUser);

module.exports = { routerUser };
