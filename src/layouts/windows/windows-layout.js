import React, { Fragment, useState } from 'react';
import Window from '../../components/generics/window/window-component'
import { useStoreState, useStoreActions } from 'easy-peasy';
import './windows-layout.css'
import PolpointsWC from '../../components/window_contents/polypoints_wc-component'
import { Programs } from '../../utils/program-utils'

const WindowsLayout = () => {
  const windows = useStoreState((state) => state.windows.displayedWindows);

  const programIdToContentComponentMap = {};
  programIdToContentComponentMap[Programs.EMPTY] = <div>:)</div>;
  programIdToContentComponentMap[Programs.POLYPOINTS] = <PolpointsWC/>;

  const displayWindows = () => {
    return windows.map(window => {
      const { id, programId } = window;
      return (
        <Window key={id} id={id}>
          {programIdToContentComponentMap[programId]}
        </Window>
      );
    });
  }

  return (
    <div className="windowsLayout is-flex">
      {displayWindows()}
    </div>
  );
}

export default WindowsLayout;