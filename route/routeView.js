const express = require('express');
const {
  loginUserView,
  registerView,
  dashboardView,
} = require('../controllers/viewUser', {
  layout: 'layouts/main',
});

const { isLogged } = require('../middleware/isLogged');

const routeView = express.Router();

routeView.get('/', loginUserView);
routeView.get('/register', registerView);
routeView.get('/dashboard', isLogged, dashboardView);

module.exports = { routeView };
