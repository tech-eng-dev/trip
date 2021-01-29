import {
  updateUserProfile,
  getProfileImage,
  getUserProfile,
  addTrip,
  authUserEmailPassword,
  getMyRecords,
  getAllRecords,
  editTrip,
  deleteTrip,
  changePhoto,
  logout,
  getUsers,
  getBlockData,
  blockUser,
  unblockUser,
} from '../../src/lib/server';

test('Get Profile data when login/signup using Facebook and Google', () => {
  const param = {
    uid: 'VZx9D1IMIdT0gXCtsh2mymcXawd2',
    email: 'litian19901120@gmail.com',
    displayName: 'Tian Li',
  };
  function callback(result) {
    expect(result.role).not.toBe(undefined);
  }
  updateUserProfile(param, '', callback);
});

test('Get User Profile with userId', () => {
  function callback(result) {
    expect(Object.keys(result)).toContain('role');
    expect(Object.keys(result)).toContain('email');
    expect(Object.keys(result)).toContain('name');
    expect(Object.keys(result)).toContain('photo');
    expect(Object.keys(result)).toContain('uid');
  }
  getUserProfile('VZx9D1IMIdT0gXCtsh2mymcXawd2', callback);
});

test('Get Profile Image with userId', () => {
  function callback(url) {
    expect(url).toContain('');
  }
  getProfileImage('VZx9D1IMIdT0gXCtsh2mymcXawd2', callback);
});

test('Email/Password Authentication', () => {
  const param = {
    email: 'litian19901120@gmail.com',
    password: '123456',
    fName: 'Tian',
    lName: 'Li',
  };
  function loginCallback(status, currentUser, profile) {
    expect(status).toEqual('success');
  }
  function signUpCallback(status, currentUser, profile) {
    expect(status).toEqual('error');
  }
  authUserEmailPassword(param, 'login', loginCallback);
  authUserEmailPassword(param, 'signup', signUpCallback);
});

test('Get Users own Trip data', () => {
  const param = {
    uid: 'VZx9D1IMIdT0gXCtsh2mymcXawd2',
  };
  function callback(records) {
    Object.keys(records).map((time) => {
      expect(Object.keys(records[time])).toContain('comment');
      expect(Object.keys(records[time])).toContain('createdTime');
      expect(Object.keys(records[time])).toContain('endDate');
      expect(Object.keys(records[time])).toContain('location');
      expect(Object.keys(records[time])).toContain('startDate');
      expect(Object.keys(records[time])).toContain('userId');
      return true;
    });
  }
  getMyRecords(param, callback);
});

test('Get All Users Trip data', () => {
  function callback(records) {
    Object.keys(records).map((key) => {
      expect(key.length).toEqual(28);
      return true;
    });
  }
  getAllRecords(callback);
});

test('Add/Edit/Delete Trip', () => {
  const param = {
    userId: 'VZx9D1IMIdT0gXCtsh2mymcXawd2',
    location: {
      description: 'Test',
      geometry: {},
      id: 'Test',
    },
    startDate: '2018-02-04',
    endDate: '2018-02-25',
    comment: 'Test',
    createdTime: '123456789',
  };
  function callback(result) {
    expect(result).toEqual('success');
  }
  editTrip(param, callback);
  addTrip(param, callback);
  deleteTrip(param, callback);
});

test('Change Photo Image', () => {
  const image = { uri: 'Image URL' };
  const fileName = 'Test';
  const Me = {
    blocked: false,
    email: 'litian19901120@gmail.com',
    name: 'Tian Li',
    photo: '',
    role: 'User',
    uid: 'VZx9D1IMIdT0gXCtsh2mymcXawd2',
  };
  function callback(result) {
    expect(result).toEqual('success');
  }
  changePhoto(image, fileName, Me, callback);
});

test('Change Photo Image', () => {
  function callback(result) {
    expect(result).toEqual('success');
  }
  logout(callback);
});

test('Get All Users Profile data', () => {
  function callback(records) {
    Object.keys(records).map((key) => {
      expect(key.length).toEqual(28);
      return true;
    });
  }
  getUsers(callback);
});

test('Get All Blocked data', () => {
  function callback(records) {
    Object.keys(records).map((key) => {
      expect(key.indexOf('@')).toBeGreaterThan(0);
      return true;
    });
  }
  getBlockData(callback);
});

test('Block/Unblock User', () => {
  const user = {
    email: 'litian19901120@gmail.com',
    uid: 'VZx9D1IMIdT0gXCtsh2mymcXawd2',
  };
  expect(blockUser(user)).toEqual('success');
  expect(unblockUser(user)).toEqual('success');
});
