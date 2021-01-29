import React from 'react';
import renderer from 'react-test-renderer';
import CustomInput from '../../src/components/textInput';


test('CustomInput renders correctly', () => {
  const textInput = renderer.create(<CustomInput
    placeholder="test"
    text="test"
    testID="test"
    onChange={() => {}}
    multiline
    width={200}
    keyboardType="default"
    secureTextEntry
    autoCapitalize="WORD"
    border
  />).toJSON();
  expect(textInput).toMatchSnapshot();
});
