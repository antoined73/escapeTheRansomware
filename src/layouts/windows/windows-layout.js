import React, { Fragment, useState } from 'react';
import Window from '../../components/generics/window/window-component'
import { useStoreState, useStoreActions } from 'easy-peasy';
import './windows-layout.css'

const WindowsLayout = () => {
  const windows = useStoreState((state) => state.windows.displayedWindows);

  const displayWindows = () => {
    return windows.map(window => {
      const { position, height, width, title, id, focused, status } = window;
      return (
        <Window key={id} id={id} title={title} 
        position={position} height={height} width={width} 
        maximized={status==="maximized"} active={focused}>
          :)
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