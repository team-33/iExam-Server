var express = require('express');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.route('/').post(passport.authenticate('google',{session:false}),(req,res,next) => {
  var token = jwt.sign({id:req.user.id},process.env.JWT_SECRET_KEY);
  res.send({token:token});
});

module.exports = router;
