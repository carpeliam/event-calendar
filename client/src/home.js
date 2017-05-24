import React from 'react';

import { createStore, compose, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';

import reducer from './reducers';
import CalendarContainer from './calendarContainer';

const initialState = { events: [] };
const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default function Home(props) {
  return (
    <div>
      <a href={googleCalendarAuthLink}>add my calendar</a>
      <Provider store={store}>
        <CalendarContainer />
      </Provider>
    </div>
  );
}
