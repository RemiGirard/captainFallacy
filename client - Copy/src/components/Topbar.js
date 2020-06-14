import React, { Component } from "react";

import DrawerToggleButton from './SideDrawer/DrawerToggleButton';

import './Tobbar.css';

class Topbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div>
                    <DrawerToggleButton click={this.props.drawerClickHandler}/>
                </div>
                <a className="navbar-brand toolbar__logo" href="/">
                    <img src="cf-logo-200.png" width="50" height="50" alt="logo"/>
                    <span>Captain Fallacy</span>
                </a>
            </nav>
        )
    }
}


export default Topbar;
