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

const playerModel = {
  ...initialState
};

export default playerModel;