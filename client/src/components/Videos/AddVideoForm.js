import React from "react";
import axios from "axios";
import {Redirect} from 'react-router-dom';

class AddVideoForm extends React.Component{
    state = {
        youtubeURL: ''
    };

    handleChange = (event) => {
        this.setState({
            [event.currentTarget.id]: event.currentTarget.value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        axios.post('/api/videos/add', {youtubeURL: this.state.youtubeURL})
            .then( (response) => {
                if(response.status === 201){
                    this.props.history.push('/videos/');
                }
            });
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit} className="center-flex form-group" action="">
                <input className="form-control" type="text" placeholder="Copy-paste your Youtube link here" id="youtubeURL" required
                       style={{maxWidth: '500px'}}
                       value={this.state.youtubeURL} onChange={this.handleChange}/>
                <button className="btn btn-success" style={{marginTop: '10px', paddingLeft: '50px', paddingRight: '50px'}}>Add Youtube video</button>
            </form>
        )
    }
}

export default AddVideoForm;
