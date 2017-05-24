const winston = require('winston');
const mongoose = require('mongoose');
const { dbUrl } = require('./config');

mongoose.connect(dbUrl);

mongoose.connection.on('connected', () => {
  winston.debug(`Mongoose default connection open to ${dbUrl}`);
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
