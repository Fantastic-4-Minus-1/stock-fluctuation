const express = require('express');
require('newrelic');

const app2 = express();
const path = require('path');
require('dotenv').config();
const bodyParser = require('body-parser');
// const logger = require('morgan');
const routes = require('../routes');

app2.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({ extended: true }));
// app2.use(logger('dev'));

app2.use('/:company', express.static('public'));

app2.use('/api/graph', routes);


module.exports = {
  app2,
};
