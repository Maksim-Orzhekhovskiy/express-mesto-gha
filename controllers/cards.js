const Card = require("../model/cards");
const { handleErrors } = require("../errors/errors");

const getAllCards = (req, res) => {
  Card.find({})
    .populate(["owner", "likes"])
    .then((cards) => res.send(cards))
    .catch((err) => handleErrors(err, res));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then((card) => card.populate("owner"))
    .then((card) => res.status(201).send(card))
    .catch((err) => handleErrors(err, res));
};

const  deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail()
    .then(() => res.send({ message: "Картинка удалена" }))
    .catch((err) => handleErrors(err, res));
};

const cardLikesUpdate = (req, res, updateData) => {
  Card.findByIdAndUpdate(req.params.cardId, updateData, { new: true })
    .orFail()
    .populate(["owner", "likes"])
    .then((card) => res.send(card))
    .catch((err) => handleErrors(err, res));
};

const likeCard = (req, res) => {
  const ownerId = req.user._id;
  const updateData = { $addToSet: { likes: ownerId } };
  cardLikesUpdate(req, res, updateData);
};

const dislikeCard = (req, res) => {
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
