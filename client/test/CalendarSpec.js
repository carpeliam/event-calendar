import React from 'react';
import { shallow } from 'enzyme';
import Calendar from '../src/Calendar';

describe('Calendar', () => {
  it('renders', () => {
    const calendar = shallow(<Calendar />);
    expect(calendar).toHaveText('Watch this space');
  });
});
