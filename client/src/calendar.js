import React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';

// export default function Calendar(props) {
//   return <InfiniteCalendar />;
// }

export default class Calendar extends React.Component {
  componentDidMount() {
    this.props.fetchEvents();
  }


  componentWillReceiveProps(props) {
    console.log('events', props.events, JSON.stringify(props.events));
  }


  render() {
    return <InfiniteCalendar />;
  }
}
