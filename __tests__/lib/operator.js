import {
  getDateWithFormat,
  encodeEmail,
  getRTime,
  getRTimeFormat,
  checkValidation,
  validateEmail,
  getMonthString,
} from '../../src/lib/operator';

test('Convert date to required data format', () => {
  const ts = 1518465165414;
  expect(getDateWithFormat(ts)).toEqual('2018-02-13');
});

test('Convert email to validate key string', () => {
  const email = 'litian19901120@gmail.com';
  expect(encodeEmail(email)).toEqual('litian19901120@gmail%2Ecom');
});

test('Convert date to required data format', () => {
  const ts = '2018-01-01';
  function callback(result) {
    expect(result).toBeLessThan((-1) * 86400 * 1000 * 40);
  }
  getRTime(ts, callback);
});

test('Convert time offset to remaining time', () => {
  const ts = 15056000;
  expect(getRTimeFormat(ts)).toEqual('04h 10m 56s');
});

test('Email Validation', () => {
  const email = 'litian@.com';
  expect(validateEmail(email)).toEqual(false);
});

test('Check Signup Input Validation', () => {
  const caseArray = [
    {
      fName: '',
      lName: 'Li',
      email: 'litian19901120@gmail.com',
      password: '123456',
      confirm: '123456',
    },
    {
      fName: 'Tian',
      lName: '',
      email: 'litian19901120@gmail.com',
      password: '123456',
      confirm: '123456',
    },
    {
      fName: 'Tian',
      lName: 'Li',
      email: 'litian19901120@.com',
      password: '123456',
      confirm: '123456',
    },
    {
      fName: 'Tian',
      lName: 'Li',
      email: 'litian19901120@gmail.com',
      password: '123',
      confirm: '123456',
    },
    {
      fName: 'Tian',
      lName: 'Li',
      email: 'litian19901120@gmail.com',
      password: '123456',
      confirm: '1234567',
    },
  ];
  const resultArray = [
    'First name is invalid',
    'Last name is invalid',
    'Email address is invalid',
    'Password must be 6 length at least.',
    'Confirm password is incorrect',
  ];
  caseArray.map((c, index) => {
    expect(checkValidation(c.fName, c.lName, c.email, c.password, c.confirm))
      .toEqual(resultArray[index]);
    return true;
  });
});

test('Email Validation', () => {
  const caseArray = [
    {
      month: 3,
      isFullName: true,
    },
    {
      month: 3,
      isFullName: false,
    },
  ];
  const resultArray = [
    'April',
    'Apr',
  ];
  caseArray.map((c, index) => {
    expect(getMonthString(c.month, c.isFullName))
      .toEqual(resultArray[index]);
    return true;
  });
});

