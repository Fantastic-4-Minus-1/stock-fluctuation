const fs = require('fs');
const path = require('path');

const generateCompanyEntry = (acronym, index, totalEntries, fileAmount) => {
  const getRandomInt = max => Math.ceil(Math.random() * Math.floor(max));
  console.time('file');
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
    for (var i = 0; i < numOfCompanies; i++) {
      var obj = {
        _id: index[0] + 1,
        company: `${companyNames[acronym[i][0]]} ${companyNames[acronym[i][1]]}`,
        companyAbbr: acronym[i],
        anaylst_percent: getRandomInt(99),
        robinhood_owners: getRandomInt(180000) + 20000,
        tickers: []
      };
      for (var j = 1; j < 2; j++) {
        var monday = getMonthlyWeekday(j, 'Monday', 'September', 2018);
        obj.tickers.push(
          { date: new Date(2018, 8, monday), price: timesAndPrice() },
        );
      }
      results.push(obj);
      index[0]++;
      if (results.length === fileAmount) {
        return results;
        console.timeEnd('file');
      }
    }
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
      tempObj['currentPrice'] = getRandomInt(50) + 100;
      times.push(tempObj);
      startingTime = startingTime + x;
    }
    return times;
  }

  return data(fileAmount);
};

module.exports = generateCompanyEntry;
