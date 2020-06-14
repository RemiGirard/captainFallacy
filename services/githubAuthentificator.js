const passport = require('passport');
const mongoose = require('mongoose');
const GitHubStrategy = require('passport-github2').Strategy;
const keys = require('../config/keys');
const User = mongoose.model('users');

passport.use(new GitHubStrategy({
    clientID: keys.githubClientID,
    clientSecret: keys.githubClientSecret,
    callbackURL: 'http://localhost:3000/auth/github/callback'
    },
    async (accessToken, refreshToken, profile, callback) => {
        let currentUser = await User.findOne({ githubId: profile.id }, function(err, user) {
            return callback(err, user);
        })
        if(currentUser){
            return callback(null, currentUser);
        } else {
            const user = await new User({githubId: profile.id, name: profile.username}).save();
            callback(null, user);
        }
    }
));
