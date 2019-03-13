# Face Detector

An app that helps people communicate with locals and plan pick-up baskbetball games. Utilizes the Face Detection model from [Clarifai API](https://clarifai.com/).

<br>

**[Live Demo](http://facedetector.kennyquan.com/)**

**Libraries:**

Front End: React, Redux, React-Router, [Clarifai](https://www.npmjs.com/package/clarifai)
Back End: Express.js, PostgreSQL, [knex.js](https://www.npmjs.com/package/knex), [bcrypt](https://www.npmjs.com/package/bcrypt-nodejs)

<br>

**Tools:** npm

<br>

## Getting started

**[Sign up](https://clarifai.com) for a Clarifai API key**

**Note: You need PostgreSQL set up to run the code locally.**

Once you've installed PostgreSQL, run the following queries:

```
CREATE TABLE users (
    id serial PRIMARY KEY,
    name VARCHAR(100),
    email text UNIQUE NOT null,
    entries BIGINT DEFAULT 0,
    joined TIMESTAMP NOT NULL
);

CREATE TABLE login (
    id serial PRIMARY KEY,
    hash VARCHAR(100) NOT NULL,
    email text UNIQUE NOT NULL
);
```

**Now install the project**

```
git clone https://github.com/kayqq/face-detector.git my-project
cd my-project
npm install
```

**Add a development config containing your Clarifai API key**

```
cd Backend/config/env
touch development.js
```

Now inside development.js, create the following config object to be exported

```
// development.js

module.exports = {
    CLARIFAI_API_KEY: 'YOUR_CLARIFAI_API_KEY',
    DB_CONNECTION: {
        host: '127.0.0.1 OR YOUR_HOST_IP',
        user: 'YOUR_DB_USERNAME',
        password: '',
        database: 'smart-brain'
    }
};
```

**Start the project**

```
cd Frontend npm start
cd Backend npm start
```

The backend server will be hosted on `http://localhost:3000/`
The frontend server will try to host on port 3000, but the backend is currently running on that port.
Just type 'y' into the terminal and continue on.

Open up `http://localhost:3001/` or whatever port you chose to see the app.
