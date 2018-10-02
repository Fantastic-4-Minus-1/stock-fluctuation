const cassandra = require('cassandra-driver');
const async = require('async');

const db = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'stocks' });

db.execute(`INSERT INTO stock_prices_table JSON '{"id": 1, "company: "hello", "company_abbr": "TX"}'`, (err, results) => {
  if (err) {
    console.log(err);
  }
});
