var express = require('express');
var router = express.Router();

const Paper = require('../../models/paper-model');

router.get('/get/:id', async (req, res) => {
    const {id} = req.params;
    try {
        var papers = await Paper.findById(id);
        res.send(papers ? papers : {error: 1});
    } catch (e) {
        res.status(500).send(e.message);
    }

});

router.get('/', async (req, res) => {
    try {
        var papers = await Paper.find();
        res.send(papers);
    } catch (e) {
        console.log('error', e);
        res.status(500).send('error');
    }
});

router.post('/new', async (req, res) => {
    try {
        var newPaper = new Paper(req.body);
        await newPaper.save();
        res.send(newPaper);
    } catch (e) {
        console.log('error', e);
        res.status(500).send('error');
    }
});

module.exports = router;
