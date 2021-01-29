import React from 'react';
import { shallow, configure } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
// imported as a connected component!
import Verify from '../../../src/screens/Login/verify';

const middlewares = []; // you can mock any middlewares here if necessary
const mockStore = configureStore(middlewares);
configure({ adapter: new Adapter() });

const initialState = {

};

describe('Login component renders correctly', () => {
  it('renders as expected', () => {
    const store = mockStore(initialState);
    const wrapper = shallow(
      <Verify />,
      { context: { store } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
