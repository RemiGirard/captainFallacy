var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let passport = require('passport');
let mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
mongoose.connect('mongodb+srv://dbUser:9OmFG0ki85rzpJFd@cluster0.wybcp.mongodb.net/prod?retryWrites=true&w=majority', { useNewUrlParser: true });
require('./models/User');
require('./models/Quote');
require('./models/Video');
require('./models/Fallacy');

let requireLogin = require('./middlewares/requireLogin');
//var indexRouter = require('./routes/index');
var authenticationRouter = require('./routes/authentification');
var apiRouter = require('./routes/api');

var app = express()

app.use(bodyParser.json());

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize())
app.use(passport.session())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/auth', authenticationRouter);
app.use('/api', requireLogin, apiRouter);
// app.use('/api', requireLogin, apiRouter);

if(true){
    app.use(express.static('client/build'));
    const path = require('path');
    console.log('client building');
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

module.exports = app;
