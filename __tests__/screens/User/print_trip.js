import React from 'react';
import { shallow, configure } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
// imported as a connected component!
import UserPrintTrip from '../../../src/screens/User/print_trip';

const middlewares = []; // you can mock any middlewares here if necessary
const mockStore = configureStore(middlewares);
configure({ adapter: new Adapter() });

const initialState = {
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
};

describe('UserPrintTrip component renders correctly', () => {
  it('renders as expected', () => {
    const store = mockStore(initialState);
    const wrapper = shallow(
      <UserPrintTrip />,
      { context: { store } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
