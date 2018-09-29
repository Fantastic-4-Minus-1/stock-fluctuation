const Promise = require('bluebird');
const readFile = Promise.promisify(require("fs").readFile);
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

const columnSet = new pgp.helpers.ColumnSet([
  '_id',
  'company',
  { name: 'company_abbr', prop: 'companyAbbr' },
  'anaylst_percent',
  'robinhood_owners',
  { name: 'tickers', cast: 'json[]' },
], { table: 'stock_prices_table' });

const pageIndex = 1;
const max = 500;

const insertOneFile = (fileIndex, fileMax) => {
  readFile(`../generate_sdc_data/ten_mill_data/data_${fileIndex}.json`, "utf8")
    .then((data) => {
      return JSON.parse(data);
    })
    .then((data) => {
      const insert = pgp.helpers.insert(data, columnSet);
      return insert;
    })
    .then((insert) => {
      console.time(`Insert time for file => data_${fileIndex}.json`);
      db.none(insert)
        .then(() => {
          console.log(`Inserted Data from file ${fileIndex}`);
          console.timeEnd(`Insert time for file => data_${fileIndex}.json`);
          fileIndex += 1;
          if (fileIndex > max) {
            console.log('Finished!');
            console.timeEnd('Total');
          } else {
            insertOneFile(fileIndex, fileMax);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

insertOneFile(pageIndex, max);

// MASSIVE ATTEMPT

// const getNextData = (t, pageIndex) => {
//   return fs.readFile(`../generate_sdc_data/test_data/data_${pageIndex + 1}.json`, (err, data) => {
//     if (err) throw err;
//     return JSON.parse(data);
//   });
// };


// db.tx('massive-insert', (t) => {
//   return t.sequence((index) => {
//     return getNextData(t, index)
//       .then((data) => {
//         if (data) {
//           const insert = pgp.helpers.insert(data, cs);
//           return t.none(insert);
//         }
//       });
//   }, { track: true });
// })
//   .then((data) => {
//     // COMMIT has been executed
//     console.log('Total batches:', data.total, ', Duration:', data.duration);
//   })
//   .catch((error) => {
//     // ROLLBACK has been executed
//     console.log(error);
//   });
