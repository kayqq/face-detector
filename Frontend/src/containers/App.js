import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import history from '../history';

import Particles from 'react-particles-js';
import Home from '../components/Home/Home';

import Navigation from '../components/Navigation/Navigation';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import './App.css';

import { login, logout, incrementEntries, tokenLogin } from '../actions';

const particlesOptions = {
    particles: {
        number: {
            value: 5,
            density: {
                enable: true,
                value_area: 400
            }
        }
    }
};

const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
        loggedIn: state.authenticationReducer.loggedIn,
        loginError: state.authenticationReducer.loginError
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            login,
            logout,
            incrementEntries,
            tokenLogin
        },
        dispatch
    );

class App extends Component {
    componentDidMount() {
        const { tokenLogin } = this.props;
        const token = localStorage.getItem('token');
        if (token) {
            tokenLogin(token);
        }
    }

    render() {
        const { user, loggedIn, loginError, login, logout, incrementEntries } = this.props;

        return (
            <Router history={history}>
                <div className="App">
                    <Particles className="particles" params={particlesOptions} />
                    <Navigation
                        logout={logout}
                        loggedIn={loggedIn}
                        onGuestRouteChange={this.onGuestRouteChange}
                    />
                    <Route
                        exact
                        path="/"
                        render={props => (
                            <Home
                                {...props}
                                loggedIn={loggedIn}
                                user={user}
                                incrementEntries={incrementEntries}
                            />
                        )}
                    />
                    <Route
                        path="/signin"
                        render={props => (
                            <SignIn {...props} login={login} loginError={loginError} />
                        )}
                    />
                    <Route path="/register" render={props => <Register {...props} />} />
                </div>
            </Router>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
