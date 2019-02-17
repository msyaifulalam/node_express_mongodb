// import express from 'express'; --ES6
const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/ninjago', { useNewUrlParser:true});
mongoose.set('useCreateIndex', true);
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
//
app.use('/api', routes);

app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message });
});


// listen for request
const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`listening on port ${port}....`);
});
