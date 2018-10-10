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

const fileAmount = 10;

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

generateTickerSymbol(5);

const buildCompanyEnries = (companies = 1, index, acrynoms) => {
  let result = '';
  for (let i = 0; i < companies; i += 1) {
    result += (`${acrynoms[i]}`);
    if ((i + 1) % 10 === 0) {
      result += '\n';
    } else {
      result += ',';
    }
    index[0] += 1;
  }
  return result;
};

let ticks = 0;
const maxC = 200000;

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
        path.join(__dirname, 'acronym.csv'),
        buildCompanyEnries(10, companyIndex, ticksArray[ticks++]), {},
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

const acronymHeader = (num) => {
  let result = '';
  for (let i = 0; i < num; i++) {
    if (i > 0) result += ',';
    result += `acronym${i}`;
  }
  result += '\n';
  return result;
};

fs.writeFileAsync(path.join(__dirname, 'acronym.csv'), acronymHeader(10))
  .then(() => {
    promiseFiles([1], maxC);
  })
  .catch((err) => {
    console.log(err);
  });
