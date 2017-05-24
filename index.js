require('./lib/db');
const winston = require('winston');
const { port, googleCalendarAPI: { clientId, clientSecret, redirectUrl } } = require('./lib/config');
var express = require('express');

var path = require('path');

var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);
var indexHtml = path.join(compiler.outputPath, 'index.html');

var gcal = require('./lib/gcal');

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



// /authorize
app.get('/authorize', (req, res) => {
  gcal.saveCalendar(req.query.code);
  res.redirect('/');
});

// app.get('/allcodes', (req, res) => {
//   gcal.retrieveAllCodes().then(codes => res.send(codes.map(c => c.credentials)));
// });

app.get('/events', (req, res) => {
  gcal.allEvents().then(events => res.send(events)).catch(err => res.send(err));
});


module.exports = app.listen(port, function () { winston.info(`started on http://localhost:${port}`); });
