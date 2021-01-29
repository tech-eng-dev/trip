import { Dimensions } from 'react-native';

export const Width = Dimensions.get('window').width;
export const Height = Dimensions.get('window').height;
export const defaultSize = 375;
export const dySize = value => Math.round((Width * value) / defaultSize);
