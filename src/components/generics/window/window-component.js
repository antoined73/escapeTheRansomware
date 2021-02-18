import React, { useEffect, useState } from 'react';
import {
  Window as W,
  WindowContent,
  WindowHeader,
  Button, 
  Panel,
  Cutout
} from 'react95';
import './window-component.css'
import { useDrag } from 'react-dnd'
import { Rnd } from 'react-rnd';
import { useStoreState, useStoreActions } from 'easy-peasy';

const Window = ({
  id, 
  position, height=150, width=250, 
  title="", children, footerContent, 
  maximized=false, active=false, resizable=true,
  onClick, onClose, onMaximize, onMinimize
  }) => {

  const [isMaximized, setIsMaximized] = useState(maximized);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const currentHeight = isMaximized? "100%" : height;
  const currentWidth = isMaximized? "100%" : width;

  const posY = isMaximized? 0 : position.y;
  const posX = isMaximized? 0 : position.x;

  const onButtonMinimize = () => {
    setIsMinimized(true);
    onMinimize();
  }

  const onButtonMaximize = () => {
    setIsMaximized(!isMaximized);
    if(isMaximized) unmaximizeWindow_sa({id});
    else maximizeWindow_sa({id});
    onMaximize();
  }

  const onButtonClose = () => {
    setIsClosed(true);
    onClose();
  }

  const { focusWindow_sa, moveWindow_sa, resizeWindow_sa, unmaximizeWindow_sa, maximizeWindow_sa } = useStoreActions(actions => ({
    focusWindow_sa: actions.windows.focusWindow,
    moveWindow_sa: actions.windows.moveWindow,
    resizeWindow_sa: actions.windows.resizeWindow,
    unmaximizeWindow_sa : actions.windows.unmaximizeWindow,
    maximizeWindow_sa: actions.windows.maximizeWindow,
  }));

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
      onDragStart={(e, d) => { onClick(); }}
      onResizeStop={(e, direction, ref, delta, position) => {
        resizeWindow(ref.style.width, ref.style.height);
        moveWindow(position.x, position.y);
      }}
      minHeight={120}
      minWidth={120}
      disableDragging={maximized}
      enableResizing={!maximized}
    >
      <W onClick={onClick} resizable={resizable} className='window' style={{ height: "100%", width: "100%", display: isMinimized||isClosed&& 'none'}}>
        <WindowHeader active={active} className='window-header is-flex is-justify-content-space-between is-align-items-center'>
          <span className="windowTitle is-unselectable">{title}</span>
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