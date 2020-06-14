const mongoose = require('mongoose');
const Video = mongoose.model('videos');
const youtubeDetailsGetter = require('./youtubeDetailsGetter');

const addVideo = async (youtubeId, authorId) => {
    let currentVideo = await Video.findOne({youtubeId}, function (err, video) {
        return video;
    })
    // if (currentVideo) {
    //     return [403, 'already exist'];
    // } else {
        // youtubeId
        const {title, channelTitle, thumbnails} = await youtubeDetailsGetter(youtubeId);
        // console.log('youtubeDetails: ',youtubeDetails.thumbnails);
        const video = await new Video({
            authorId,
            youtubeId,
            title,
            channelTitle,
            thumbnails
        }).save();
        return [201, 'successfully added: '+title ];
    // }
};

module.exports = addVideo;
