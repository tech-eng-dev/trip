import Toast from 'react-native-simple-toast';
import * as types from '../types';


export const welcome = () => ({
  type: types.WELCOME,
  payload: 'App Started',
});

export const showToast = (text) => dipatch => {
  Toast.show(text, Toast.LONG);
};

