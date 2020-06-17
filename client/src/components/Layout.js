import React, {useState} from "react";
import Topbar from "./Topbar/Topbar";
import SideDrawer from "./SideDrawer/SideDrawer";
import Backdrop from "./Backdrop/Backdrop";

const Layout = props => {
    let [sideDrawerOpen, setSideDrawerOpen] = useState(false);
    const inverseSideDrawerOpen = () => {
        setSideDrawerOpen(!sideDrawerOpen);
    }
    const backdropClickHandler = () => {
        setSideDrawerOpen(false);
    }
    let backdrop;
    if(sideDrawerOpen){
        backdrop = <Backdrop click={backdropClickHandler}/>
    }
    return (
        <div className="layout">
            <Topbar drawerClickHandler={inverseSideDrawerOpen}/>
            <SideDrawer click={backdropClickHandler} show={sideDrawerOpen}/>
            {backdrop}
        </div>
    );
}

export default Layout;
