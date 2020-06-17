const mongoose = require('mongoose');
const {Schema} = mongoose;

const quoteSchema = new Schema({
    videoId: String,
    authorId: String,
    start: String,
    end: String,
    content: String,
    date: Date
});

mongoose.model('quotes', quoteSchema);
