import React, {useState} from "react";
import TextField from '@material-ui/core/TextField';
import '@material/textfield';


import previous from '../../images/svgVideoControl/previous.svg';
import next from '../../images/svgVideoControl/next.svg';

const Quotes = (props) => {
    const newQuoteDisplay = () => {
        return (
            <TextField onChange={(event) => {props.setQuoteContent(event.target.value);                }}
                       multiline style={{width:"100%"}} label="Add a new quote"/>
        )
    }

    const quoteDisplay = () => {
        return (
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <p>{props.quoteContent}</p>
            </div>
        )
    }


    return (
        <div style={{width: "100%", background: "#EEE", minHeight:"80px", display: "flex", justifyContent: "space-between"}}>
            <button disabled={!props.previousQuote} onClick={() => {props.setCurrentQuoteIndex(props.currentQuoteIndex-1)}} style={{background: (props.previousQuote ?"#ACE" : "#EEE"),width:"40px", display:"flex", justifyContent:"center", alignItems: "center", border: "none"}}>
                <img src={previous} alt="previous" style={{ opacity:"0.3", width: "35px", height:"60px"}}/>
            </button>

            <div style={{marginBottom: "5px", marginTop:"10px", width: "100%", marginLeft:"10px", marginRight: "10px", display: "flex", alignItems:"center", justifyContent:"center" }}>
                {props.addNewQuote ? newQuoteDisplay() : quoteDisplay() }
            </div>

            <button disabled={!props.nextQuote} onClick={() => props.setCurrentQuoteIndex(props.currentQuoteIndex+1)} style={{background: (props.nextQuote ?"#ACE" : "#EEE"),width:"40px", display:"flex", justifyContent:"center", alignItems: "center", border: "none"}}>
                <img src={next} alt="next" style={{ opacity:"0.3", width: "35px", height:"60px"}}/>
            </button>
        </div>
    )
}

export default Quotes;
