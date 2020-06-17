import React, {Component} from "react";
import {BrowserRouter, Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';

import Home from "./Home";
import Login from "./Login";
import AddVideoForm from "./Videos/AddVideoForm";
import ListVideos from "./Videos/ListVideos";
import VideoPage from "./Videos/VideoPage";
import Layout from './Layout';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    renderContent(){
        switch (this.props.auth) {
            case null:
                return 'loading';
            case false:
                return <Redirect to={{pathname: "/login"}}/>;
            default:
                return ([
                        <Route exact path="/" component={Home}/>,
                        <Route exact path="/videos" component={ListVideos}/>,
                        <Route exact path="/videos/add" component={AddVideoForm}/>,
                        <Route exact path="/video/:youtubeId" component={VideoPage}/>
                    ]
                )
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Route component={Layout} />
                <Route exact path="/login" component={Login}/>
                {this.renderContent()}
            </BrowserRouter>
        );
    }
}

function mapStateToProps({auth}) {
    return { auth };
}

export default connect(mapStateToProps, actions)(App);
