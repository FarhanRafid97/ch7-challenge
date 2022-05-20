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

routerUser.get('/user', getUser);
routerUser.get('/user/:id', detailUser);
routerUser.post('/user', addUser);
routerUser.put('/user/:id', editUser);
routerUser.delete('/user/:id', deleteUser);

//====> AUTH USER  <===
routerUser.post('/user/login', userLogin);
routerUser.put('/user/changePassword/:id', changePassword);
routerUser.delete('/user/logout', logoutUser);

module.exports = { routerUser };
