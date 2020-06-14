const axios = require('axios');
const keys = require('../config/keys');

const APIKey = keys.youtubeAPIKey;

const youtubeDetailsGetter = async (youtubeId) => {
    const response = axios({
        method: 'get',
        url: 'https://www.googleapis.com/youtube/v3/videos',
        params: {
            part: 'snippet',
            id: youtubeId,
            key: APIKey
        }
    });
    let youtubeAPIError = null;
    let {title, channelTitle, thumbnails} = await response.then((result) => {
        return result.data.items[0].snippet;
    }, (error) => {
        youtubeAPIError = true;
        return {};
    });
    if(youtubeAPIError){
        return 'error on the Youtube API request';
    }
    return {
        title,
        channelTitle,
        thumbnails
    }
}

module.exports = youtubeDetailsGetter;
