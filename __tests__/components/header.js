import React from 'react';
import renderer from 'react-test-renderer';
import CustomHeader from '../../src/components/header';


test('Header renders correctly', () => {
  const header = renderer.create(<CustomHeader
    onPressLeft={() => {}}
    onPressRight={() => {}}
    left="ios-arrow-back"
    right="md-add"
    title="Title"
    backgroundColor="black"
  />).toJSON();
  expect(header).toMatchSnapshot();
});
