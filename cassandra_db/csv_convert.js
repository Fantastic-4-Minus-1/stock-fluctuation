// const jsonexport = require('jsonexport');
// const createReadStream = Promise.promisify(require('fs').createReadStream);
// const createWriteStream = Promise.promisify(require('fs').createWriteStream);

// let index = 0;

// while (index <= 500) {
//   let reader = createReadStream(`../generate_sdc_data/ten_mill_data/data_${index}.json`)
//   let writer = createWriteStream(`../generate_sdc_data/csv_data/data_${index}.csv`);
//   reader.pipe(jsonexport({ rowDelimiter: '|', fillGaps: true })).pipe(writer);
//   console.log(`finished csv ${index}`);
//   index += 1;
// }

const fs = require('fs');
const Json2csvTransform = require('json2csv').Transform;

const fields = ['id', 'company', 'company_abbr', 'anaylst_percent', 'robinhood_owners', 'tickers'];
const opts = {
  fields,
  header: false,
  delimiter: '|',
};
const transformOpts = {
  encoding: 'utf-8',
};

let index = 1;
const convertCSV = (index = 1) => {
  if (index === 2) {
    console.log('All files converted to CSV');
    return;
  }
  const input = fs.createReadStream(`../generate_sdc_data/singularity.json`, { encoding: 'utf8' });
  const output = fs.createWriteStream(`../generate_sdc_data/singularity.csv`, { encoding: 'utf8' });
  const json2csv = new Json2csvTransform(opts, transformOpts);

  const processor = input.pipe(json2csv).pipe(output);
  console.log(`finished csv ${index}`);
  // convertCSV(index + 1);
};

convertCSV();
