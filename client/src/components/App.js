import React, {Component} from "react";
import {BrowserRouter, Redirect, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions';
// import {fetchUser} from "../actions";
import './App.css';

import Topbar from "./Topbar";
import Home from "./Home";
import Login from "./Login";
import SideDrawer from "./SideDrawer/SideDrawer";
import Backdrop from "./Backdrop/Backdrop";
import AddVideoForm from "./Videos/AddVideoForm";
import ListVideos from "./Videos/ListVideos";
import VideoPage from "./Videos/VideoPage";


class App extends Component {
    state = {
      sideDrawerOpen: false
    };
    drawerToggleClickHandler = () => {
        this.setState((prevState) => {
            return {sideDrawerOpen: !prevState.sideDrawerOpen}
        });
    };

    backdropClickHandler = () => {
        this.setState({sideDrawerOpen: false});
    }

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
        let backdrop;
        if(this.state.sideDrawerOpen){
            backdrop = <Backdrop click={this.backdropClickHandler}/>;
        }
        return (
            <div style={{height: '100%'}}>
                <BrowserRouter>
                    <div style={{height: '100%'}}>
                        <Topbar drawerClickHandler={this.drawerToggleClickHandler} />
                        <SideDrawer click={this.backdropClickHandler} show={this.state.sideDrawerOpen}/>
                        {backdrop}
                        <div style={{height: '100%'}}>
                            <Route exact path="/login" component={Login}/>
                            {this.renderContent()}
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

function mapStateToProps({auth}) {
    return { auth };
}

export default connect(mapStateToProps, actions)(App);
