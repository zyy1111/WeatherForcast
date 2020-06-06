const express = require('express');
const axios = require('axios');
const moment = require('moment');
const Chart = require('chart.js');

const router = express.Router();

let getWeatherInfo = (res, view, lat, lon) => {
  axios({
    method: 'get',
    url: "https://api.openweathermap.org/data/2.5/onecall",
    params: {
      lat: lat,
      lon: lon,
      exclude: 'minutely,hourly',
      appid: 'af78fa2ca5849d2fdb09d17240933914'
    }
  }).then((results) => {
    let data = results.data;

    let dateList = [];
    for(let i = 0; i < data.daily.length; i++) {
      dateList.push(moment.unix(data.daily[i].dt).format("DD/MM"));
    }

    res.render(
      view, 
      {
        data: data, 
        sunrise: moment.unix(data.current.sunrise).format("DD-MM-YYYY HH:mm:ss"),
        sunset: moment.unix(data.current.sunset).format("DD-MM-YYYY HH:mm:ss"),
        dateList: dateList,
      }
    );
  }).catch((err) => {
    console.log(err);
  });
}

router.get('/', (req, res) => {
  res.render('index.html');
});

router.get('/NY', (req, res) => {
  getWeatherInfo(res, 'NY.html', '40.712772', '-74.006058');
  // axios({
  //   method: 'get',
  //   url: "https://api.openweathermap.org/data/2.5/onecall",
  //   params: {
  //     lat: '40.712772',
  //     lon: '-74.006058',
  //     exclude: 'minutely,hourly',
  //     appid: 'af78fa2ca5849d2fdb09d17240933914'
  //   }
  // }).then((results) => {
  //   let data = results.data;

  //   let dateList = [];
  //   for(let i = 0; i < data.daily.length; i++) {
  //     dateList.push(moment.unix(data.daily[i].dt).format("DD/MM"));
  //   }
  //   res.render(
  //     'NY.html', 
  //     {
  //       data: data, 
  //       sunrise: moment.unix(data.current.sunrise).format("DD-MM-YYYY HH:mm:ss"),
  //       sunset: moment.unix(data.current.sunset).format("DD-MM-YYYY HH:mm:ss"),
  //       dateList: dateList
  //     }
  //   );
  // }).catch((err) => {
  //   console.log(err);
  // });
});

router.get('/LA', (req, res) => {
  getWeatherInfo(res, 'LA.html', '34.052235', '-118.243683');

  

});

router.get('/Chicago', (req, res) => {
  getWeatherInfo(res, 'Chicago.html', '41.881832', '-87.623177');
});

router.get('/Washington', (req, res) => {
  getWeatherInfo(res, 'Washington.html', '47.751076', '-120.740135');
});



module.exports = router;
