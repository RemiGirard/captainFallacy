import React, { Component } from "react";
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
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
                    <div className="center-flex" style={{maxWidth: 400}}>
                        <h2>Welcome {this.props.auth.name||"user"}</h2>
                        <Link className="btn btn-info" to="/videos">Start to fight fallacious arguments</Link>
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
