var express = require('express');
var router = express.Router({mergeParams: true});
let {addVideo, listVideos} = require('../services/videosHandler');
let {addQuote, listQuotes} = require('../services/quotesHandler');

router.get('/', async function(req, res, next){
    let videoList = await listVideos();
    res.send(videoList);
});

router.post('/add', async function(req, res, next){
    const userId = req.user._id;
    const youtubeURL = req.body.youtubeURL;
    const match = youtubeURL.match(/.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/);

    if (!youtubeURL || !match){
        console.log('invalid');
        res.status(400).send('invalid request', );
    } else {
        const youtubeId = match[1];
        let addVideoRequest = await addVideo(youtubeId, userId);
        res.status(addVideoRequest[0]).send(addVideoRequest[1]);
    }
});

router.get('/:youtubeId/quotes', async function(req, res, next){
    let youtubeId = req.params.youtubeId;
    console.log('youtubeId: ',youtubeId);
    let quoteList = await listQuotes(youtubeId);
    res.status(quoteList[0]).send(quoteList[1]);
});

router.post('/quotes/add', async function (req, res, next) {
    const userId = req.user._id;
    let addQuoteRequest = await addQuote(req.body.quote, userId);
    res.status(addQuoteRequest[0]).send(addQuoteRequest[1]);
});

module.exports = router;
