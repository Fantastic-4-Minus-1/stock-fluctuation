const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require('morgan');
const routes = require('../routes');
const Company = require('../models/Company.js');

mongoose.connect(
  process.env.MONGODB_URL || 'mongodb://localhost/stocks',
  { useNewUrlParser: true },
  err => {
    console.log(err || `MongoDB connected`);
  }
);
// Allow cross origin requests
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use('/:company', express.static('public'));
// app.use('/api/graph', routes);
app.use('/graph', routes);

app.use('/api/graph', routes);

module.exports = {
  app,
  mongoose
};
