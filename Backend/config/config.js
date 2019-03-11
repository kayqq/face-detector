var config = {};

if (process.env.NODE_ENV == 'production') {
    config = require('./env/production');
} else {
    config = require('./env/development');
}

module.exports = config;
