import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = ({ loggedIn, logout }) => {
    if (loggedIn) {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <span onClick={() => logout()} className="f3 link dim white underline pa3 pointer">
                    <NavLink to="/">Sign Out</NavLink>
                </span>
            </nav>
        );
    } else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <span className="f5 link dim white underline pa3 pointer">
                    <NavLink to="/">Face Detection</NavLink>
                </span>

                <span className="f5 link dim white underline pa3 pointer">
                    <NavLink to="/signin">Sign In</NavLink>
                </span>
                <span className="f5 link dim white underline pa3 pointer">
                    <NavLink to="/register">Register</NavLink>
                </span>
            </nav>
        );
    }
};

export default Navigation;
