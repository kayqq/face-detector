const Clarifai = require('clarifai');
var config = require('../config/config');

const app = new Clarifai.App({
    apiKey: config.CLARIFAI_API_KEY
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            // Get back 'data' from Clarifai
            res.json(data); // Respond to front end with 'data'
        })
        .catch(err => res.status(400).json('Unable to work with API'));
};

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to get entries'));
};

module.exports = {
    handleImage,
    handleApiCall
};
