import React from 'react';
import { createStore } from 'redux';
import { shallow } from 'enzyme';
import CalendarContainer from '../src/calendarContainer';
import * as actions from '../src/actions';

describe('Container', () => {
  let container;
  let store;
  beforeEach(() => {
    store = createStore(state => state, {
      events: [{ id: 1 }]
    });
    spyOn(store, 'dispatch');
    container = shallow(<CalendarContainer store={store} />);
  });

  it('contains a Home child component', () => {
    expect(container.find('Calendar')).toBePresent();
  });

  it('passes events prop to child component', () => {
    expect(container).toHaveProp('events', [{ id: 1 }]);
  });

  it('passes fetchEvents to child component', () => {
    spyOn(actions, 'fetchEvents').and.returnValue('fetchEvents');
    container.props().fetchEvents();
    expect(actions.fetchEvents).toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalledWith('fetchEvents');
  });
});
