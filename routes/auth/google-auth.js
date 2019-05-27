const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.route('/')
    .post(passport.authenticate('google',{session:false}),(req,res,next) => {
  var token = jwt.sign({id:req.user.id},process.env.JWT_SECRET_KEY);
  res.status(200).send({token:token});
});

module.exports = router;
