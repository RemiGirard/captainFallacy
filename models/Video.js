const mongoose = require('mongoose')
const {Schema} = mongoose

const videoSchema = new Schema({
    name: String,
    date: Date,
    link: String,
    integratedVideo: String,
    authorId: String
})

mongoose.model('videos', videoSchema)

