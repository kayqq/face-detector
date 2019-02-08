const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const jwt = require('jsonwebtoken');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const tokensignin = require('./controllers/tokenSignin');

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    }
});

// Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Routes
app.get('/', (req, res) => { res.send('app is running') })
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt, jwt) })
app.post('/tokensignin', (req, res) => { tokensignin.handleTokenSignin(req, res, db, jwt ) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})
