import React, {useState, useRef, useEffect} from "react";
import styles from './VideoPage.module.css';
import ReactPlayer from "react-player/youtube";

import Quotes from "../Quotes/Quotes";
import Fallacies from "../Fallacies/Fallacies";
import AddQuoteForm from "../Quotes/AddQuoteForm";
import SelectFallacy from "../Fallacies/SelectFallacy";
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
        _id: '',
        start: '',
        end: '',
        content: ''
    }]);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [currentQuote, setCurrentQuote] = useState({});
    const [addNewFallacy, setAddNewFallacy] = useState(false);
    const [addFallacyActivated, setAddFallacyActivated] = useState(false);

    const playerSeekTo = (seconds = 10) => {
        player.current.seekTo(seconds,'seconds');
    }


    const getQuotes = () => {
        axios.get('/api/videos/'+youtubeId+'/quotes')
            .then(res => {
                // const videos = res.data;
                // console.log(videos);
                // this.setState({videos});
                console.log('quotes res: ',res.data);
                let content = res.data;
                if(content.length === 0){
                    content.push({
                        _id: '',
                        start: '',
                        end: '',
                        content: ''
                    });
                } else {
                    setAddFallacyActivated(true);
                }
                setQuotes(content);
            })
    }


    useEffect(() => {
        getQuotes();
    }, [addNewQuote]);

    let bottomPart = () => {
        if(addNewQuote){
            return <AddQuoteForm
                playedSeconds={playedSecondsDisplay}
                quoteContent={quoteContent}
                youtubeId={youtubeId}
                setAddNewQuote={setAddNewQuote}
                currentQuoteIndex={currentQuoteIndex}
                setCurrentQuoteIndex={setCurrentQuoteIndex}

            />;
        } else {
            if(addNewFallacy){
                return <SelectFallacy youtubeId={youtubeId} currentQuote={quotes[currentQuoteIndex]} setAddNewFallacy={setAddNewFallacy}/>;
            } else {
                return <Fallacies editingText={editingText} currentQuote={quotes[currentQuoteIndex]} setAddNewFallacy={setAddNewFallacy} setAddNewQuote={setAddNewQuote} addFallacyActivated={addFallacyActivated}/>;
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
                    startQuote = {quotes[currentQuoteIndex].start}
                    endQuote = {quotes[currentQuoteIndex].end}
                />
                {bottomPart()}
            </div>
        </div>
    )
}

export default VideoPage;
