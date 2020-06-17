import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from '../../images/cf-logo-200.png';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

import './Tobbar.css';

class Topbar extends Component {
    render() {
        return (
            <div className="" style={{display: "flex", alignItems:"center",justifyContent:"space-between"}}>
                <div style={{marginTop:"15px", marginLeft:"15px"}}>
                    <DrawerToggleButton click={this.props.drawerClickHandler}/>
                </div>
                <Link style={{display:"flex", textColor:"black", alignItems:"center", marginTop:"10px", marginRight:"10px"}} className="brand-logo" to="/videos">
                    <img src={logo} width="50" height="50" alt="logo"/>
                    <span style={{color: "#054", fontFamily: "Heebo"}}>Captain Fallacy</span>
                </Link>
                <div/>

            </div>
        )
    }
}

export default Topbar;
