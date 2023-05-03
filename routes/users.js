const express = require("express");
const userRouter = express.Router();
const { celebrate, Joi } = require("celebrate");

const {
  getUsers,
  createUser,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
} = require("../controllers/users");

userRouter.get("/", getUsers);

userRouter.get("/:userId", getUserById);

userRouter.post("/", createUser);

userRouter.patch("/me", updateUserInfo);

userRouter.patch("/me/avatar", updateUserAvatar);

module.exports = userRouter;
