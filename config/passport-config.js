const passport = require('passport');
const GoogleStrategy = require('passport-google-plus-token');
const User = require('../models/user-model')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(error => done(error, null))
})

passport.use('google',
  new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_ID
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const existingUser = await User.findOne({ 'google.id': profile.id });

      if (existingUser) return done(null, existingUser);

      var newUser = new User({
        method: 'google',
        google: {
          id: profile.id,
          email: profile.emails[0].value,
          given_name: profile.name.givenName,
          family_name: profile.name.familyName,
          photo: profile.photos[0].value
        }
      });
      await newUser.save();
      done(null, newUser);
    } catch (err) {
      done(err, false, err.message);
    }
  })
)
