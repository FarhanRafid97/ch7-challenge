const express = require('express');
const {
  loginUserView,
  registerView,
  dashboardView,
  detailUser,
  createUserView,
  editUser,
  createUser,
} = require('../controllers/viewUser', {
  layout: 'layouts/main',
});

const { isLogged } = require('../middleware/isLogged');

const routeView = express.Router();

routeView.get('/', loginUserView);
routeView.get('/register', registerView);
routeView.get('/dashboard', isLogged, dashboardView);
routeView.get('/dashboard/create', createUserView);
routeView.post('/dashboard/create', createUser);
routeView.get('/dashboard/edit/:id', editUser);
routeView.get('/dashboard/:id', isLogged, detailUser);

module.exports = { routeView };
