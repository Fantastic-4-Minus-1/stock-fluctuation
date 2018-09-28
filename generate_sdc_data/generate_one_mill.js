const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
const generateCompanyEntry = require('./generateCompanyEntry.js');

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

const fileAmount = 20000;
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

const tickersTest = generateTickerSymbol();
console.log(tickersTest[99]);

const writeToFile = (file, results) => {
  return fs.writeFile(
    path.join(__dirname, 'ten_mill_data', `data_${file}.json`),
    JSON.stringify(results),
    (err) => {
      if (err) return console.log(err);
    }
  );
};

const tickers = generateTickerSymbol(5);
const totalEntries = [0];
const total = 10000000;

let ticks = 0;

const promiseFiles = (fileNum = 1) => {
  console.log('next promise');
  console.log(totalEntries, 'Total Entries');
  if (totalEntries[0] >= total) {
    console.log('done');
    console.timeEnd('Total');
    return;
  }
  const dataArray = [];
  console.time('Promises');
  for (let i = 0; i < 5; i += 1) {
    dataArray.push(
      fs.writeFileAsync(
        path.join(__dirname, 'ten_mill_data', `data_${fileNum}.json`),
        JSON.stringify(generateCompanyEntry(ticksArray[ticks++], totalEntries, tickers.length, fileAmount)), {},
      ),
    );
    fileNum += 1;
  }
  Promise.all(dataArray)
    .then(() => {
      console.timeEnd('Promises');
      promiseFiles(fileNum);
    })
    .catch((err) => {
      console.log(err);
    });
};

// promiseFiles();

// module.exports = writeFiles;
