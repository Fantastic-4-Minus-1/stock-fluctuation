const express = require('express');
require('newrelic');

const app3 = express();
require('dotenv').config();
const bodyParser = require('body-parser');
// const logger = require('morgan');
const routes = require('../routes');

app3.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app3.use(bodyParser.json());
app3.use(bodyParser.urlencoded({ extended: true }));
// app3.use(logger('dev'));

app3.use('/:company', express.static('public'));

app3.use('/api/graph', routes);

module.exports = {
  app3,
};
