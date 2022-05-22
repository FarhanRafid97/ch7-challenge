const express = require('express');
const { postHistory, getUserHistory } = require('../controllers/history');

const routeHistory = express.Router();

routeHistory.post('/history', postHistory);
routeHistory.get('/dashboard/history/:id', getUserHistory);

module.exports = { routeHistory };
