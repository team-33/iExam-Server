var express = require('express');
var router = express.Router();

router.get('/profile', (req, res) => {
    var user = req.user.method === 'google' ? req.user.google : {error: 1};
    user.id = undefined;

    res.send(user);
});

module.exports = router;