import React, {useEffect} from "react";
import axios from "axios";


const SelectFallacy = (props) => {

    const addFallacy = (fallacyId) => {
        // event.preventDefault();
        axios.post('/api/videos/fallacies/add', {
                fallacyId,
                quoteId: props.currentQuote._id
            })
            .then( (response) => {
                console.log(response);
                if(response.status === 201){
                    props.setAddNewFallacy(false);
                }
            });
    }

    const fallacies = () => {
        let output = [];
        for(let i=1;i<56;i++){
            let number = ("0"+i).slice(-2);
            output.push(
                <img key={i} onClick={() => {
                    addFallacy(i);
                    // update display
                }}
                style={{width: "100%", maxWidth:"400px"}} src={"/fallacies/png/"+number+".png"} alt={number}/>
            )
        }
        return output;
    }

    return (
        <div>
            <div className="h5" style={{textAlign: "center", marginRight: "5px", marginLeft:"5px"}}>
                {'Select a fallacy which \n correspond to the quote:'}
            </div>
            {fallacies()}
        </div>
    )
}

export default SelectFallacy;
