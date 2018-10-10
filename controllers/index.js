const { getCompanyStockPrice, addCompany, addPricePoint } = require('../postgres_db/index.js');

module.exports = {
  fetchCompany: (req, res) => {
    getCompanyStockPrice(req.params.company, (err, data) => {
      if (err) {
        console.log('Error!', err);
        return;
      }
      const companyResult = {
        _id: data[0].id,
        company: data[0].company_name,
        companyAbbr: data[0].acronym,
        anaylst_percent: data[0].analyst_percent,
        robinhood_owners: data[0].owners,
        tickers: [{
          date: data[0].date,
          price: [],
        }],
      };
      for (let i = 0; i < data.length; i += 1) {
        companyResult.tickers[0].price.push({
          currentTime: data[i].time,
          currentPrice: data[i].price,
        });
      }
      res.json([companyResult]);
    });
  },
  deleteCompany: (req, res) => {
    // console.log('hit delete', req.params);
    const company = req.params.company;
    Company.findOneAndDelete({ company: company }, (err, company) => {
      if (err) return console.log(err);
      console.log(`Deleted: ${company}`);
      res.json(company);
    });
  },
  editCompany: (req, res) => {
    // console.log('hit edit', req.params);
    const company = req.params.company;
    const body = req.params.body;
    // const company = HR;
    Company.findOneAndUpdate({ company: company.company }, body, (err, company) => {
      if (err) return console.log(err);
      console.log(`Updated: ${company}`);
      res.json(company);
    });
  },
  addCompany: (req, res) => {
    // console.log('hit add', req.body);
    addCompany([req.body.company_name, req.body.acronym, req.body.analyst_percent, req.body.owners], (err, result) => {
      if (err) return console.log(err);
      console.log(result);
      res.send(200);
    });
  },
  addPrice: (req, res) => {
    // console.log('hit add price');
    addPricePoint([req.body.stock_id, req.body.date, req.body.time, req.body.price], (err, result) => {
      if (err) return console.log(err);
      console.log(result);
      res.send(200);
    });
  },
};
