import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Iframe from 'react-iframe';


class Home extends Component {
    render() {
        const {isAuthenticated, login} = this.props.auth;
        return (
            //**student code change start**
            <>
            <div>
                <h1>Home</h1>
                {isAuthenticated() ?(
                <Link to="/profile">View profile</Link>
            ) : (
                <button onClick={login}>Log In</button>
            )}
            </div>
            <div>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/ThrIuvj6s0k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen sandbox></iframe>
            </div>
            </>
            //**student code change end**
        );
    }
}

export default Home;