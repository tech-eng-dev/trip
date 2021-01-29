import React from 'react';
import { shallow, configure } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import navigation from 'react-navigation';
// imported as a connected component!
import UserAddTrip from '../../../src/screens/User/add_trip';

const middlewares = []; // you can mock any middlewares here if necessary
const mockStore = configureStore(middlewares);
configure({ adapter: new Adapter() });

const initialState = {
  myProfile: {
    email: 'litian19901120@gmail.com',
    name: 'Tian Li',
    photo: '',
    role: 'User',
    uid: 'VZx9D1IMIdT0gXCtsh2mymcXawd2',
  },
};

describe('UserAddTrip component renders correctly', () => {
  it('renders as expected', () => {
    const store = mockStore(initialState);
    const wrapper = shallow(
      <UserAddTrip navigation={navigation} />,
      {
        context: { store },
      },
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
