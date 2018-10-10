const pgp = require('pg-promise')({
  capSQL: true,
});

// Local database
// const db = pgp({
//   user: 'zacharyhansen',
//   host: 'localhost',
//   database: 'robin2',
// });

// EC2 Database
const db = pgp({
  user: '',
  host: '',
  database: '',
  password: '',
  port: 5432,
});

db.connect()
  .then((obj) => {
    obj.done(); // success, release the connection;
    console.log('Successful connection!');
  })
  .catch((error) => {
    console.log('ERROR:', error.message || error);
  });

module.exports = db;
