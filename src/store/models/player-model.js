import { computed } from 'easy-peasy';
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

const getIsLogged = () => {
  let result = Cookies.get('isLogged');
  if(result) return result;
  else {
    Cookies.set('isLogged', '');
    return '';
  }
}

const initialState = {
  ransom: 9000,
  polypoints: getInitPolypoints(),
  login: getInitLogin(),
  password: getInitPassword(),
  isLogged: getIsLogged()
}

const playerModel = {
  ...initialState,
  polypointsLeftToPayRansom: computed(state => Math.max(0, state.ransom-state.polypoints)),
  canPayRansom: computed(state => state.polypointsLeftToPayRansom  <= 0),
};

export default playerModel;