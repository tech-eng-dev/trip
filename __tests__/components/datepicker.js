import React from 'react';
import renderer from 'react-test-renderer';
import CustomDatePicker from '../../src/components/datepicker';


test('DatePicker renders correctly', () => {
  const datePicker = renderer.create(<CustomDatePicker
    onSelect={() => {}}
    placeholder=""
    date="2018-02-14"
    mode="date"
    future
    front="From"
  />).toJSON();
  expect(datePicker).toMatchSnapshot();
});
