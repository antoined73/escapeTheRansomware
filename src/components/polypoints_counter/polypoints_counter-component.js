import React, { Fragment } from 'react';
import Counter from '../generics/counter/counter-component';

import polypointLogo from '../../assets/images/polypoint-logo.png';

import { useStoreState } from 'easy-peasy';

const PolypointsCounter = ({onClick}) => {
  const polypoints = useStoreState((state) => state.player.polypoints);
  const ransom = useStoreState((state) => state.player.ransom);

  return (
    <Counter onClick={onClick} logo={polypointLogo} value={polypoints} color={ransom > polypoints ? 'red' : 'green'} animate={ransom <= polypoints}/>
  );
}

export default PolypointsCounter;