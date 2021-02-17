import React, { Fragment, useState } from 'react';
import Window from '../../components/generics/window/window-component'
import { useStoreState, useStoreActions } from 'easy-peasy';
import './windows-layout.css'

import { useDrop } from 'react-dnd';
const WindowsLayout = () => {
  const windows = useStoreState((state) => state.windows.displayedWindows);

  const { focusWindow_sa, moveWindow_sa, minimizeWindow_sa, unminimizeWindow_sa, deleteWindow_sa } = useStoreActions(actions => ({
    focusWindow_sa: actions.windows.focusWindow,
    moveWindow_sa: actions.windows.moveWindow,
    minimizeWindow_sa: actions.windows.minimizeWindow,
    unminimizeWindow_sa : actions.windows.unminimizeWindow,
    deleteWindow_sa: actions.windows.deleteWindow,
  }));

  const [, drop] = useDrop({
      accept: "window",
      drop(window, monitor) {
          const delta = monitor.getDifferenceFromInitialOffset();
          const left = Math.round(window.x + delta.x);
          const top = Math.round(window.y + delta.y);
          moveWindow(window.id, left, top);
          return undefined;
      },
  });

  const moveWindow = (id, left, top) => {
    moveWindow_sa({id:id, position: {x:left, y:top} });
  };

  const focusWindow = (id) => {
    focusWindow_sa({id});
  };

  const minimizeWindow = (id) => {
    minimizeWindow_sa({id});
  }

  const deleteWindow = (id) => {
    deleteWindow_sa({id});
  }

  const displayWindows = () => {
    return windows.map(window => {
      const { position, height, width, title, id, focused, status } = window;
      console.log(status)
      return (
        <Window key={id} id={id} title={title} 
        position={position} height={height} width={width} 
        maximized={status==="maximized"} active={focused}
        onClick={() => { focusWindow(id); }}
        onClose={() => { deleteWindow(id); }} 
        onMinimize={() => { minimizeWindow(id); }} 
        onMaximize={ () => { focusWindow(id); } }>
          :)
        </Window>
      );
    });
  }

  return (
    <div className="windowsLayout is-flex" ref={drop}>
      {displayWindows()}
    </div>
  );
}

export default WindowsLayout;