import React from 'react';
import renderer from 'react-test-renderer';
import navigation from 'react-navigation';
import ManagerEditUser from '../../../src/screens/Manager/edit_user';


test('ManagerEditUser component renders correctly', () => {
  const avatar = renderer.create(<ManagerEditUser
    navigation={navigation}
  />).toJSON();
  expect(avatar).toMatchSnapshot();
});
