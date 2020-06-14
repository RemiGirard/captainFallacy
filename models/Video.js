const mongoose = require('mongoose');
const {Schema} = mongoose;

const videoSchema = new Schema({
    title: String,
    channelTitle: String,
    date: Date,
    youtubeId: String,
    thumbnails: Object,
    integratedVideo: String,
    authorId: String
});

mongoose.model('videos', videoSchema);
