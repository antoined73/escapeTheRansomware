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
const initialState = {
  ransom: 9000,
  polypoints: getInitPolypoints()
}

const playerModel = {
  ...initialState,
  polypointsLeftToPayRansom: computed(state => Math.max(0, state.ransom-state.polypoints)),
  canPayRansom: computed(state => state.polypointsLeftToPayRansom  <= 0),
};

export default playerModel;