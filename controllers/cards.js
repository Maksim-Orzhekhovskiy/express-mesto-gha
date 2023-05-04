const Card = require("../model/cards");
const ForbiddenError = require('../errors/forbiddenError');

const getAllCards = (req, res, next) => {
  Card.find({})
    .populate(["owner", "likes"])
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  Card.create({ name, link, owner: ownerId })
    .then((card) => card.populate("owner"))
    .then((card) => res.status(201).send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      Card.deleteOne({ _id: card._id, owner: req.user._id })
        .then((result) => {
          if (result.deletedCount === 0) {
            throw new ForbiddenError("Невозможно удалить не свою карточку");
          } else {
            res.send({ message: "Картинка удалёна" });
          }
        })
        .catch(next);
    })
    .catch(next);
};

const cardLikesUpdate = (req, res, updateData, next) => {
  Card.findByIdAndUpdate(req.params.cardId, updateData, { new: true })
    .orFail()
    .populate(["owner", "likes"])
    .then((card) => res.send(card))
    .catch(next);
};

const likeCard = (req, res, next) => {
  const ownerId = req.user._id;
  const updateData = { $addToSet: { likes: ownerId } };
  cardLikesUpdate(req, res, updateData, next);
};

const dislikeCard = (req, res, next) => {
  const ownerId = req.user._id;
  const updateData = { $pull: { likes: ownerId } };
  cardLikesUpdate(req, res, updateData, next);
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
