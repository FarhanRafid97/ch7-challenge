const logicFight = require('./function');

const wait = {};

const data = {}; // Ini ceritanya model disimpen ke database
const { Room, PlayGame, UserGame } = require('../models');

function waitEnemyResponse(id) {
  return new Promise((resolve) => {
    wait[id] = { resolve };
  });
}

//====CREATE ROOM
const createRoom = async (req, res) => {
  try {
    console.log('ada');
    const room = await Room.create(req.body);
    res.json({ room, accessToken: room.generateToken() });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

//====GET AlL user
const allGameUser = async (req, res) => {
  try {
    console.log('ada');
    const user = await UserGame.findAll({ include: ['player1', 'player2'] });
    res.json({ user });
  } catch (error) {
    res.json({ msg: error.message });
  }
};
let p1;
let hasil;

//=== LOGIC PLAY GAME

const playGame = async (req, res) => {
  const id = req.params.id;
  const isRoomAvailable = await Room.findOne({
    where: {
      id,
    },
    include: 'playGame',
  });
  if (!isRoomAvailable) return res.json({ msg: 'room tidak ada' });
  const { p1Id, p2Id, p1choose, p2choose } = req.body;
  const isAvailable = await PlayGame.findAll({ where: { roomId: id } });

  console.log(isAvailable[isAvailable.length - 1]);
  if (
    isAvailable.length >= 3 &&
    isAvailable[isAvailable.length - 1].p2choose !== null
  )
    return res.json({ msg: 'room kadaluarsa', scoreAkhir: isRoomAvailable });

  if (!wait[id]) {
    p1 = p1choose;
    PlayGame.create({
      roomId: id,
      p1Id,
      p1choose,
    });
    // Player 1 menunggu respons player 2
    await waitEnemyResponse(id);
  } else {
    hasil = logicFight(p1, p2choose);
    // Player 2 merespons ke player 1 untuk selesai menunggu
    PlayGame.update(
      {
        p2Id,
        p2choose,
        condition: logicFight(p1, p2choose),
      },
      {
        where: {
          roomId: id,
          p2Id: null,
          p2choose: null,
          condition: null,
        },
      }
    );
    wait[id].resolve();
    delete wait[id];
  }

  res.json(hasil);
};
module.exports = { playGame, createRoom, allGameUser };
