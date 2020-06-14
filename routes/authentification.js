var express = require('express');
var router = express.Router();
var passport = require('passport');
require('../services/userSerializer');
require('../services/googleAuthentificator');
require('../services/githubAuthentificator');


router.get('/google',
    passport.authenticate('google', {scope: ['profile']})
);

router.get('/github',
    passport.authenticate('github', {scope: ['user:email']})
);

router.get('/google/callback',
    passport.authenticate('google', {failureRedirect: '/login'}),
    function (req, res) {
        res.redirect('/')
    }
);

router.get('/github/callback',
    passport.authenticate('github', {failureRedirect: '/login'}),
    function (req, res) {
        res.redirect('/')
    }
);

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/currentuser', (req, res, next) => {
    res.send(req.user);
});

module.exports = router;
