const google = require('googleapis');
const { googleCalendarAPI: { clientId, clientSecret, redirectUrl } } = require('./config');

const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);

function retrieveItems(credentials) {
  console.log('retrieveItems', JSON.stringify(credentials));
  return new Promise((resolve, reject) => {
    oauth2Client.setCredentials(credentials);
    oauth2Client.refreshAccessToken(function(err, tokens) {
      console.log('refreshAccessToken', arguments);
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return reject(err);
      }
      oauth2Client.setCredentials(tokens);
      // storeToken(token);
      var calendar = google.calendar('v3');
      calendar.events.list({
        auth: oauth2Client,
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime'
      }, function(err, response) {
        if (err) {
          return reject(err);
        } else {
          return resolve(response.items);
        }
      });
    });
  });
}






// const mongoose = require('mongoose');
// const gcalUsersSchema = mongoose.Schema({ code: String });
// const gcalUser =
const db = require('./db');

const GCalUser = db.model('GCalUser', {
  credentials: {
    access_token: String,
    token_type: String,
    expiry_date: Number,
    refresh_token: String,
  }
});


// seriously, mongo vs sql? are we really storing unstructured data?




// retrieveItems(code, function(err, items) {
//     if (err) {
//       console.log('The API returned an error: ' + err);
//       res.send(err);
//     }
//     console.log('Upcoming 10 events:');
//     var arr = [];
//     for (var i = 0; i < items.length; i++) {
//       var event = items[i];
//       var start = event.start.dateTime || event.start.date;
//       console.log('%s - %s', start, event.summary);
//       arr[i] = {start: start, summary: event.summary};
//     }

//     res.send(items);
//   });

function saveCalendar(authorizationCode) {
  oauth2Client.getToken(authorizationCode, (err, credentials) => {
    if (err) { return; }
    const user = new GCalUser({ credentials });
    user.save();
  });
}

function retrieveAllCodes() {
  return GCalUser.find().exec();
}

function allEvents() {
  return new Promise((resolve, reject) => {
    GCalUser.find().exec().then((users) => {

      Promise.all(users.map(({ credentials }) => retrieveItems(credentials))).then(userItems => {
        resolve(userItems.reduce((events, items) => {
          return events.concat(items);
        }, []));
      }).catch(err => reject(err));


      // const events = users.reduce((events, { refreshToken }) => {
      //   retrieveItems(refreshToken, (err, items) => {

      //   });
      // }, []);

    });
  });
}


module.exports = {
  saveCalendar,
  retrieveAllCodes,
  allEvents,
  oauth2Client, // testing TODO move to separate module?
};
