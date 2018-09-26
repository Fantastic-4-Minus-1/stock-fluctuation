const faker = require('faker');

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

const makeCompanyNamesFaker = () => {
  let results = {};
  alphabet.forEach((letter) => {
    let companyName = faker.company.companyName();
    while (companyName[0] !== letter) {
      companyName = faker.company.companyName();
    }
    results[letter] = companyName;
  });
  return results;
};

console.log(makeCompanyNamesFaker());
