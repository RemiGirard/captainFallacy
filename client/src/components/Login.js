import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    render() {
        return (
            <div className="content">
                Join the army
                <a href="/auth/google">Login with Google</a>
                <a href="/auth/github">Login with Github</a>
            </div>
        )
    }
}

export default Login;
