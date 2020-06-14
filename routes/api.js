var express = require('express');
var router = express.Router();

var videosRouter = require('./videos');

router.use('/videos', videosRouter);

module.exports = router;
