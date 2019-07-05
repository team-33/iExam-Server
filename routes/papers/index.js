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

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    Paper.findById(id)
        .then(doc => {
            doc.remove();
            res.sendStatus(200)
        })
        .catch(e => {
            console.log("error", e);
            res.sendStatus(500)
        });
});

router.get('/add/check/:id/:number', (req, res) => {
    const id = req.params.id;
    Paper.findById(id)
        .then(doc => {
            console.log(doc.questions);
            res.sendStatus(200)
        })
        .catch(e => {
            console.log("error", e);
            res.sendStatus(500)
        });
});

router.post('/add/:id', (req, res) => {
    const id = req.params.id;
    // var item = {[req.body.number]: req.body};
    // console.log(item);
    Paper.findOne({_id: id})
        .then(doc => {
            // doc.questions = [];
            console.log(doc.questions);
            doc.questions.push(req.body);
            console.log("doc", doc);
            doc.save();
            res.sendStatus(200)
        })
        .catch(e => {

            console.log(e);
            res.sendStatus(401)
        });

});

module.exports = router;
