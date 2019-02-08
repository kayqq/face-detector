import React from 'react';

const Rank = ({isSignedIn, name, entries, changeRoute}) => {
    if (isSignedIn === true) {
        return (
            <div>
                <div className='white f3'>
                    {`${name}, your current score is...`}
                </div>
                <div className='white f1'>
                    {entries}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className='white f3'>
                    Welcome, please <p onClick={() => changeRoute('signin')} className=" di underline pointer">sign in</p> to log your submissions
                </div>
                <div className='white f1'>
                    Guest Mode
                </div>
            </div>
        )
    }
}

export default Rank;