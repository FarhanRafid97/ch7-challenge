const express = require('express');
const {
  addUser,
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

routerUser.post('/user', addUser);
routerUser.get('/user', getUser);
routerUser.put('/user/:id', editUser);
routerUser.delete('/user/:id', deleteUser);

//====> AUTH USER  <===
routerUser.post('/user/login', userLogin);
routerUser.put('/user/changePassword/:id', changePassword);
routerUser.delete('/user/logout', logoutUser);

module.exports = { routerUser };
