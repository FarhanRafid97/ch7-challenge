const express = require('express');
const { registerAdmin, loginAdmin } = require('../controllers/adminController');

const routeAdmin = express.Router();

routeAdmin.post('/register', registerAdmin);
routeAdmin.post('/login', loginAdmin);

module.exports = routeAdmin;
