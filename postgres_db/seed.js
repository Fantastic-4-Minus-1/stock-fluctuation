const Promise = require('bluebird');
const readFile = Promise.promisify(require('fs').readFile);
// const fs = require('fs');
const pgp = require('pg-promise')({
  capSQL: true,
});

console.time('Total');

const db = pgp({
  user: 'zacharyhansen',
  host: 'localhost',
  database: 'robin2',
});

db.query('CREATE TABLE stocks_auto(id SERIAL PRIMARY KEY, company_name TEXT, acronym TEXT, anaylist_percent NUMERIC, owners NUMERIC);')
  .then(res => {
    console.log('Table created');
  })
  .catch((err) => {
    console.log(err);
  });

db.query('CREATE TABLE stocks_auto(id SERIAL PRIMARY KEY, company_name TEXT, acronym TEXT, anaylist_percent NUMERIC, owners NUMERIC);')
  .then(res => {
    console.log('Table created');
  })
  .catch((err) => {
    console.log(err);
  });