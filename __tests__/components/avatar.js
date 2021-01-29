import React from 'react';
import renderer from 'react-test-renderer';
import Avatar from '../../src/components/avatar';


test('Avatar renders correctly', () => {
  const avatar = renderer.create(<Avatar
    width={60}
    userId="7MnU3xgql7O5RduyY2TpNig4KtA2"
    image={undefined}
    blocked
  />).toJSON();
  expect(avatar).toMatchSnapshot();
});
