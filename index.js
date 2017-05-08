var express = require('express');

var path = require('path');

var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);
var indexHtml = path.join(compiler.outputPath, 'index.html');

var app = express();

var isProd = process.env.NODE_ENV === 'production';

// Homepage
if (isProd) {
  app.use(express.static(compiler.outputPath));
  app.get('/', function (req, res) {
    res.send(indexHtml);
  });
} else {
  var webpackDevMiddleware = require('webpack-dev-middleware');
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: '/'
  }));

  app.get('/', function (req, res, next) {
    compiler.outputFileSystem.readFile(indexHtml, function (err, result) {
      if (err) { return next(err); }
      res.send(result);
    });
  });
}


var clientId = process.env.GOOGLE_CALENDAR_API_CLIENT_ID;
var clientSecret = process.env.GOOGLE_CALENDAR_API_CLIENT_SECRET;
var redirectUrl = process.env.GOOGLE_CALENDAR_API_REDIRECT_URL;

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var oauth2Client = new OAuth2(clientId, clientSecret, redirectUrl);
var googleOAuth2Url = oauth2Client.generateAuthUrl({ scope: 'https://www.googleapis.com/auth/calendar' });
console.log(googleOAuth2Url);

// /authorize
app.get('/authorize', function(req, res) {
  var code = req.query.code;

  retrieveItems(code, function(err, items) {
    if (err) {
      console.log('The API returned an error: ' + err);
      res.send(err);
    }
    console.log('Upcoming 10 events:');
    var arr = [];
    for (var i = 0; i < items.length; i++) {
      var event = items[i];
      var start = event.start.dateTime || event.start.date;
      console.log('%s - %s', start, event.summary);
      arr[i] = {start: start, summary: event.summary};
    }

    res.send(arr);
  });
});

function retrieveItems(code, callback) {
  oauth2Client.getToken(code, function(err, token) {
    if (err) {
      console.log('Error while trying to retrieve access token', err);
      return;
    }
    oauth2Client.credentials = token;
    // storeToken(token);
    var calendar = google.calendar('v3');
    calendar.events.list({
      auth: oauth2Client,
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime'
    }, function(err, response) { callback(err, response.items); });
  });
}



var port = process.env.PORT || 3000;

app.listen(port, function () { console.log('http://localhost:' + port); });
