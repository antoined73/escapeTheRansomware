import React, { Fragment, useState } from 'react';
import Window from '../../components/generics/window/window-component'
import { useStoreState, useStoreActions } from 'easy-peasy';
import './windows-layout.css'
import PolpointsWC from '../../components/window_contents/polypoints_wc-component'
import { Programs } from '../../utils/windows/program-utils'
import Login from '../../components/login/login-component';

const WindowsLayout = () => {
  const windows = useStoreState((state) => state.windows.displayedWindows);

  const programIdToContentComponentMap = {};
  programIdToContentComponentMap[Programs.EMPTY] = <div>:)</div>;
  programIdToContentComponentMap[Programs.POLYPOINTS] = <PolpointsWC/>;
  programIdToContentComponentMap[Programs.LOGIN] = <Login/>;

  const displayWindows = () => {
    return windows.map(window => {
      const { id, programId } = window;
      const WindowContent = programIdToContentComponentMap[programId];
      return (
        <Window key={id} id={id}>
          <WindowContent.type {...WindowContent.props} {...{windowId:id}} />;
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