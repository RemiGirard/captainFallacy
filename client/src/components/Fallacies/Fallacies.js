import React, {useEffect, useState} from "react";
import axios from "axios";

const Fallacies = (props) => {
    const [fallaciesId, setFallaciesId] = useState('op');
    const [fallacies, setFallacies] = useState([]);
    useEffect(() => {
        axios.get('/api/videos/'+props.currentQuote._id+'/fallacies')
            .then(res => {
                // const videos = res.data;
                // console.log(videos);
                // this.setState({videos});
                // console.log('quotes res: ',res.data);
                const response = res.data.map(element => element.fallacyId);
                console.log('response: ',response)
                let output = [];
                for(let i=0;i<response.length;i++){
                    let number = ("0"+response[i]).slice(-2);
                    output.push(
                        <img key={i}
                             style={{width: "100%", maxWidth:"400px"}} src={"/fallacies/png/"+number+".png"} alt={number}/>
                    )
                }
                setFallacies(output);
            })
    }, [props.currentQuote]);

    // let fallacies = () => {
    //     let output = [];
    //     for(let i=0;i<fallaciesId.length;i++){
    //         output.push(
    //             <img key={i}
    //                  style={{width: "100%"}} src={"/fallacies/png/"+fallaciesId[i]+".png"} alt={i}/>
    //         )
    //     }
    //     return output;
    // }
    return (
        <div style={{width: "100%", display:"flex", maxWidth:"800px", flexWrap: "wrap"}}>
            {fallacies}
            <div style={{width:"100%"}}>
                <button disabled={!props.addFallacyActivated} className="btn btn-success" style={{width: "50%", height:"50px"}} onClick={() => {
                    props.setAddNewFallacy(true);
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                }}>Add a fallacy</button>
                <button className="btn btn-success" style={{width: "50%", height:"50px"}} onClick={() => {
                    props.setAddNewQuote(true);
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });
                }}>Add a quote</button>
            </div>

        </div>
    )
}

export default Fallacies;
