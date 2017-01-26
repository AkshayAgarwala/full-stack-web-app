var express = require('express');
var app = express();
var request = require('request');
var data = {};
var pg = require('pg');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./public'))

var Promise = require("bluebird");
var request = require('request-promise');


app.get('/', function(req, res){
  res.render('portfolio');
})

app.get('/form', function(req, res){
  res.render('form');

})

var async = require('async');

app.post('/map', function(req, res){
  async.parallel([
    function(done){
    var startHere = req.body.startHere;
    var startUrl = 'http://api.wunderground.com/api/bbead29e5be99a6f/forecast/q/'+startHere+'.json';
    request(startUrl, function(error, response, body){
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        done(null, info);
      }
    });
  },
    function(done){
      var endHere = req.body.endHere;
      var endUrl = 'http://api.wunderground.com/api/bbead29e5be99a6f/forecast/q/'+endHere+'.json';
      request(endUrl, function(error, response, body){
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);
          done(null, info);
        }
      });
    }],
    function(err, money){
      var temp = money[0].forecast.simpleforecast.forecastday[0];
      var tempp = money[1].forecast.simpleforecast.forecastday[0];
      var data = {
            start: req.body.startHere,
            end: req.body.endHere,
            startWeather: [
              temp.date.weekday,
              temp.conditions,
              temp.high.fahrenheit,
              temp.low.fahrenheit,
              temp.icon_url
            ],
            endWeather: [
              tempp.date.weekday,
              tempp.conditions,
              tempp.high.fahrenheit,
              tempp.low.fahrenheit,
              tempp.icon_url
            ]
          };
      console.log(data);
      res.render('map', { data });
    });
});

app.get('*', function(req, res){
  res.render('help');
})

app.listen(3000, function(){
  console.log("Listening on port 3000");
})
