const express = require('express');
const {
  postHistory,
  getUserHistory,
  deleteHistory,
} = require('../controllers/history');

const routeHistory = express.Router();

routeHistory.post('/history', postHistory);
routeHistory.delete('/dashboard/history/delete/:idUser', deleteHistory);
routeHistory.get('/dashboard/history/:id', getUserHistory);

module.exports = routeHistory;
