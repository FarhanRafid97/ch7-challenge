const { UserGame, UserGameHistory } = require('../models');

const postHistory = async (req, res) => {
  const postHistory = req.body;
  try {
    const newHistory = await UserGameHistory.create(postHistory);
    res.status(200).json({ newHistory });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const getUserHistory = async (req, res) => {
  const { id } = req.params;
  const data = await UserGame.findOne({
    include: ['UserGameHistories'],
    where: {
      id: id,
    },
  });
  res.render('pages/dashboard/history', {
    data: data.UserGameHistories,
    pageTitle: `History ${data.username}`,
    msg: req.flash('msg'),
  });
};

module.exports = { postHistory, getUserHistory };
