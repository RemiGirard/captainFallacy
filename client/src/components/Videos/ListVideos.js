import React from "react";
import axios from 'axios';

import './ListVideos.css';

class ListVideos extends React.Component{
    state = {
        videos: [],
        thumbnailSize: [320, 230],
        pictureSize: 'medium'
    }

    componentDidMount() {
        axios.get('/api/videos')
            .then(res => {
                const videos = res.data;
                console.log(videos);
                this.setState({videos});
            })
    }
    render() {
        return (
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center',width: '100%',paddingRight: 10,paddingLeft: 10}}>
                {
                    this.state.videos.map(video => {
                        return (
                            <a href={"/video/"+video.youtubeId} className="card text-decoration-none" style={{display: 'flex',flexDirection: 'column',flexShrink: 0,marginLeft: 5,marginRight: 5, marginBottom: 5, marginTop: 5, width: this.state.thumbnailSize[0],height: this.state.thumbnailSize[1]}}>
                                <img className="card-img-top" src={video.thumbnails[this.state.pictureSize].url} alt={video.title}/>
                                <div className="card-body" style={{padding: 0}}>
                                    <h5 className="card-title text-decoration-none" style={{marginLeft: 5,marginBottom: 5,textOverflow: 'ellipsis',whiteSpace: 'nowrap', overflow: 'hidden', textDecoration: 'none', color: "black"}}>{video.title}</h5>
                                    <p className="card-subtitle text-muted text-decoration-none" style={{marginLeft: 5,textOverflow: 'ellipsis',whiteSpace: 'nowrap', overflow: 'hidden', textDecoration: 'none'}}>by {video.channelTitle}</p>
                                </div>
                            </a>

                        )
                    })
                }
            </div>
        )
    }
}

export default ListVideos;
