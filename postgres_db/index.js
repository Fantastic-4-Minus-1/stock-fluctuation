const db = require('./connection.js');

const getQuery = 'SELECT stocks_auto.id, stocks_auto.company_name, stocks_auto.acronym, stocks_auto.analyst_percent, stocks_auto.owners, prices_table.date, prices_table.time, prices_table.price FROM stocks_auto inner join prices_table ON stocks_auto.id = prices_table.stock_id WHERE stocks_auto.acronym = $1;';

const insertCompanyQuery = 'INSERT INTO  stocks_auto(company_name, acronym, analyst_percent, owners) VALUES($1,$2, $3, $4)';

const insertPriceQuery = 'INSERT INTO  prices_table (stock_id, date, time, price) VALUES($1,$2, $3, $4)';

const getCompanyStockPrice = (abbr, callback) => {
  db.query(getQuery, abbr)
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const addCompany = (values, callback) => {
  db.query(insertCompanyQuery, values)
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      callback(err, null);
    });
};

const addPricePoint = (values, callback) => {
  db.query(insertPriceQuery, values)
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      callback(err, null);
    });
};

module.exports = { getCompanyStockPrice, addCompany, addPricePoint };
