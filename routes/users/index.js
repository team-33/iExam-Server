var express = require('express');
var router = express.Router();

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

module.exports = router;