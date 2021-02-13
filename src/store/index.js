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
const initialState = {
  ransom: 9000,
  polypoints: getInitPolypoints()
}

const store = createStore({
  ...initialState
});

export default store;
