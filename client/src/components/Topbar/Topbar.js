import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from '../../images/cf-logo-200.png';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

import './Tobbar.css';

class Topbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div>
                    <DrawerToggleButton click={this.props.drawerClickHandler}/>
                </div>
                <Link className="navbar-brand toolbar__logo" to="/videos">
                    <img src={logo} width="50" height="50" alt="logo"/>
                    <span>Captain Fallacy</span>
                </Link>
            </nav>
        )
    }
}

export default Topbar;
