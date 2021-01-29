import React from 'react';
import { shallow, configure } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import navigation from 'react-navigation';
// imported as a connected component!
import Home from '../../../src/screens/Home';

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
  myRecords: {
    1518174116204: {
      comment: 'Test',
      createdTime: '1518174116204',
      startDate: '2018-02-04',
      endDate: '2018-02-28',
      location: {
        description: 'test',
        geometry: {
          location: {
            lat: '12.34',
            lng: '12.34',
          },
          viewport: {
            northeast: {
              lat: '12.34',
              lng: '12.34',
            },
            southwest: {
              lat: '12.34',
              lng: '12.34',
            },
          },
        },
        id: 'ad013b06650801c352d643dc90db93210e5d07cb',
      },
    },
  },
  allUsers: {
    VZx9D1IMIdT0gXCtsh2mymcXawd2: {
      email: 'litian19901120@gmail.com',
      name: 'Tian Li',
      photo: '',
      role: 'User',
      uid: 'VZx9D1IMIdT0gXCtsh2mymcXawd2',
    },
  },
  blockData: {
    'litian19901120@gmail%2Ecom': 2,
  },
  allRecords: [
    {
      comment: 'Test',
      createdTime: '1518174116204',
      startDate: '2018-02-04',
      endDate: '2018-02-28',
      location: {
        description: 'test',
        geometry: {
          location: {
            lat: '12.34',
            lng: '12.34',
          },
          viewport: {
            northeast: {
              lat: '12.34',
              lng: '12.34',
            },
            southwest: {
              lat: '12.34',
              lng: '12.34',
            },
          },
        },
        id: 'ad013b06650801c352d643dc90db93210e5d07cb',
      },
    },
  ],
};

describe('Login component renders correctly', () => {
  it('renders as expected', () => {
    const store = mockStore(initialState);
    const wrapper = shallow(
      <Home navigation={navigation} />,
      { context: { store } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
