import { welcome } from '../../../src/redux/actions/login';
import * as types from '../../../src/redux/types';


test('actions - welcome', () => {
  const param = 'welcome';
  expect(welcome(param)).toEqual({
    type: types.WELCOME,
    payload: 'App Started',
  });
});
