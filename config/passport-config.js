const passport = require('passport');
const GoogleStrategy = require('passport-google-plus-token');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');

const User = require('../models/user-model');

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(error => done(error, null))
})

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.JWT_SECRET_KEY
}, async (payload, done) => {
  try {
    // Find the user specified in token
    const user = await User.findById(payload.id);
    // If user doesn't exists, handle it
    if (!user) {
      return done(null, false);
    }

    // Otherwise, return the user
    done(null, user);
  } catch(error) {
    done(error, false);
  }
}));

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
