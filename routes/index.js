var express = require('express');
var router = express.Router();
const passport = require('passport');

var authRouter = require('./auth');
var paperRouter = require('./papers');
const passportJWT = passport.authenticate('jwt', { session: false });


router.use('/auth',authRouter)
router.use('/papers',passportJWT,paperRouter)

module.exports = router;
