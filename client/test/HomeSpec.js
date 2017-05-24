import React from 'react';
import { shallow } from 'enzyme';
import Home from '../src/home';

describe('Home', () => {
  it('contains a calendar', () => {
    const home = shallow(<Home />);
    expect(home.find('CalendarContainer')).toBePresent();
  });
});
