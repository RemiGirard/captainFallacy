const mongoose = require('mongoose')
const {Schema} = mongoose

const commentSchema = new Schema({
    videoId: String,
    authorId: String,
    date: Date,
    timeRange: String,
    content: String
})

mongoose.model('comment', commentSchema)
