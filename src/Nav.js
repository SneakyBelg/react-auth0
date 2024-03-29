import React, { Component } from 'react';
import {Link} from "react-router-dom";


class Nav extends Component {
    render() {
        //**student code change start**
        const {isAuthenticated, login, logout} = this.props.auth;
        return (
            <nav>
            <ul>
                <li>
                    <Link to ="/">Home</Link>
                </li>
                <li>
                    <Link to ="/profile">Profile</Link>
                </li>
                {isAuthenticated() && (
                <li>
                    <Link to="/private">Rest Api</Link>
                </li>
                )}
                <li>
                    <button onClick={isAuthenticated() ? logout: login}>
                    {isAuthenticated() ? "Log Out" : "Log In"}
                    </button>
                </li>
            </ul>
            </nav>
        );
        //**student code change end**
    }
}

export default Nav;