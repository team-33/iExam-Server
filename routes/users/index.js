var express = require('express');
var router = express.Router();
var User = require('./../../models/user-model');

router.get('/profile', (req, res) => {
    var user;
    switch (req.user.method) {
        case 'google':
            user = req.user.google;
            break;
        case 'local':
            user = req.user.local;
            break;
        default:
            return res.status(403).send({error: 'error'})
    }
    user.id = undefined;
    user.password = undefined;

    res.send(user);
});

router.get('/all', async (req, res) => {

    var users = await User.find();
    users.map((user, key) => {
        user.local.password = undefined;
        if (user.method === 'google') users[key] = user.google;
        if (user.method === 'local') users[key] = user.local;
    });
    res.send(users);
});


module.exports = router;