var express = require('express');
var router = express.Router();
var authRouter = require('./auth/');

var authMiddle = (req,res,next) => {
    if(req.body.jwt) next();
    else res.status(401).send({status:1200,message:'unauthorized'});
}

router.use('/auth',authRouter)

module.exports = router;
