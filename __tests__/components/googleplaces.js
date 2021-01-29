import React from 'react';
import renderer from 'react-test-renderer';
import GooglePlacePicker from '../../src/components/googleplaces';


test('GooglePlacePicker renders correctly', () => {
  const googlePicker = renderer.create(<GooglePlacePicker
    onPress={() => {}}
    width={300}
    defaultValue="2018-02-14"
  />).toJSON();
  expect(googlePicker).toMatchSnapshot();
});
