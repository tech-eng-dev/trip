import React from 'react';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import appReducer from './redux/reducers';
import AppWithNav from './screens/AppWithNav';


const store = createStore(appReducer, {}, applyMiddleware(thunkMiddleware));
console.disableYellowBox = true;

export default class Trip extends React.Component {
  render() {
    return <Provider store={store}><AppWithNav /></Provider>;
  }
}
