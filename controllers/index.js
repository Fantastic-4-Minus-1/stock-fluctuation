const Company = require('../models/Company.js');

module.exports = {
  // fetch: (req, res) => {
  //   Company.find({})
  //     .limit(4)
  //     .exec((err, companies) => {
  //       if (err) return console.log(err);
  //       res.json(companies);
  //     });
  // },

  fetchCompany: (req, res) => {
    console.log('hit fetch', req.params);
    const company = req.params.company;
    Company.find({ company: company }, (err, company) => {
      if (err) return console.log(err);
      console.log(company);
      res.json(company);
    });
  },
  deleteCompany: (req, res) => {
    console.log('hit delete', req.params);
    const company = req.params.company;
    Company.findOneAndDelete({ company: company }, (err, company) => {
      if (err) return console.log(err);
      console.log(`Deleted: ${company}`);
      res.json(company);
    });
  },
  editCompany: (req, res) => {
    console.log('hit edit', req.params);
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
    console.log('hit add', req.params);
    // const company = req.params.company;
    const body = req.params.body;
    const newCompany = new Company(body);
    newCompany.save((err, newCompany) => {
      if (err) return console.log(err);
      console.log(newCompany);
      res.json(newCompany);
    });
  },
};
