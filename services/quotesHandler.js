const mongoose = require('mongoose');
const Video = mongoose.model('videos');
const Quote = mongoose.model('quotes');

const listQuotes = async (youtubeId) => {
    let currentVideo = await Video.findOne({youtubeId}, function (err, video) {
        return video;
    });
    if (!currentVideo) {
        return [403, 'server error while trying to find the video associated'];
    }
    let quotes = await Quote
        .find({videoId: currentVideo._id}, 'start end content', {sort: 'start'}, function (err, result) {
            return result;
        });
    return [201, quotes];
}

const addQuote = async (quote, authorId) => {
    console.log('quote: ',quote);
    const {youtubeId, start, end, content} = quote;
    let currentVideo = await Video.findOne({youtubeId}, function (err, video) {
        return video;
    })
    if (!currentVideo) {
        return [403, 'server error while trying to find the video associated'];
    } else {
        console.log('before save')
        await new Quote({
            videoId: currentVideo._id,
            authorId,
            start,
            end,
            content,
            date: new Date(),
        }).save();
        return [201, 'successfully added: ' + content];
    }
};

module.exports = {addQuote, listQuotes};
