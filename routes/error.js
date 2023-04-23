const express = require("express");

const router = express.Router();

const errNotFound  = require('../controllers/error')


router.all('/*', errNotFound);

module.exports = router;