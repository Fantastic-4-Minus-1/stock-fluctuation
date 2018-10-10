const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');

console.time('Total');

// Return all unique stock acrynoms for n letters long //
const range = (startChar, endChar) => {
  const result = [];
  const start = startChar.charCodeAt(0);
  const end = endChar.charCodeAt(0);
  for (let i = start; i <= end; i++) {
    result.push(String.fromCharCode(i));
  }
  return result;
};

const alphabet = range('A', 'Z');

// 10M
// const totalEntries = [0];
// const total = 10000000;
// const fileAmount = 20000;

// Test Data
const totalEntries = [0];
const total = 100;
const fileAmount = 50000;

const ticksArray = [];

const generateTickerSymbol = (n = 5, baseChar = '') => {
  console.time('tickers');
  let result = [];
  const uniqueTicker = (current = '') => {
    if (current.length === n) {
      result.push(current);
      if (result.length === fileAmount) {
        ticksArray.push(result);
        result = [];
      }
      return;
    }
    alphabet.forEach(char => uniqueTicker(current + char));
  };
  uniqueTicker(baseChar);
  console.timeEnd('tickers');
  return result;
};

const tickers = generateTickerSymbol(5);

const getRandomInt = max => Math.ceil(Math.random() * Math.floor(max));

const companyNames = {
  'A': 'Analytics',
  'B': 'Bouyer',
  'C': 'Caltronic',
  'D': 'Denature',
  'E': 'Enron',
  'F': 'Fenway',
  'G': 'Graphics',
  'H': 'Harriet',
  'I': 'Ingrain',
  'J': 'Johnson',
  'K': 'Kinetic',
  'L': 'LL',
  'M': 'Marriot',
  'N': 'Nahar',
  'O': 'Optics',
  'P': 'Penn. A.',
  'Q': 'Quan',
  'R': 'Rendi',
  'S': 'Solutions',
  'T': 'Technologies',
  'U': 'U.',
  'V': 'Vector',
  'W': 'Web',
  'X': 'Xavier',
  'Y': 'Y.',
  'Z': 'Zenic',
};

// const companies = 1;

const buildCompanyEnries = (companies = 1, index, acrynoms) => {
  let result = '';
  for (let i = 0; i < companies; i += 1) {
    result += (`${index[0]}|${companyNames[acrynoms[i][0]]} ${companyNames[acrynoms[i][1]]}|${acrynoms[i]}|${getRandomInt(99)}|${getRandomInt(180000) + 20000}\n`);
    index[0] += 1;
  }
  return result;
};

let ticks = 0;
const maxC = 10000000;

const promiseFiles = (companyIndex = [1], max) => {
  console.log('next promise');
  console.log(companyIndex[0], 'Total Entries');
  if (companyIndex[0] >= max) {
    console.log('done');
    console.timeEnd('Total');
    return;
  }
  const dataArray = [];
  console.time('Promises');
  for (let i = 0; i < 5; i += 1) {
    dataArray.push(
      fs.appendFileAsync(
        path.join(__dirname, 'stock_table.csv'),
        buildCompanyEnries(50000, companyIndex, ticksArray[ticks++]), {},
      ),
    );
  }
  Promise.all(dataArray)
    .then(() => {
      console.timeEnd('Promises');
      console.log(`Completed Entries for ${companyIndex[0]} companies`);
      promiseFiles(companyIndex, maxC);
    })
    .catch((err) => {
      console.log(err);
    });
};

promiseFiles([1], maxC);
