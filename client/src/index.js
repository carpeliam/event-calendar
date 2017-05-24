import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './calendar';
import Home from './home';

ReactDOM.render(<Home />, document.querySelector('#root'));

console.log('ne', process.env.NODE_ENV);
console.log(googleCalendarAuthLink);
