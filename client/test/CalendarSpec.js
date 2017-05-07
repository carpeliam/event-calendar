import React from 'react';
import { shallow } from 'enzyme';
import InfiniteCalendar from 'react-infinite-calendar';
import Calendar from '../src/Calendar';

describe('Calendar', () => {
  it('renders', () => {
    const calendar = shallow(<Calendar />);
    expect(calendar.find(InfiniteCalendar)).toBePresent();
  });
});
