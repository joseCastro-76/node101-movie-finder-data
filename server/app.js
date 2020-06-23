const express = require('express');
const morgan = require('morgan');
const axios = require('axios');

const app = express();

const cache = {};

app.use(morgan('dev'));

// When making calls to the OMDB API make sure to append the '&apikey=8730e0ez' d786d4d5 parameter
app.get('/', (req, res) => {
    const url = req.originalUrl;
    
    if(cache[url]) {
        res.json(cache[url]);
    } else {
        axios.get(`http://www.omdbapi.com${url}&apikey=8730e0e`)
            .then(({data}) => {
                res.json(data);
                cache[url] = data;
            })
            .catch(err => res.status(400).json(err));
    }
});


module.exports = app;