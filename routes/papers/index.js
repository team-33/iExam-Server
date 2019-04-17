var express = require('express');
var router = express.Router();
const passport = require('passport');

const passportJWT = passport.authenticate('jwt', { session: false });
const Paper = require('../../models/paper-model');

router.get('/:subject/:year' ,(req,res,next) => {
    
})
router.get('/' ,async (req,res,next) => {
    var papers = await Paper.find();
    res.send(papers);
})

module.exports = router;
