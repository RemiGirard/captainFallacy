import React from "react";

const VideoPage = (props) => {
    let {youtubeId} = props.match.params;
    const videoLink = "https://www.youtube.com/embed/"+youtubeId;
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <iframe src={videoLink} allowFullScreen width="360px" height="200px" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"/>
        </div>
    )
}

export default VideoPage;
