import { NavigationActions } from 'react-navigation';
import Toast from 'react-native-simple-toast';
import * as types from '../types';
import * as Server from '../../lib/server';


let currentRole = '';

export const saveUserProfile = profile => ({
  type: types.SET_PROFILE,
  payload: profile,
});

export const saveUsers = users => ({
  type: types.ALL_USERS,
  payload: users,
});

export const saveMyRecords = records => ({
  type: types.MY_RECORDS,
  payload: records,
});

export const saveAllRecords = records => ({
  type: types.ALL_RECORDS,
  payload: records,
});

export const saveBlockData = data => ({
  type: types.BLOCK_DATA,
  payload: data,
});

export const saveUserPhoto = (photo) => ({
  type: types.MY_PHOTO,
  payload: { uri: photo },
});

export const setFilterOption = (option) => ({
  type: types.FILTER_OPTION,
  payload: option,
});

export const fetchUsers = () => (dispatch) => {
  Server.getUsers((users) => {
    dispatch(saveUsers(users));
  });
};

export const fetchMyRecords = user => (dispatch) => {
  Server.getMyRecords(user, (records) => {
    dispatch(saveMyRecords(records));
  });
};

export const fetchAllRecords = () => (dispatch) => {
  Server.getAllRecords((records) => {
    dispatch(saveAllRecords(records));
  });
};

export const fetchBlockData = () => dispatch => {
  Server.getBlockData((data) => {
    dispatch(saveBlockData(data));
  });
};

export const logout = (navigation, msg) => dispatch => {
  Server.logout(() => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'login' }),
      ],
    });
    navigation.dispatch(resetAction);
    if (msg) Toast.show(msg, Toast.LONG);
  });
};

export const listenUserProfile = (navigation, Me) => dispatch => {
  currentRole = '';
  Server.getUserProfile(Me.uid, (user) => {
    dispatch(saveUserProfile(user));
    // set profile image
    dispatch(saveUserPhoto(user.photo));
    // detect role change or block state
    if (currentRole === '') currentRole = user.role;
    if (currentRole !== user.role) {
      dispatch(logout(navigation, 'Your role was changed by manager or admin just now. Please join again.'));
    } else if (user.blocked !== undefined && user.blocked === true) {
      dispatch(logout(navigation, 'Your account has been blocked by admin or manager.'));
    }
  });
};

