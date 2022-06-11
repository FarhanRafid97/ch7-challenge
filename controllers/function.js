const logicFight = (p1, p2) => {
  if (p1 === p2) {
    return 'draw draw';
  }
  if (p1 === 'rock') {
    return p2 === 'scissors' ? 'player 1 Win ' : 'player 1 Lose';
  }
  if (p1 === 'papper') {
    return p2 === 'rock' ? 'player 1 Win ' : 'player 1 Lose';
  }
  if (p1 === 'scissors') {
    return p2 === 'papper' ? 'player 1 Win ' : 'player 1 Lose';
  }
};

module.exports = logicFight;
