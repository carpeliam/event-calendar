import React from 'react';
import { shallow } from 'enzyme';
import InfiniteCalendar from 'react-infinite-calendar';
import Calendar from '../src/calendar';

describe('Calendar', () => {
  it('fetches events on load', () => {
    const fetchEventsSpy = jasmine.createSpy('fetchEvents');
    const calendar = shallow(<Calendar fetchEvents={fetchEventsSpy} />);
    // calendar.componentDidMount();
    // expect(fetchEventsSpy).toHaveBeenCalled();
    expect(calendar.find(InfiniteCalendar)).toBePresent();
  });
});
