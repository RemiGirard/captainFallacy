const mongoose = require('mongoose');
const Video = mongoose.model('videos');
const youtubeDetailsGetter = require('./youtubeDetailsGetter');

const listVideos = async () => {
    return await Video.find({}, 'title channelTitle youtubeId thumbnails -_id');
}

const addVideo = async (youtubeId, authorId) => {
    let currentVideo = await Video.findOne({youtubeId}, function (err, video) {
        return video;
    })
    if (currentVideo) {
        return [403, 'already exist'];
    } else {
        const {title, channelTitle, thumbnails} = await youtubeDetailsGetter(youtubeId);
        await new Video({
            authorId,
            youtubeId,
            title,
            channelTitle,
            thumbnails,
            date: new Date()
        }).save();
        return [201, 'successfully added: '+title ];
    }
};

module.exports = {addVideo, listVideos};
