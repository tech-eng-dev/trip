import { greeting, myProfile } from '../../../src/redux/reducers/login';
import * as types from '../../../src/redux/types';

test('Save Filter Options', () => {
  const initialState = 'Hello';
  const action = {
    type: types.WELCOME,
    payload: 'App Started',
  };
  expect(greeting(initialState, action)).toEqual('App Started');
});

test('Save All Users Data', () => {
  const initialState = {};
  const param = {
    blocked: false,
    email: 'litian19901120@gmail.com',
    name: 'Tian Li',
    photo: '',
    role: 'User',
    uid: 'VZx9D1IMIdT0gXCtsh2mymcXawd2',
  };
  const action = {
    type: types.SET_PROFILE,
    payload: param,
  };
  expect(myProfile(initialState, action)).toEqual(param);
});
