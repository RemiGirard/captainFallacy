const Video = mongoose.model('video');

const addVideo = async (youtubeId) => {
    let currentVideo = await Video.findOne({youtubeId}, function (err, video) {
        return video
    })
    if (currentVideo) {
        return 'already exist'
    } else {
        const video = await new User({youtubeId, name: profile.displayName}).save()
        callback(null, user)
    }
}