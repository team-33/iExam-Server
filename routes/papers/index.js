var express = require('express');
var router = express.Router();

const Paper = require('../../models/paper-model');

router.get('/:subject/:year' ,async (req,res,next) => {
    const {subject,year} = req.params;
    const aggregates = {
        $match:{
            subject:{
                $regex:'^'+subject+'$',$options:'i'
            },
            year: +year
        }
    };
    try{
    var papers = await Paper.aggregate([aggregates]);
    res.send(papers[0] ? papers[0] : {error:1});
    } catch (e){
        res.status(500).send(e.message);
    }
    
});

router.get('/' ,async (req,res,next) => {
    try{
    var papers = await Paper.find();
    res.send(papers);
    } catch (e) {
        console.log('error',e);
        res.status(500).send('error');
    }
});

router.post('/new' ,async (req,res,next) => {
    try{
        var newPaper = new Paper(req.body);
        await newPaper.save();
        res.send(newPaper);
    } catch (e) {
        console.log('error',e);
        res.status(500).send('error');
    }
});

module.exports = router;
