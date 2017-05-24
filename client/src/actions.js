export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';

function receiveEvents(events) {
  return { type: RECEIVE_EVENTS, events };
}

export function fetchEvents() {
  return dispatch =>
    fetch('/events')
      .then(response => response.json())
      .then(json => dispatch(receiveEvents(json)));
}
