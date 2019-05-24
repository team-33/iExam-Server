const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('./../../models/user-model');
const {validateBody, schemas} = require('./../../helpers/helper');

const passportSignIn = passport.authenticate('local', {session: false});

router.route('/signup').post(validateBody(schemas.authSchema), async (req, res, next) => {
    console.log(req.body);
    const {email, password} = req.body;

    // Check if there is a user with the same email
    const foundUser = await User.findOne({"local.email": email});
    if (foundUser) {
        return res.status(403).json({error: 'Email is already in use'});
    }

    // Create a new user
    const newUser = new User({
        method: 'local',
        local: {
            email: email,
            password: password,
        }
    });

    await newUser.save();

    // Generate the token
    var token = jwt.sign({id: newUser.id}, process.env.JWT_SECRET_KEY);
    // Respond with token
    res.status(200).json({token});
});

router.route('/signin')
    .post(validateBody(schemas.authSchema), passportSignIn, async (req, res, next) => {
        // Generate token
        const token = jwt.sign({id: req.user.id}, process.env.JWT_SECRET_KEY);
        res.status(200).json({token});
    });

module.exports = router;