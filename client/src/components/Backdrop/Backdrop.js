import React from "react";

import './Backdrop.css';

const Backdrop = props => (
    <div className="backdropped" onClick={props.click}></div>
);

export default Backdrop;