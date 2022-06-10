const express = require('express');
const {
  loginUserView,
  registerView,
  dashboardView,
  detailUser,
  createUserView,
  editUser,
  createUser,
  registerAdmin,
} = require('../controllers/viewUser', {
  layout: 'layouts/main',
});

const isLogged = require('../middleware/isLogged');

const routeView = express.Router();

routeView.get('/', loginUserView);
routeView.get('/register', registerView);
routeView.get('/register-admin', registerAdmin);
routeView.get('/dashboard', isLogged, dashboardView);
routeView.get('/dashboard/create', isLogged, createUserView);
routeView.post('/dashboard/create', isLogged, createUser);
routeView.get('/dashboard/edit/:id', isLogged, editUser);
routeView.get('/dashboard/:id', isLogged, detailUser);

module.exports = routeView;
