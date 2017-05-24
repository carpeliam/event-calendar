import { connect } from 'react-redux';
import { fetchEvents } from './actions';
import Calendar from './calendar';

function mapStateToProps({ events }) {
  return { events };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
