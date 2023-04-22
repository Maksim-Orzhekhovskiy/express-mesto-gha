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


module.exports = userRouter;
