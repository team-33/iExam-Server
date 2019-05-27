var express = require('express');
var router = express.Router();
var googleAuthRouter = require('./google-auth');
var localAuthRouter = require('./local');

router.use('/google', googleAuthRouter);
router.use('/local', localAuthRouter);

module.exports = router;
