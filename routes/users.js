const express = require("express");

const userRouter = express.Router();

const {
  getUsers,
  createUser,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
} = require("../controllers/users");

userRouter.get("/users", getUsers);

userRouter.get("/:userId", getUserById);

userRouter.post("/users", createUser);

userRouter.patch("/me", updateUserInfo);

userRouter.patch("/me/avatar", updateUserAvatar);

/* userRouter.use("*", (req, res) => {
  res.status(404).send({ message: "Запрашиваемый ресурс не найден" });
}); */

module.exports = userRouter;
