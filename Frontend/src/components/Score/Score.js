import React from 'react';
import history from '../../history';

const Rank = ({ loggedIn, user }) => {
    if (loggedIn === true && user) {
        return (
            <div>
                <div className="white f3">{`${user.name}, your current score is...`}</div>
                <div className="white f1">{user.entries}</div>
            </div>
        );
    } else {
        return (
            <div>
                <div className="white f5">
                    <p>
                        Welcome, please{' '}
                        <span
                            onClick={() => history.push('signin')}
                            className="blue di underline pointer"
                        >
                            sign in
                        </span>{' '}
                        to log your submissions
                    </p>
                </div>
                <div className="white f1">Guest Mode</div>
            </div>
        );
    }
};

export default Rank;
