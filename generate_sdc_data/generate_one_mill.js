const faker = require('faker');
const fs = require('fs');
const generateCompanyEntry = require('./generateCompanyEntry.js');

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

const generateTickerSymbol = (n = 5, baseChar = '') => {
  // let counter = 1;
  const result = [];
  const uniqueTicker = (current = '') => {
    if (current.length === n) {
      return result.push(current);
    }
    alphabet.forEach(char => uniqueTicker(current + char));
  };
  uniqueTicker(baseChar);
  return result;
};

// const ticker = generateTickerSymbol(1);

let totalEntries = 0;
alphabet.forEach((letter) => {
  let acronyms = generateTickerSymbol(2, letter);
})

const writeEntriesToFile = (filePath, numOfEntries) => {
  let result = {};




  fs.writeFile(
    path.join(__dirname, 'mill_1.json'),
    JSON.stringify(result),
    (err) => {
      if (err) return console.log(err);
    }
  );
}

module.exports = writeEntriesToFile;
