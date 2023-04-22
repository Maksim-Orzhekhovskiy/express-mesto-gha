const Card = require('../models/cards');

const CREATE_CODE = 201;

getAllCards = (req, res) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(CREATE_CODE).send(card))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail()
    .then(() => res.send({ message: 'Картинка удалена' }))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

const cardLikesUpdate = (req, res, updateData) => {
  Card.findByIdAndUpdate(req.params.cardId, updateData, { new: true })
    .populate(['owner', 'likes'])
    .then((card) => res.send(card))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: 'Ошибка сервера' });
    });
};

likeCard = (req, res) => {
  const ownerId = req.user._id;
  const updateData = { $addToSet: { likes: ownerId } };
  cardLikesUpdate(req, res, updateData);
};

dislikeCard = (req, res) => {
  const ownerId = req.user._id;
  const updateData = { $pull: { likes: ownerId } };
  cardLikesUpdate(req, res, updateData);
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
