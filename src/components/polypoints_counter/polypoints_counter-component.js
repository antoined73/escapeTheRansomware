import React, { Fragment } from 'react';
import Counter from '../generics/counter/counter-component';

import polypointLogo from '../../assets/images/polypoint-logo.png';

import { useStoreState } from 'easy-peasy';

const PolypointsCounter = () => {
  const polypoints = useStoreState((state) => state.polypoints);
  const ransom = useStoreState((state) => state.ransom);

  return (
    <Counter logo={polypointLogo} value={polypoints} color={ransom > polypoints ? 'red' : 'green'} animate={ransom <= polypoints}/>
  );
}

export default PolypointsCounter;