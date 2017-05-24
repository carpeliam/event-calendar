const request = require('supertest');
const gcal = require('../lib/gcal');

describe('Server', () => {
  let originalNodeEnv;
  let server;
  beforeEach(() => {
    [originalNodeEnv, process.env.NODE_ENV] = [process.env.NODE_ENV, 'production'];
    server = require('../index');
  });

  describe('/authorize', () => {
    beforeEach(() => spyOn(gcal, 'saveCalendar'));
    it('stores code in gcal store', (done) => {
      request(server).get('/authorize?code=ududlrlrbas').expect(302).expect('Location', '/').end((err) => {
        if (err) { done.fail(err); }
        expect(gcal.saveCalendar).toHaveBeenCalledWith('ududlrlrbas');
        done();
      });
    });
  });

  describe('/events', () => {
    beforeEach(() => spyOn(gcal, 'allEvents').and.returnValue(new Promise((resolve) => {
      return resolve([{ eventData: 'eventData' }]);
    })));
    it('retrieves events from gcal', (done) => {
      request(server).get('/events').expect(200).end((err, res) => {
        if (err) { done.fail(err); }
        expect(gcal.allEvents).toHaveBeenCalled();
        expect(res.body).toEqual([{ eventData: 'eventData' }]);
        done();
      });
    });
  });

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
    server.close();
  });
});
