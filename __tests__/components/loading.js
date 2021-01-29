import React from 'react';
import renderer from 'react-test-renderer';
import CustomLoadingView from '../../src/components/loading';


test('LoadingView renders correctly', () => {
  const loadingView = renderer.create(<CustomLoadingView
    visible={false}
  />).toJSON();
  expect(loadingView).toMatchSnapshot();
});
