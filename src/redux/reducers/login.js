import createReducer from './createReducer';
import * as types from '../types';

export const greeting = createReducer('Hello', {
  [types.WELCOME](state, action) {
    return action.payload;
  },
});

export const myProfile = createReducer({}, {
  [types.SET_PROFILE](state, action) {
    return action.payload;
  },
});
