import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Home.css';

class Home extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return 'loading';
            case false:
                return <Redirect to={{pathname: "/login"}} />;
            default:
                return (
                    <div className="welcome-message" style={{maxWidth: 400}}>
                        <h2>Welcome {this.props.auth.name||"user"}</h2>
                        <a className="btn btn-info" href="/videos">Start to fight fallacious arguments</a>
                    </div>
                );
        }
    }

    render() {
        return (
            <div className="content">
                {this.renderContent()}
            </div>
        )
    }
}

function mapStateToProps({auth}) {
    return { auth };
}

export default connect(mapStateToProps)(Home);
