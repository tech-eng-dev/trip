import React from 'react';
import { shallow, configure } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
// imported as a connected component!
import UserFilterTrip from '../../../src/screens/User/filter_trip';

const middlewares = []; // you can mock any middlewares here if necessary
const mockStore = configureStore(middlewares);
configure({ adapter: new Adapter() });

const initialState = {
  filterOption: {
    by: 0,
    from: '2018-02-10',
    to: '2018-02-28',
  },
  myProfile: {
    email: 'litian19901120@gmail.com',
    name: 'Tian Li',
    photo: '',
    role: 'User',
    uid: 'VZx9D1IMIdT0gXCtsh2mymcXawd2',
  },
};

describe('UserFilterTrip component renders correctly', () => {
  it('renders as expected', () => {
    const store = mockStore(initialState);
    const wrapper = shallow(
      <UserFilterTrip />,
      { context: { store } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
