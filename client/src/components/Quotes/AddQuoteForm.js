import React, {useState} from "react";
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import '@material/textfield';
import MaskedInput from 'react-text-mask';
import axios from "axios";

const AddQuoteForm = (props) => {
    let playedHMSSeconds = props.playedSeconds;
    let playedHMSHours = Math.floor(playedHMSSeconds/3600);
    playedHMSSeconds = playedHMSSeconds%3600;
    let playedHMSMinutes = Math.floor(playedHMSSeconds/60);
    playedHMSSeconds = playedHMSSeconds%60;

    let playedTime = ("0"+playedHMSHours).slice(-2)+"h "
        + ("0"+playedHMSMinutes).slice(-2)+"m "
        + ("0"+playedHMSSeconds).slice(-2)+"s";

    const [startValue, setStartValue] = useState('00h 00m 00s');
    const [endValue, setEndValue] = useState('00h 00m 01s');

    const saveQuote = (event) => {
        event.preventDefault();
        const quote = {
            youtubeId: props.youtubeId,
            start: startValue,
            end: endValue,
            content: props.quoteContent
        }
        console.log(quote);
        axios.post('/api/videos/quotes/add', {quote})
            .then( (response) => {
                if(response.status === 201){
                    // update display
                }
            });
    }

    function TextMaskCustom(value) {
        return (
            <MaskedInput
                onChange={(event)=>{setStartValue(event.target.value);}}
                value={value}
                mask={[/[0-9]/, /[0-9]/,'h', ' ', /[0-9]/, /[0-9]/, 'm', ' ', /[0-9]/, /[0-9]/, 's']}
                placeholderChar={'\u2000'}
                showMask
            />
        );
    }

    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{display: "flex", flexDirection: "row"}}>
                <span style={{marginRight: "5px", marginTop: "10px"}}>Start:</span>
                <Input inputComponent={() => TextMaskCustom(startValue)} />
                <button onClick={()=>setStartValue(playedTime)} className="btn btn-info" style={{marginTop: "10px"}}>Set current</button>
            </div>
            <div style={{display: "flex", flexDirection: "row"}}>
                <span style={{marginRight: "5px", marginTop: "10px"}}>End:</span>
                <Input inputComponent={() => TextMaskCustom(endValue)} />
                <button onClick={()=>setEndValue(playedTime)} className="btn btn-info" style={{marginTop: "10px"}}>Set current</button>
            </div>
            <button onClick={saveQuote} className={"btn btn-large"+("")} style={{marginTop: "20px"}}>Add quote</button>
        </div>
    )
}

export default AddQuoteForm;
