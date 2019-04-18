var express = require('express');
var router = express.Router();
const passport = require('passport');

const passportJWT = passport.authenticate('jwt', { session: false });
const Paper = require('../../models/paper-model');

router.get('/:subject/:year' ,async (req,res,next) => {
    var {subject,year} = req.params;
    var aggregates = {
        $match:{
            subject:{
                $regex:'^'+subject+'$',$options:'i'
            },
            year: +year
        }
    };
    try{
    var papers = await Paper.aggregate([aggregates]);
    res.send(papers[0]);
    } catch (e){
        res.status(500).send(e.message);
    }
    
})
router.get('/' ,async (req,res,next) => {
    try{
    var papers = await Paper.find();
    res.send(papers);
    } catch (e) {
        console.log('error',e);
        res.status(500).send('error');
    }
})

module.exports = router;
