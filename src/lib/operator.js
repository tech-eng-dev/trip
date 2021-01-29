const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const FullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const getDateWithFormat = (TS) => {
  const date = new Date(TS);
  return `${date.getFullYear()}-${date.getMonth() < 9 ? '0' : ''}${date.getMonth() + 1}-${date.getDate() < 10 ? '0' : ''}${date.getDate()}`;
};

export const encodeEmail = email => encodeURI(email.toLowerCase()).replace(/\./g, '%2E');

export const getRTime = (strDate, callback) => {
  const array = strDate.split('-');
  const dataString = `${array[1]}/${array[2]}/${array[0]}`;
  const date = new Date(dataString).getTime();
  const CT = new Date().getTime();
  callback(date - CT);
};

export const getRTimeFormat = (TSO) => {
  if (TSO < 1000) return 'On Trip';
  const s = 1000;
  const m = 60 * s;
  const h = 60 * m;
  const d = 24 * h;
  const Vd = Math.floor(TSO / d);
  const Vh = Math.floor((TSO % d) / h);
  const Vm = Math.floor((TSO % h) / m);
  const Vs = Math.floor((TSO % m) / s);
  const Sd = Vd > 0 ? (`${Vd}d `) : '';
  const Sh = (Vh > 0) ? `${Vh < 10 ? (`0${Vh}`) : Vh}h ` : (Vd > 0 ? '00h ' : '');
  const Sm = (Vm > 0) ? `${Vm < 10 ? (`0${Vm}`) : Vm}m ` : ((Vd > 0 || Vh > 0) ? '00m ' : '');
  const Ss = (Vs > 0) ? `${Vs < 10 ? (`0${Vs}`) : Vs}s` : '00s';
  return Sd + Sh + Sm + Ss;
};

export const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const checkValidation = (fName, lName, email, password, confirm, callback) => {
  if (fName.replace(/ /g, '').length === 0) {
    return 'First name is invalid';
  } else if (lName.replace(/ /g, '').length === 0) {
    return 'Last name is invalid';
  } else if (!validateEmail(email)) {
    return 'Email address is invalid';
  } else if (password.length < 6) {
    return 'Password must be 6 length at least.';
  } else if (password !== confirm) {
    return 'Confirm password is incorrect';
  }
  return 'success';
};

export const getMonthString = (index, isFullName) => {
  if (isFullName) return FullMonths[index];
  return Months[index];
};
