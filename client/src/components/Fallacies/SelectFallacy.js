import React, {useEffect} from "react";


const SelectFallacies = () => {

    const fallacies = () => {
        let output = [];
        for(let i=1;i<56;i++){
            let number = ("0"+i).slice(-2);
            output.push(
                <img style={{width: "100%"}} src={"/fallacies/png/"+number+".png"} alt={number}/>
            )
        }
        return output;
    }

    return (
        <div>
            <div className="h5" style={{textAlign: "center", marginRight: "5px", marginLeft:"5px"}}>Select a fallacy type below which correspond to the quote:</div>
            {fallacies()}
        </div>
    )
}

export default SelectFallacies;
