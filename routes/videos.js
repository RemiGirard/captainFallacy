var express = require('express');
var router = express.Router({mergeParams: true});
let addVideo = require('../services/videosHandler');

router.get('/', function(req, res, next){
    res.send('videosAPI');
});

router.post('/add', async function(req, res, next){
    const userId = '5ee498ba8bf953432cb4cf4b'; // testing purpose
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

module.exports = router;
