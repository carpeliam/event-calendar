import fetchMock from 'fetch-mock';
import { fetchEvents } from '../src/actions';

describe('Actions', () => {
  let dispatchSpy;
  beforeEach(() => {
    dispatchSpy = jasmine.createSpy('dispatch');
  });
  afterEach(fetchMock.restore);

  describe('fetchEvents', () => {
    it('responds with events from the server', (done) => {
      fetchMock.mock('/events', [{ id: 1 }]);
      fetchEvents()(dispatchSpy).then(() => {
        expect(dispatchSpy).toHaveBeenCalledWith({
          type: 'RECEIVE_EVENTS',
          events: [{ id: 1 }],
        });
        done();
      });
    });
  });
});
