const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    id: String,
    name: String,
    googleId: String,
    hash: String,
    email: String
})

mongoose.model('users', userSchema)
