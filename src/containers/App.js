import React, { Component } from 'react';
import { connect } from 'react-redux';
import Particles from 'react-particles-js';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import Navigation from '../components/Navigation/Navigation';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Score from '../components/Score/Score';
import './App.css';

import { 
  setInput, 
  setFaceBoxes, 
  loadUser, 
  updateEntries, 
  setImageUrl, 
  setRoute,
  userSignout,
  userSignin,
} from '../actions';

const particlesOptions = {
  particles: {
    number: {
      value: 35,
      density: {
        enable: true,
        value_area: 250
      }
    }
  }
}

// store 
const mapStateToProps = state => {
    return {
      input: state.changeInput.input,
      faceBoxes: state.changeFaceBoxes.faceBoxes,
      user: state.loadUserData.user,
      imageUrl: state.changeImageUrl.imageUrl,
      route: state.changeRoute.route,
      isSignedIn: state.changeUserStatus.isSignedIn,
    }
}

// functions that dispatch actions to change state
const mapDispatchToProps = (dispatch) => {
  return {
    onInputChange: (event) => dispatch(setInput(event.target.value)),
    updateImageUrl: (image) => dispatch(setImageUrl(image)),
    displayFaceBox: (faceBoxes) => dispatch(setFaceBoxes(faceBoxes)),
    loadUser: (user) => dispatch(loadUser(user)),
    updateEntries: (userEntries) => dispatch(updateEntries(userEntries)),
    changeRoute: (route) => dispatch(setRoute(route)),
    signin: () => dispatch(userSignin()),
    signout: () => dispatch(userSignout()),
  }
}

class App extends Component {

  componentDidMount() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      fetch('https://radiant-lake-23501.herokuapp.com/tokensignin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                token: token
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.signin();
                    this.props.changeRoute('home');
                }
            })
    }
  }

  onButtonSubmit = () => { // function is in App.js to allow for state change
    this.props.updateImageUrl(this.props.input);
    
    // Clarifai api call
    fetch('https://radiant-lake-23501.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          input: this.props.input
      })
    })
    // Clarifai responds with face data
    .then(response => response.json())

    // Increment user rank
    .then(response => {
      if (response !== 'Unable to work with API') {

        // Display Faces
        this.props.displayFaceBox(response);
      
        // if we get a response, then increment
        if (response && this.props.isSignedIn === true) {
          // user entries increment
          fetch('https://radiant-lake-23501.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: this.props.user.id
            })
          })
          // after incrementing, api returns total entries for user
          .then(userEntries => userEntries.json())
          .then(userEntries => {
            this.props.updateEntries(userEntries);
          })
          .catch(console.log)
        }
      }
    })
    .catch(err => console.log(err));

    // clear image link 
    document.getElementById('imagelink').value = '';

  }

  render() {
    const { onInputChange, faceBoxes, loadUser, user, imageUrl, route, isSignedIn, signin, signout, changeRoute, } = this.props;
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation signout={signout} isSignedIn={isSignedIn} changeRoute={changeRoute} onGuestRouteChange={this.onGuestRouteChange} />
        { route === 'home' ? // if route = 'home' then:
          <div>
            <Logo />
            <Score isSignedIn={isSignedIn} name={user.name} entries={user.entries} changeRoute={changeRoute} />
            <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRecognition faceBoxes={faceBoxes} imageUrl={imageUrl} /> 
          </div> 
        : ( // else
          route === 'signin' ? // if 'signin' then SignIn form, else Register form
          <SignIn signin={signin} loadUser={loadUser} changeRoute={changeRoute} /> 
          : // else
          <Register signin={signin} loadUser={loadUser} changeRoute={changeRoute} />
          )
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);