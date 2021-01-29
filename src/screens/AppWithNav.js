import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../redux/actions';
import MainNavigator from './AppNavigator';

class AppWithNav extends React.Component {
  render() {
    return (
      <MainNavigator />
    );
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(null, mapDispatchToProps)(AppWithNav);
