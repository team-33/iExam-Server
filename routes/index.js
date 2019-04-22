var express = require('express');
var router = express.Router();
const passport = require('passport');

var authRouter = require('./auth');
var paperRouter = require('./papers');
var userRouter = require('./users');

const passportJWT = passport.authenticate('jwt', { session: false });


router.use('/auth',authRouter);
router.use('/papers',passportJWT,paperRouter);
router.use('/users',passportJWT,userRouter);

module.exports = router;
