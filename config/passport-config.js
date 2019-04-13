const passport = require('passport');
const GoogleStrategy = require('passport-google-plus-token');

passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .then(user => done(null, user))
      .catch(error => done(error, null))
  })

passport.use('google' ,
    new GoogleStrategy({
        callbackURL: '/auth/google/redirect',
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_ID
    }, (accessToken, refreshToken, profile, done) => {
        console.log(accessToken),
        console.log(refreshToken),
        console.log(profile)
        done(null,{user:'sample test'})
    })
)
