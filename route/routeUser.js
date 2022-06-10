const express = require('express');
const {
  addUser,
  getUser,
  deleteUser,
  editUser,
} = require('../controllers/user');

//=== auth user
const {
  loginUser,
  logoutUser,
  changePassword,
  whoAmI,
} = require('../controllers/authUser');
const isLoggedUser = require('../middleware/isLoggedUser');

const routerUser = express.Router();

routerUser.get('/user', getUser);
routerUser.post('/user', addUser);
routerUser.put('/user/:id', editUser);
routerUser.delete('/user/:id', deleteUser);

//====> AUTH USER  <===
routerUser.post('/login', loginUser);
routerUser.put('/user/changePassword/:id', changePassword);
routerUser.delete('/logout', logoutUser);
routerUser.get('/whoAmi', isLoggedUser, whoAmI);

module.exports = routerUser;
