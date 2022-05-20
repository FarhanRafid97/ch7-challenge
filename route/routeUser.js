const express = require('express');
const { addUser, getUser } = require('../controllers/user');
const { userLogin, logoutUser } = require('../controllers/authUser');
const { isLogged } = require('../middleware/isLogged');

const routerUser = express.Router();

routerUser.post('/user', addUser);
routerUser.get('/user', getUser);
routerUser.put('/user', isLogged, getUser);

//====> AUTH USER  <===
routerUser.post('/user/login', userLogin);
routerUser.delete('/user/logout', logoutUser);

module.exports = { routerUser };
