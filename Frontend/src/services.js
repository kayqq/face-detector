import API_URL from './config/config';

export const authenticatetoken = token => {
    return fetch(`${API_URL}/tokensignin`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            token: token
        })
    })
        .then(response => response.json())
        .then(user => {
            return user;
        });
};

export const authenticateUser = (email, password) => {
    return fetch(`${API_URL}/signin`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then(response => response.json())
        .then(data => {
            const { user, token } = data;
            localStorage.setItem('token', token);
            return user;
        })
        .catch(err => console.log(err));
};
export const logoutUser = () => {
    localStorage.removeItem('token');
};
