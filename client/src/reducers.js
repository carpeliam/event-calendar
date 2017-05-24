import { combineReducers } from 'redux';
import { RECEIVE_EVENTS } from './actions';

export function events(state = [], action) {
  switch (action.type) {
    case RECEIVE_EVENTS:
      return action.events;
    default:
      return state;
  }
}

export default combineReducers({ events });
