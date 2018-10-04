const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');

console.time('Total');

const getRandomInt = max => Math.ceil(Math.random() * Math.floor(max));

function timesAndPrice() {
  var x = 10;
  var times = [];
  var startingTime = 600;

  for (var i = 0; startingTime < 15.1 * 60; i++) {
    let arr = [];
    var hh = Math.floor(startingTime / 60);
    var mm = startingTime % 60;
    var tempObj = {};
    if (hh >= 12) {
      arr[0] =
        ('0' + ((hh % 12) + 12)).slice(-2) + ':' + ('0' + mm).slice(-2);
    } else {
      arr[0] =
        ('0' + (hh % 12)).slice(-2) + ':' + ('0' + mm).slice(-2);
    }
    arr[1] = getRandomInt(50) + 100;
    times.push(arr);
    startingTime = startingTime + x;
  }
  return times;
}

const totalEntries = [0];

const buildCompanyEnries = (companies = 1, index) => {
  let result = '';
  for (let i = 1; i <= companies; i += 1) {
    const arr = timesAndPrice();
    for (let j = 0; j < 20; j += 1) {
      result += (`${index[0]}|2018-09-03T07:00:00.000Z|${arr[j][0]}|${arr[j][1]}\n`);
    }
    index[0] += 1;
  }
  return result;
};


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
        path.join(__dirname, 'join_table.csv'),
        buildCompanyEnries(10000, companyIndex), {},
      ),
    );
  }
  Promise.all(dataArray)
    .then(() => {
      console.timeEnd('Promises');
      console.log(`Completed Entries for ${companyIndex[0]} companies`);
      promiseFiles(companyIndex, 10000000);
    })
    .catch((err) => {
      console.log(err);
    });
};

promiseFiles([1], 10000000);
