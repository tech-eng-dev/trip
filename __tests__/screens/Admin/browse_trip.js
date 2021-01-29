import React from 'react';
import { shallow, configure } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';
import navigation from 'react-navigation';
// imported as a connected component!
import AdminBrowseTrip from '../../../src/screens/Admin/browse_trip';

const middlewares = []; // you can mock any middlewares here if necessary
const mockStore = configureStore(middlewares);
configure({ adapter: new Adapter() });

const initialState = {
  filterOption: {
    by: 0,
    from: '2018-02-10',
    to: '2018-02-28',
  },
};

const records = [
  {
    comment: 'Test',
    createdTime: '1518174116204',
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
];


describe('AdminBrowseTrip renders correctly', () => {
  it('renders as expected', () => {
    const store = mockStore(initialState);
    const wrapper = shallow(
      <AdminBrowseTrip
        onPressLeft={() => {}}
        handle={{ navigation }}
        allRecords={records}
      />,
      { context: { store } },
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
