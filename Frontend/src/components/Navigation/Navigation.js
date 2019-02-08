import React from 'react';

const Navigation = ({ changeRoute, isSignedIn, signout }) => {
        if(isSignedIn) { // if signed in
            return (
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={signout} className='f3 link dim white underline pa3 pointer'>Sign Out</p>
                </nav>
            )
        } else { // if not signed in
            return (
                <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={() => changeRoute('home')} className='f3 link dim white underline pa3 pointer'>Face Detection</p>
                    <p onClick={() => changeRoute('signin')} className='f3 link dim white underline pa3 pointer'>Sign In</p>
                    <p onClick={() => changeRoute('register')} className='f3 link dim white underline pa3 pointer'>Register</p>
                </nav>
            );
        }
}

export default Navigation;