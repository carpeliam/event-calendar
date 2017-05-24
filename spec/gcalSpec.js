const gcal = require('../lib/gcal');

const PROPER_AUTHZ_CODE = 'proper authorization code';

// before((done) => {
//   console.log('before called');
//   done();
// });


describe('gcal', () => {
  let actualAuthzCode;
  let gcalUser;
  beforeEach(() => {
    spyOn(gcal.oauth2Client, 'getToken').and.callFake((authzCode, cb) => {
      if (authzCode === PROPER_AUTHZ_CODE) {
        cb(null, { access_token: 'access_token', refresh_token: 'refresh_token' });
      } else {
        cb(new Error('bad stuff happened'), null);
      }
    });

    gcalUser = jasmine.createSpyObj('GCalUser', ['save']);
    // spyOn(gcal, 'GCalUser').and.returnValue(gcalUser);
    // spyOn(gcal, 'GCalUser', 'find').and.returnValue(new Promise(resolve, reject) { ;
  });
  describe('saveCode', () => {
    it('saves the code to the db', () => {
      gcal.saveCalendar(PROPER_AUTHZ_CODE);
      expect(gcal.oauth2Client.getToken).toHaveBeenCalledWith(PROPER_AUTHZ_CODE, jasmine.any(Function));
      // expect(gcal.GCalUser).toHaveBeenCalledWith({
      //   access_token: 'access_token',
      //   refresh_token: 'refresh_token',
      // });
      // expect(gcalUser.save).toHaveBeenCalled();
    });
  });
});
