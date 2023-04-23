const express = require("express");

const errorRouter = express.Router();

const  errNotFound  = require('../controllers/error')

errorRouter.all("/*", errNotFound)

module.exports = errorRouter

