import React, {Component} from "react";
import { BrowserRouter, Route } from 'react-router-dom';
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
const VideoList = () => <h2>VideoList</h2>;


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
                            <Route exact path="/" component={Home}/>
                            <Route exact path="/videos" component={VideoList}/>
                            <Route exact path="/login" component={Login}></Route>
                            <Route exact path="/videos/add" component={AddVideoForm}></Route>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);
