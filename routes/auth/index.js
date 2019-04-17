var express = require('express');
var router = express.Router();
var googleAuthRouter = require('./google-auth');
const passport = require('passport');

router.use('/google',googleAuthRouter)

module.exports = router;
