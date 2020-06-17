import React, {useState, useRef, useEffect} from "react";
import styles from './VideoPage.module.css';
import ReactPlayer from "react-player/youtube";

import Quotes from "../Quotes/Quotes";
import Fallacies from "../Fallacies/Fallacies";
import AddQuoteForm from "../Quotes/AddQuoteForm";
import SelectFallacies from "../Fallacies/SelectFallacy";
import Controls from "./Controls";
import axios from "axios";

const VideoPage = (props) => {
    let {youtubeId} = props.match.params;
    const youtubeLink = "https://www.youtube.com/watch?v="+youtubeId;

    const [playedSecondsDisplay, setPlayedSecondsDisplay] = useState(0);
    const player = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [editingText, setEditingText] = useState(false);
    const [quoteContent,setQuoteContent] = useState('');
    const [addNewQuote, setAddNewQuote] = useState(false);
    const [quotes, setQuotes] = useState([{
        start: '',
        end: '',
        content: ''
    }]);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [currentQuote, setCurrentQuote] = useState({});
    const [addNewFallacy, setAddNewFallacy] = useState(true);

    const playerSeekTo = (seconds = 10) => {
        player.current.seekTo(seconds,'seconds');
    }

    useEffect(() => {
        axios.get('/api/videos/'+youtubeId+'/quotes')
            .then(res => {
                // const videos = res.data;
                // console.log(videos);
                // this.setState({videos});
                console.log('quotes res: ',res.data);
                setQuotes(res.data);
            })
    }, []);

    let bottomPart = () => {
        if(addNewQuote){
            return <AddQuoteForm
                playedSeconds={playedSecondsDisplay}
                quoteContent={quoteContent}
                youtubeId={youtubeId}
            />;
        } else {
            if(addNewFallacy){
                return <SelectFallacies />;
            } else {
                return <Fallacies editingText={editingText}/>;
            }
        }
    }

    return (
        <div style={{display: "flex", justifyContent: "center",height: "100%"}}>
            <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", width: "100%" ,maxWidth: "800px"}}>
                <div style={{width: "100%"}}>
                    <div className={styles.videocontainer}>
                        <ReactPlayer
                            className={styles.video}
                            ref={player}
                            playing={playing}
                            url={youtubeLink}
                            width='100%'
                            height='100%'
                            controls= {true}
                            volume={volume}
                            playbackRate={playbackRate}
                            onProgress={({playedSeconds})=>{
                                setPlayedSecondsDisplay(Math.trunc(playedSeconds));
                            }}
                        />
                    </div>
                </div>
                {/*<Controls*/}
                {/*    playing={playing}*/}
                {/*    volume={volume}*/}
                {/*    setVolume={(value)=>setVolume(value)}*/}
                {/*    playbackRate={playbackRate}*/}
                {/*    setPlaybackRate={(value)=>setPlaybackRate(value)}*/}
                {/*    onPauseClick={()=>{setPlaying(!playing)}}*/}
                {/*    onRelativeSeek={(seconds)=>{playerSeekTo(playedSecondsDisplay+seconds)}}*/}
                {/*/>*/}
                <Quotes
                    setQuoteContent={setQuoteContent}
                    addNewQuote={addNewQuote}
                    quoteContent={quotes[currentQuoteIndex].content}
                    setCurrentQuoteIndex={setCurrentQuoteIndex}
                    currentQuoteIndex={currentQuoteIndex}
                    previousQuote={currentQuoteIndex != 0}
                    nextQuote = {currentQuoteIndex != quotes.length-1}
                />
                {bottomPart()}
            </div>
        </div>
    )
}

export default VideoPage;
