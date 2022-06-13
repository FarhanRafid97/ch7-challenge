const { logicFight, whoWinLogic } = require('./function');

const wait = {};

const data = {}; // Ini ceritanya model disimpen ke database
const { Room, PlayGame, UserGameHistory } = require('../models');

function waitEnemyResponse(id) {
  return new Promise((resolve) => {
    wait[id] = { resolve };
  });
}

//====CREATE ROOM
const createRoom = async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.json({ room });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

//=== LOGIC PLAY GAME
let p1;
let hasil;

const playGame = async (req, res) => {
  const id = req.params.id;
  //check is room available
  const isRoomAvailable = await Room.findOne({
    where: {
      id,
    },
    include: 'playGame',
  });
  if (!isRoomAvailable) return res.json({ msg: 'room tidak ada' });

  const { p1Id, p2Id, p1choose, p2choose } = req.body;
  let player1 = { idPlayer1: null, scoreP1: 0 };
  let player2 = { idPlayer2: null, scoreP2: 0 };

  //check how many times player  played
  const isAvailable = await PlayGame.findAll({ where: { roomId: id } });
  const finalScore = isAvailable.map((score) => {
    player1.idPlayer1 = score.p1Id;
    player2.idPlayer2 = score.p2Id;
    if (score.condition === 'player 1 Win') {
      player1.scoreP1 += 1;
    } else if (score.condition === 'player 1 Lose') {
      player2.scoreP2 += 1;
    }
  });

  //====logic for room expire and input to history
  if (
    isAvailable.length >= 3 &&
    isAvailable[isAvailable.length - 1].p2choose !== null
  ) {
    let result = whoWinLogic(player1.scoreP1, player2.scoreP2);

    //====input history to database
    const isHistoryAvail = await UserGameHistory.findOne({
      where: { idRoom: id },
    });
    if (!isHistoryAvail) {
      await UserGameHistory.create({
        idRoom: id,
        idUser: player1.idPlayer1,
        idEnemy: player2.idPlayer2,
        winLose: result.player1,
      });
      await UserGameHistory.create({
        idRoom: id,
        idUser: player2.idPlayer2,
        idEnemy: player1.idPlayer1,
        winLose: result.player2,
      });
    }

    return res.json({
      msg: 'room kadaluarsa',

      result,

      scoreAkhir: isRoomAvailable,
    });
  }

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
module.exports = { playGame, createRoom };
