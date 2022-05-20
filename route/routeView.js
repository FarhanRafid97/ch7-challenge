const express = require('express');
const { loginUserView, registerView } = require('../controllers/viewUser', {
  layout: 'layouts/main',
});

const { isLogged } = require('../middleware/isLogged');

const routeView = express.Router();

routeView.get('/', loginUserView);
routeView.get('/register', registerView);

module.exports = { routeView };
