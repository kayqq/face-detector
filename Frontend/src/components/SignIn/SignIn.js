import React, { useState } from 'react';
import './Signin.css';

const SignIn = ({ login, loggingIn, loginError, history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const authenticate = () => {
        login(email, password);
    };

    return (
        <article className="page br3 ba b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 white-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">
                                Email
                            </label>
                            <input
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="email"
                                name="email-address"
                                id="email-address"
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                type="password"
                                name="password"
                                id="password"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input
                            disabled={loggingIn}
                            onClick={() => authenticate()}
                            className="b ph3 pv2 input-reset ba white b--black bg-transparent grow pointer f6 dib"
                            type="submit"
                            value="Sign in"
                        />
                    </div>

                    {loginError === true ? (
                        <p className="f7 link red">Invalid credentials</p>
                    ) : (
                        <p />
                    )}

                    <div className="lh-copy mt3">
                        <p className="f7 link white di">Don't have an account? </p>
                        <p
                            onClick={() => history.push('register')}
                            className="f7 link dim white di underline pointer"
                        >
                            Register
                        </p>
                    </div>
                </div>
            </main>
        </article>
    );
};

export default SignIn;
