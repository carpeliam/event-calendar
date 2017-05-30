const cfenv = require('cfenv');
const google = require('googleapis');

const DEV_DEFAULTS = {
  dbUrl: 'mongodb://localhost/eventcalendar',
  port: 3000,
};

const appEnv = cfenv.getAppEnv();

const hostUrl = process.env.HOST_URL || appEnv.url;

const gcal = {
  clientId: process.env.GOOGLE_CALENDAR_API_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CALENDAR_API_CLIENT_SECRET,
  redirectUrl: `${hostUrl}/authorize`,
};
const oauth2Client = new google.auth.OAuth2(gcal.clientId, gcal.clientSecret, gcal.redirectUrl);

const appConfig = {
  dbUrl: appEnv.getServiceURL('event-calendar-db'),
  port: appEnv.port,
  googleCalendarAuthLink: oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
  }),
  googleCalendarAPI: gcal,
};

module.exports = Object.keys(appConfig).reduce((config, key) => {
  const val = appConfig[key];
  if (val) config[key] = val;
  return config;
}, DEV_DEFAULTS);
