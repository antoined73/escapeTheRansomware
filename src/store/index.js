import { createStore, action, thunk } from 'easy-peasy';
import Cookies from 'js-cookie';

const getInitPolypoints = () => {
  let result = Cookies.get('polypoints');
  if(result) return parseInt(result);
  else {
    Cookies.set('polypoints', 0);
    return 0;
  }
}

const getInitLogin = () => {
  let result = Cookies.get('login');
  if(result) return result;
  else {
    Cookies.set('login', '');
    return '';
  }
}

const getInitPassword = () => {
  let result = Cookies.get('password');
  if(result) return result;
  else {
    Cookies.set('password', '');
    return '';
  }
}

const initialState = {
  ransom: 9000,
  polypoints: getInitPolypoints(),
  login: getInitLogin(),
  password: getInitPassword()
}

const store = createStore({
  ...initialState
});

export default store;
