import {
  saveUserProfile,
  saveUsers,
  saveMyRecords,
  saveAllRecords,
  saveBlockData,
  saveUserPhoto,
  setFilterOption,
} from '../../../src/redux/actions/home';
import * as types from '../../../src/redux/types';


test('actions - saveUserProfile', () => {
  const profile = {
    email: 'litian19901120@gmail.com',
    name: 'Tian Li',
    photo: '',
    role: 'User',
    uid: 'VZx9D1IMIdT0gXCtsh2mymcXawd2',
  };
  expect(saveUserProfile(profile)).toEqual({
    type: types.SET_PROFILE,
    payload: profile,
  });
});

test('actions - saveUsers', () => {
  const users = {
    VZx9D1IMIdT0gXCtsh2mymcXawd2: {
      email: 'litian19901120@gmail.com',
      name: 'Tian Li',
      photo: '',
      role: 'User',
      uid: 'VZx9D1IMIdT0gXCtsh2mymcXawd2',
    },
  };
  expect(saveUsers(users)).toEqual({
    type: types.ALL_USERS,
    payload: users,
  });
});

test('actions - saveMyRecords', () => {
  const records = {
    1518174116204: {
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
  };
  expect(saveMyRecords(records)).toEqual({
    type: types.MY_RECORDS,
    payload: records,
  });
});

test('actions - saveAllRecords', () => {
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
  expect(saveAllRecords(records)).toEqual({
    type: types.ALL_RECORDS,
    payload: records,
  });
});

test('actions - saveBlockData', () => {
  const data = {
    'litian19901120@gmail%2Ecom': 2,
  };
  expect(saveBlockData(data)).toEqual({
    type: types.BLOCK_DATA,
    payload: data,
  });
});

test('actions - saveUserPhoto', () => {
  const photoURL = 'https://lh6.googleusercontent.com/-cd1bLl35YIQ/AAAAAAAAAAI/AAAAAAAAAD4/RWALZoswvgE/s120/photo.jpg';
  expect(saveUserPhoto(photoURL)).toEqual({
    type: types.MY_PHOTO,
    payload: { uri: photoURL },
  });
});

test('actions - setFilterOption', () => {
  const option = {
    by: 0, // 0: filter by start date,   1: filter by end date
    from: '2018-02-02',
    to: '2018-02-14',
  };
  expect(setFilterOption(option)).toEqual({
    type: types.FILTER_OPTION,
    payload: option,
  });
});

