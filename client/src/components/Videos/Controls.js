import React, {useState, Link} from "react";
import {Slider} from '@material-ui/core';

import playButton from '../../images/svgVideoControl/play-button.svg';
import pause from '../../images/svgVideoControl/pause.svg';
import fastForward from '../../images/svgVideoControl/fast-forward.svg';
import rewind from '../../images/svgVideoControl/rewind.svg';

// Icons made by <a href="https://www.flaticon.com/authors/chanut" title="Chanut">Chanut</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>

const Controls = (props) => {
    const showPlayButton = () => {
        return props.playing ? pause : playButton;
    }

    return (
        <div style={{display: "flex", justifyContent: "space-between", width: "100%", maxHeight: "50px"}}>
            <img onClick={()=>{props.onRelativeSeek(-10)}} src={rewind} alt="rewind"/>
            <img onClick={props.onPauseClick} src={showPlayButton()} alt="playButton"/>
            <img onClick={()=>{props.onRelativeSeek(10)}} src={fastForward} alt="fastForward"/>
            <Slider
                min={0} max={100}
                value={props.volume*100}
                onChange={(event,value) => {
                    props.setVolume(value/100)
                }}
            />
            <Slider
                min={0} max={10}
                marks={[{value: 5, label: 'normal'}]}
                value={((props.playbackRate-1)/2+1)*5}
                onChange={(event, value) => {
                    props.setPlaybackRate((((value/5)-1)*2)+1)
                }}
            />

            <a to="/surveys/new" href="" >
                <i className="material-icons large">add_box</i>
            </a>
        </div>
    )
}

export default Controls;
