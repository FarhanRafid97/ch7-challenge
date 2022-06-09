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
} = require('../controllers/authUser');
const { isLogged } = require('../middleware/isLogged');

const routerUser = express.Router();

routerUser.get('/api/user', getUser);

routerUser.post('/api/user', addUser);
routerUser.put('/api/user/:id', editUser);
routerUser.delete('/api/user/:id', deleteUser);

//====> AUTH USER  <===
routerUser.post('/api/login', loginUser);
routerUser.put('/api/user/changePassword/:id', changePassword);
routerUser.delete('/api/logout', logoutUser);

module.exports = { routerUser };
