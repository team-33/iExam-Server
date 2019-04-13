var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.route('/').post(passport.authenticate('google',{session:false}),(req,res,next) => {
  res.send(req.user);
  console.log(req.user);
});

module.exports = router;
