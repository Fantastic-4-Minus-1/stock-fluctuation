const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'zacharyhansen',
  host: 'localhost',
  database: 'robin2',
  // password: '',
  max: 10,
});

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res);
  pool.end();
});

pool.query('CREATE TABLE IF NOT EXISTS STOCKPRICE', {}, (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log(res.rows[0]);
  }
});

// const client = new Client({
//   user: 'zacharyhansen',
//   host: 'localhost',
//   database: 'robin2',
// })
// client.connect()

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })

