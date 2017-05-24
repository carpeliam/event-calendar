import { events } from '../src/reducers';
describe('reducers', () => {
  describe('events reducer', () => {
    it('initializes to a default state', () => {
      expect(events(undefined, {})).toEqual([]);
    });

    it('sets the state to the JSON response upon receiving RECEIVE_EVENTS', () => {
      expect(events(['existing events'], {
        type: 'RECEIVE_EVENTS',
        events: [{ id: 1 }],
      })).toEqual([{ id: 1 }]);
    });
  });
});
