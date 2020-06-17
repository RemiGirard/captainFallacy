const mongoose = require('mongoose');
const {Schema} = mongoose;

const fallacySchema = new Schema({
    quoteId: String,
    fallacyId: String,
    authorId: String,
    date: Date
});

mongoose.model('fallacies', fallacySchema);
