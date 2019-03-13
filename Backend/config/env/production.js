module.exports = {
    CLARIFAI_API_KEY: process.env.API_CLARIFAI,
    DB_CONNECTION: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
};
