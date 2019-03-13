import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = ({ loggedIn, logout }) => {
    if (loggedIn) {
        return (
            <nav className="mb4 pa2" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <NavMenuItem to="/" title="Sign Out" onClick={() => logout()} />
            </nav>
        );
    } else {
        return (
            <nav className="mb4 pa2" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <NavMenuItem to="/" title="Face Detection" />
                <NavMenuItem to="/signin" title="Sign In" />
                <NavMenuItem to="/register" title="Register" />
            </nav>
        );
    }
};

const NavMenuItem = ({ to, title, onClick }) => {
    return (
        <span onClick={onClick} className="f5 link dim white underline pa3 pointer">
            <NavLink to={to}>{title}</NavLink>
        </span>
    );
};

export default Navigation;
