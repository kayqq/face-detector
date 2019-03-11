let API_URL;

process.env.NODE_ENV === 'production'
    ? (API_URL = 'https://face-detector-backend.herokuapp.com')
    : (API_URL = 'http://localhost:3000');

export default API_URL;
