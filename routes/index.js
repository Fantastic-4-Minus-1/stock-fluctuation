const express = require('express');
const Router = express.Router();
const Ctrl = require('../controllers/');

Router.route('/:company')
  .all((req, res, next) => {
    console.log('hit');
    next();
  })
  .get(Ctrl.fetchCompany);

module.exports = Router;
