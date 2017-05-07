var express = require('express');

var path = require('path');

var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);
var indexHtml = path.join(compiler.outputPath, 'index.html');

var app = express();

var isProd = process.env.NODE_ENV === 'production';

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

var port = process.env.PORT || 3000;

app.listen(port, function () { console.log('http://localhost:' + port); });
