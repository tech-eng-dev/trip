import RNFirebase from 'react-native-firebase';

const configurationOptions = {
  apiKey: 'AIzaSyDL_X_658s6oqIyIkg9rpngtcFj8hHPRhM',
  authDomain: 'trip-b003c.firebaseapp.com',
  databaseURL: 'https://trip-b003c.firebaseio.com',
  projectId: 'trip-b003c',
  storageBucket: 'trip-b003c.appspot.com',
  messagingSenderId: '327109997105',
};

const firebase = RNFirebase.initializeApp(configurationOptions);

export default firebase;
