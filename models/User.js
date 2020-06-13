const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name: String,
    googleId: String,
    githubId: String,
    hash: String,
    email: String
})

mongoose.model('users', userSchema)
