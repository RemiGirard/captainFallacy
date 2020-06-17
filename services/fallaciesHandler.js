const mongoose = require('mongoose');
const Fallacy = mongoose.model('fallacies');
const Quote = mongoose.model('quotes');

const listFallacies = async (quoteId) => {
    let currentQuote = await Quote.findOne({_id: quoteId}, function (err, result) {
        return result;
    });
    if (!currentQuote) {
        return [403, 'server error while trying to find the quote associated'];
    }
    let fallacies = await Fallacy
        .find({quoteId: currentQuote._id}, 'fallacyId -_id', {sort: 'fallacyId'}, function (err, result) {
            return result;
        });
    return [201, fallacies];
}

const addFallacy = async (quoteId, authorId, fallacyId) => {
    let currentQuote = await Quote.findOne({_id: quoteId}, function (err, result) {
        return result;
    })
    if (!currentQuote) {
        return [403, 'server error while trying to find quote'];
    } else {
        let currentFallacy = await Fallacy.findOne({quoteId, fallacyId}, function (err, result){
            return result;
        });
        if(currentFallacy){
            return [403, 'server error: fallacy already registered']
        } else {
            await new Fallacy({
                authorId,
                quoteId,
                fallacyId,
                date: new Date()
            }).save();
            return [201, 'successfully added: ' + fallacyId];
        }
    }
};

module.exports = {addFallacy, listFallacies};
