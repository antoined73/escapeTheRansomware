import React, { useEffect, useState } from 'react';
import { WindowDisplayStatus } from '../../../utils/windows/display_status'
import {
  Window as W,
  WindowContent,
  WindowHeader,
  Button, 
  Panel,
  Cutout
} from 'react95';
import './window-component.css'
import { Rnd } from 'react-rnd';
import { useStoreState, useStoreActions } from 'easy-peasy';

const Window = ({id, 
  children, footerContent, 
  onClick, onClose, onMaximize, onMinimize
  }) => {

  const windows = useStoreState((state) => state.windows);
  const window = windows.byId[id];

  const isMaximized = window.status===WindowDisplayStatus.MAXIMIZED;
  const isMinimized = window.isMinimized;

  const currentHeight = isMaximized? "100%" : window.height;
  const currentWidth = isMaximized? "100%" : window.width;

  const posY = isMaximized? 0 : window.position.y;
  const posX = isMaximized? 0 : window.position.x;

  const { focusWindow_sa, moveWindow_sa, resizeWindow_sa, unmaximizeWindow_sa, maximizeWindow_sa, minimizeWindow_sa, deleteWindow_sa } = useStoreActions(actions => ({
    focusWindow_sa: actions.windows.focusWindow,
    moveWindow_sa: actions.windows.moveWindow,
    resizeWindow_sa: actions.windows.resizeWindow,
    unmaximizeWindow_sa : actions.windows.unmaximizeWindow,
    maximizeWindow_sa: actions.windows.maximizeWindow,
    minimizeWindow_sa: actions.windows.minimizeWindow,
    deleteWindow_sa: actions.windows.deleteWindow,
  }));

  const onButtonMinimize = () => {
    minimizeWindow_sa({id})
    onMinimize && onMinimize();
  }

  const onButtonMaximize = () => {
    if(isMaximized) unmaximizeWindow_sa({id});
    else maximizeWindow_sa({id});
    onMaximize && onMaximize();
  }

  const onButtonClose = () => {
    deleteWindow_sa({id});
    onClose && onClose();
  }

  const onWindowClick = (event) => {
    focusWindow_sa({id});
  }

  const moveWindow = (x, y) => {
    moveWindow_sa({id, position: {x, y} });
  };

  const resizeWindow = (w, h) => {
    resizeWindow_sa({id, width:w, height:h });
  }

  return (
    <Rnd
      size={{ width: currentWidth,  height: currentHeight }}
      position={{ x: posX, y: posY }}
      dragHandleClassName="window-header"
      onDragStop={(e, d) => { moveWindow(d.x, d.y) }}
      onDragStart={(e, d) => { onWindowClick(); }}
      onResizeStop={(e, direction, ref, delta, position) => {
        resizeWindow(ref.style.width, ref.style.height);
        moveWindow(position.x, position.y);
      }}
      minHeight={120}
      minWidth={120}
      disableDragging={isMaximized}
      enableResizing={!isMaximized && window.resizable}
    >
      <W onClick={onWindowClick} resizable={window.resizable} className='window' style={{ height: "100%", width: "100%", display: isMinimized && 'none'}}>
        <WindowHeader active={window.isFocused} className='window-header is-flex is-justify-content-space-between is-align-items-center'>
          <span className="windowTitle is-unselectable">{window.title}</span>
          <div className='is-flex is-justify-content-space-between is-align-items-center'>
            <Button onClick={onButtonMinimize}>
              <span className='minimize-icon'>&#9644;</span>
            </Button>
            <Button onClick={onButtonMaximize}>
              <span className='maximize-icon'>&#9723;</span>
            </Button>
            <Button onClick={onButtonClose}>
              <span className='close-icon'>&#10006;</span>
            </Button>
          </div>
        </WindowHeader>
        <WindowContent className="windowContent">
          <Cutout className="windowScroll">
            <div className="scrollContent">{children}</div>
          </Cutout>
        </WindowContent>
        {footerContent && <Panel variant='well' className='footer'>
          {footerContent}
        </Panel>}
      </W>
    </Rnd>
  );
}

export default Window;