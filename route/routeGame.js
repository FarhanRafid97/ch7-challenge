const express = require('express');
const { playGame, createRoom } = require('../controllers/gameController');

const routeGame = express.Router();
const isLoggedUser = require('../middleware/isLoggedUser');

routeGame.post('/create-room', createRoom);
routeGame.post('/play-game/:id', playGame);

module.exports = routeGame;
