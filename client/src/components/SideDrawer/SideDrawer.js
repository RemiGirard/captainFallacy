import React from "react";
import {Link} from 'react-router-dom';

import './SideDrawer.css';

const sideDrawer = props => {
    let drawerClasses = 'side-drawer';
    if(props.show){
        drawerClasses = 'side-drawer open';
    }
    return (
    <nav className={drawerClasses}>
        <ul>
            <li key={"firstLink"}><Link to="/videos/add" onClick={props.click}>Add a video</Link></li>
            <li key={"secondLink"}><a href="/auth/logout">Logout</a></li>
        </ul>
    </nav>
    )
};

export default sideDrawer;