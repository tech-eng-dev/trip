import React from 'react';
import { shallow, configure } from 'enzyme';
import configureStore from 'redux-mock-store';
import Adapter from 'enzyme-adapter-react-16';


// imported as a connected component!
import LeftSideView from '../../src/components/leftbar';

configure({ adapter: new Adapter() });
const middlewares = []; // you can mock any middlewares here if necessary
const mockStore = configureStore(middlewares);

const initialState = {
  myProfile: {
    blocked: false,
    email: 'litian19901120@gmail.com',
    name: 'Tian Li',
    photo: '',
    role: 'Manager',
    uid: '7MnU3xgql7O5RduyY2TpNig4KtA2',
  },
  myPhoto: '',
};

describe('LeftBarView renders correctly', () => {
  it('renders as expected', () => {
    const store = mockStore(initialState);
    const wrapper = shallow(<LeftSideView onSelect={(index) => {}} />, { context: { store } });
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
