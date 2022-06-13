//====FUNCTION LOGIC FOR FIGHT GAME
const logicFight = (p1, p2) => {
  if (p1 === p2) {
    return 'draw';
  }
  if (p1 === 'rock') {
    return p2 === 'scissors' ? 'player 1 Win' : 'player 1 Lose';
  }
  if (p1 === 'papper') {
    return p2 === 'rock' ? 'player 1 Win' : 'player 1 Lose';
  }
  if (p1 === 'scissors') {
    return p2 === 'papper' ? 'player 1 Win' : 'player 1 Lose';
  }
};

const whoWinLogic = (score1, score2) => {
  let ket = {};
  if (score1 === score2) {
    ket = { player1: 'draw', player2: 'draw' };
  } else if (score1 > score2) {
    ket = { player1: 'Win', player2: 'Lose' };
  } else if (score1 < score2) {
    ket = { player1: 'lose', player2: 'win' };
  }
  return ket;
};
module.exports = { logicFight, whoWinLogic };
