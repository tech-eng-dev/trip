import createReducer from './createReducer';
import * as types from '../types';

const personImage = require('../../resources/images/person.png');

export const allUsers = createReducer({}, {
  [types.ALL_USERS](state, action) {
    return action.payload;
  },
});

export const myRecords = createReducer({}, {
  [types.MY_RECORDS](state, action) {
    return action.payload;
  },
});

export const allRecords = createReducer([], {
  [types.ALL_RECORDS](state, action) {
    return action.payload;
  },
});

export const blockData = createReducer({}, {
  [types.BLOCK_DATA](state, action) {
    return action.payload;
  },
});

export const myPhoto = createReducer(personImage, {
  [types.MY_PHOTO](state, action) {
    return action.payload;
  },
});

export const filterOption = createReducer({}, {
  [types.FILTER_OPTION](state, action) {
    return action.payload;
  },
});
