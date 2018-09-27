const faker = require('faker');
const fs = require('fs');
const path = require('path');

const generateCompanyEntry = (acronym, index, fileIndex) => {

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

  const data = function (numOfCompanies) {
    let results = [];
    for (var i = 0; i < numOfCompanies && index[0] <= 10000000; i++) {
      var obj = {
        _id: index[0],
        company: `${companyNames[acronym[i][0]]} ${companyNames[acronym[i][1]]}`,
        companyAbbr: acronym[i],
        anaylst_percent: faker.random.number({ min: 1, max: 99 }),
        robinhood_owners: faker.random.number({ min: 20000, max: 200000 }),
        tickers: []
      };
      for (var j = 1; j < 2; j++) {
        var monday = getMonthlyWeekday(j, 'Monday', 'September', 2018);
        obj.tickers.push(
          { date: new Date(2018, 8, monday), price: timesAndPrice() },
        );
      }
      results.push(obj);
      if (results.length === 50000) {
        writeToFile(fileIndex[0], results);
        // fs.writeFile(
        //   path.join(__dirname, 'ten_mill_data', `data_${fileIndex[0]}.json`),
        //   JSON.stringify(results),
        //   (err) => {
        //     if (err) return console.log(err);
        //   }
        // );
        fileIndex[0]++;
        results = [];
      }
      index[0]++;
    }
    // fs.writeFile(
    //   path.join(__dirname, 'ten_mill_data', `data_${fileIndex[0]}.json`),
    //   JSON.stringify(results),
    //   (err) => {
    //     if (err) return console.log(err);
    //   }
    // );
    writeToFile(fileIndex[0], results);
    fileIndex[0]++;
    return;
  };

  const writeToFile = (file, results) => {
    fs.writeFile(
      path.join(__dirname, 'ten_mill_data', `data_${file}.json`),
      JSON.stringify(results),
      (err) => {
        if (err) return console.log(err);
      }
    );
  };

  function getMonthlyWeekday(n, d, m, y) {
    var targetDay,
      curDay = 0,
      i = 1,
      seekDay;
    if (d == 'Sunday') seekDay = 0;
    if (d == 'Monday') seekDay = 1;
    if (d == 'Tuesday') seekDay = 2;
    if (d == 'Wednesday') seekDay = 3;
    if (d == 'Thursday') seekDay = 4;
    if (d == 'Friday') seekDay = 5;
    if (d == 'Saturday') seekDay = 6;
    while (curDay < n && i < 31) {
      targetDay = new Date(i++ + ' ' + m + ' ' + y);
      if (targetDay.getDay() == seekDay) curDay++;
    }
    if (curDay == n) {
      targetDay = targetDay.getDate();
      return targetDay;
    } else {
      return false;
    }
  }

  function timesAndPrice() {
    var x = 10;
    var times = [];
    var startingTime = 600;

    for (var i = 0; startingTime < 15.1 * 60; i++) {
      var hh = Math.floor(startingTime / 60);
      var mm = startingTime % 60;
      var tempObj = {};
      if (hh >= 12) {
        tempObj['currentTime'] =
          ('0' + ((hh % 12) + 12)).slice(-2) + ':' + ('0' + mm).slice(-2);
      } else {
        tempObj['currentTime'] =
          ('0' + (hh % 12)).slice(-2) + ':' + ('0' + mm).slice(-2);
      }
      tempObj['currentPrice'] = faker.commerce.price(100.0, 150.7, 2);
      times.push(tempObj);
      startingTime = startingTime + x;
    }
    return times;
  }

  return data(acronym.length);
};

module.exports = generateCompanyEntry;
