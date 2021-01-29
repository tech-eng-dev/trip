import React from 'react';
import renderer from 'react-test-renderer';
import CustomButton from '../../src/components/button';


test('CustomButton renders correctly', () => {
  const button = renderer.create(<CustomButton
    text="test"
    testID="test"
    onPress={() => {}}
    backgroundColor="black"
  />).toJSON();
  expect(button).toMatchSnapshot();
});
