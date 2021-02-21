import React, { useEffect, useState } from 'react';
import {
  Window as W,
  WindowContent,
  WindowHeader,
  Button, 
  Panel,
  Cutout
} from 'react95';
import { useStoreState, useStoreActions } from 'easy-peasy';
import PolypointsCounter from '../polypoints_counter/polypoints_counter-component';
import { Screens } from '../../utils/screens/screen-utils'
const PolpointsWC = ({id}) => {

  const polypointsLeftToPayRansom = useStoreState((state) => state.player.polypointsLeftToPayRansom);
  const canPayRansom = useStoreState((state) => state.player.canPayRansom);

  
  const { openScreen_sa } = useStoreActions(actions => ({
    openScreen_sa: actions.screens.openScreen
  }));
  const openEndScreen = () => {
    openScreen_sa({id: Screens.PAY_RANSOM_ENDING})
  }

  return (
    <div className="is-flex is-flex-direction-column">
      <div className="is-flex is-size-3 has-text-centered is-align-items-center is-justify-content-center">
        Your Polypoints wallet is up to
      </div>
      <div className="is-flex mt-3 is-justify-content-center">
        <PolypointsCounter size={"lg"}/>
      </div>
      <div className="is-flex mt-5 is-size-4 has-text-centered is-align-items-center is-justify-content-center">
        You need
      </div>
      <div className="is-flex is-size-1 has-text-centered has-text-weight-bold is-align-items-center is-justify-content-center">
        {polypointsLeftToPayRansom}
      </div>
      <div className="is-flex is-size-4 has-text-centered is-align-items-center is-justify-content-center">
        more polypoints to get all your files back.
      </div>
      <div className="is-flex mt-5 has-text-centered is-align-items-center is-justify-content-center">
        <Button size='lg' disabled={!canPayRansom} onClick={openEndScreen}>Pay and get my files back</Button>
      </div>
    </div>
  );
}

export default PolpointsWC;