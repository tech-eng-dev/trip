import { allUsers, myRecords, allRecords, blockData, myPhoto, filterOption } from '../../../src/redux/reducers/home';
import * as types from '../../../src/redux/types';

const personImage = require('../../../src/resources/images/person.png');

test('Save All Users Data', () => {
  const initialState = {};
  const param = {
    VZx9D1IMIdT0gXCtsh2mymcXawd2: {
      blocked: false,
      email: 'litian19901120@gmail.com',
      name: 'Tian Li',
      photo: '',
      role: 'User',
      uid: 'VZx9D1IMIdT0gXCtsh2mymcXawd2',
    },
  };
  const action = {
    type: types.ALL_USERS,
    payload: param,
  };
  expect(allUsers(initialState, action)).toEqual(param);
});

test('Save My Trip Data', () => {
  const initialState = {};
  const param = {
    123456789: {
      commit: 'Test',
      createdTime: '123456789',
      startDate: '2018-02-14',
      endDate: '2018-02-27',
      location: {
        description: 'Test',
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
        id: '',
      },
      userId: 'VZx9D1IMIdT0gXCtsh2mymcXawd2',
    },
  };
  const action = {
    type: types.MY_RECORDS,
    payload: param,
  };
  expect(myRecords(initialState, action)).toEqual(param);
});

test('Save All Users Trip', () => {
  const initialState = {};
  const param = [
    {
      commit: 'Test',
      createdTime: '123456789',
      startDate: '2018-02-14',
      endDate: '2018-02-27',
      location: {
        description: 'Test',
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
        id: '',
      },
      userId: 'VZx9D1IMIdT0gXCtsh2mymcXawd2',
    },
  ];
  const action = {
    type: types.ALL_RECORDS,
    payload: param,
  };
  expect(allRecords(initialState, action)).toEqual(param);
});

test('Save All Block Data', () => {
  const initialState = {};
  const param = {
    'litian19901120@gmail%2Ecom': 2,
  };
  const action = {
    type: types.BLOCK_DATA,
    payload: param,
  };
  expect(blockData(initialState, action)).toEqual(param);
});

test('Save My Profile Image', () => {
  const initialState = personImage;
  const param = {
    uri: '',
  };
  const action = {
    type: types.MY_PHOTO,
    payload: param,
  };
  expect(myPhoto(initialState, action)).toEqual(param);
});

test('Save Filter Options', () => {
  const initialState = {};
  const param = {
    by: 0,
    from: '2018-02-04',
    to: '2018-02-15',
  };
  const action = {
    type: types.FILTER_OPTION,
    payload: param,
  };
  expect(filterOption(initialState, action)).toEqual(param);
});
