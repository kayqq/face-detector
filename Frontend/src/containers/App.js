import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Router, Route, Link } from 'react-router-dom';
import history from '../history';

import Particles from 'react-particles-js';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Navigation from '../components/Navigation/Navigation';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Score from '../components/Score/Score';
import './App.css';

import { login, logout, incrementEntries, getFaceData, tokenLogin } from '../actions';

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
        user: state.authentication.user,
        loggedIn: state.authentication.loggedIn
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            login,
            logout,
            incrementEntries,
            getFaceData,
            tokenLogin
        },
        dispatch
    );

class App extends Component {
    state = { link: '', faceBoxes: [] };

    componentDidMount() {
        const { tokenLogin } = this.props;
        const token = localStorage.getItem('token');
        if (token) {
            tokenLogin(token);
        }
    }

    onButtonSubmit = link => {
        const { loggedIn, incrementEntries, user } = this.props;
        this.setState({ link });
        getFaceData(link)
            .then(faceBoxes => {
                this.setState({ faceBoxes: faceBoxes });
                if (loggedIn) {
                    incrementEntries(user.id);
                }
            })
            .catch(err => console.log(err));
    };

    render() {
        const { user, loggedIn, login, logout } = this.props;
        const { link, faceBoxes } = this.state;

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
                            <HomePage
                                {...props}
                                loggedIn={loggedIn}
                                user={user}
                                link={link}
                                onButtonSubmit={this.onButtonSubmit}
                                faceBoxes={faceBoxes}
                            />
                        )}
                    />
                    <Route path="/signin" render={props => <SignIn {...props} login={login} />} />
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

const HomePage = ({ loggedIn, user, link, onButtonSubmit, faceBoxes }) => {
    return (
        <div>
            <Logo />
            <Score loggedIn={loggedIn} user={user} />
            <p className="f5 pa2">
                This magic brain will detect faces in your pictures. Give it a try!
            </p>
            <ImageLinkForm onButtonSubmit={onButtonSubmit} />
            <FaceRecognition faceBoxes={faceBoxes} imageUrl={link} />
        </div>
    );
};
