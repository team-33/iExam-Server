var express = require('express');
var router = express.Router();
var googleAuthRouter = require('./google-auth');

router.use('/google',googleAuthRouter)

module.exports = router;
