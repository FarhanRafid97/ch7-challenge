const express = require('express');
const { playGame, createRoom } = require('../controllers/gameController');

const routeGame = express.Router();

routeGame.post('/create-room', createRoom);
routeGame.post('/play-game/:id', playGame);

module.exports = routeGame;
