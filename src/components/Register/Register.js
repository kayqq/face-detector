import React from 'react';
import './Register.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordRetype: '',
            name: '',
            nameError: false,
            emailError: false,
            passwordError: false,
            existingEmailError: false,
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    onPasswordRetypeChange = (event) => {
        this.setState({passwordRetype: event.target.value})
    }

    isEmail = (email) => {
        const regex = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email)
    }

    isPasswordMatch = (password, passwordRetype) => {
        if (password === passwordRetype) {
            return true;
        } else {
            return false;
        }
    }

    onSubmitSignIn = () => {
        const { email, password, passwordRetype, name } = this.state;

        if (name.length < 1) {
            this.setState({nameError: true})
        }
        if (!this.isEmail(email)) {
            this.setState({emailError: true})
        }
        if (!this.isPasswordMatch(password, passwordRetype)) {
            this.setState({passwordError: true})
        }
        // Simple Validation
        if (this.isEmail(email) && this.isPasswordMatch(password, passwordRetype) && name.length > 0) {
            // Submission
            fetch('https://radiant-lake-23501.herokuapp.com/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: email,
                    password: password,
                    name: name
                })
            })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.changeRoute('signin');
                } else if (user === 'email already exists') {
                    this.setState({existingEmailError: true})
                }
            })
        }
    }

    render() {
        return (
            <article className="page br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 white-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="text" 
                                    name="name"  
                                    id="name" 
                                    onChange={this.onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email-address"  
                                    id="email-address" 
                                    onChange={this.onEmailChange}
                                />
                            </div>

                            {this.state.existingEmailError === true ?
                            <p className="f7 link red">This email is already being used</p>
                            : (this.state.emailError === true ? 
                                <p className="f7 link red">This is not an email</p>
                                : (<p></p>))
                            }
                            
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="password" 
                                    onChange={this.onPasswordChange}
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Re-type Password</label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    id="passwordRetype" 
                                    onChange={this.onPasswordRetypeChange}
                                />
                            </div>

                            {this.state.passwordError === true ?
                            <p className="f7 link red">Passwords do not match</p>
                            : (<p></p>)
                            }

                        </fieldset>
                        <div className="">
                            <input 
                            onClick={this.onSubmitSignIn} // arrow function to only run function when clicked, otherwise it will run every render
                            className="b ph3 pv2 input-reset ba b--black white bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register" 
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p className="f7 link white di">Already have an account? </p><p onClick={() => this.props.changeRoute('signin')} className="f7 link dim white di underline pointer">Sign in</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}
    

export default Register;