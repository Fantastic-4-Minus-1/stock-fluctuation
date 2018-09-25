const Company = require('../models/Company.js');

module.exports = {
  fetch: (req, res) => {
    Company.find({})
      .limit(4)
      .exec((err, companies) => {
        if (err) return console.log(err);
        res.json(companies);
      });
  },

  fetchCompany: (req, res) => {
    // console.log('hit', req.params);
    const company = req.params.company;
    Company.find({ company: company }, (err, company) => {
      if (err) return console.log(err);
      console.log(company);
      res.json(company);
    });
  }
};
