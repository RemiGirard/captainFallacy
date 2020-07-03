const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const User = mongoose.model('users');

// passport.serializeUser((user, done) => {
//     done(null, user.id)
// })
//
// passport.deserializeUser((id, done) => {
//     User.findById(id).then(user => {
//         done(null, user)
//     })
// })

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: 'https://captain-fallacy.herokuapp.com/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, callback) => {
        let currentUser = await User.findOne({ googleId: profile.id }, function(err, user) {
            return callback(err, user)
        })
        if(currentUser){
            return callback(null, currentUser)
        } else {
            const user = await new User({googleId: profile.id, name: profile.displayName}).save()
            callback(null, user)
        }
    }
))
