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
// import Rnd from 'react-rnd';

const Window = ({id, left, top, height=150, width=250, 
title="", children, footerContent, 
maximized=false, active=false, resizable=true,
onClose, onMaximize, onMinimize}) => {

  const [isMaximized, setIsMaximized] = useState(maximized);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const currentHeight = isMaximized? "100%" : height;
  const currentWidth = isMaximized? "100%" : width;

  const currentTop = isMaximized? 0 : top;
  const currentLeft = isMaximized? 0 : left;

  const onButtonMinimize = () => {
    setIsMinimized(true);
    onMinimize();
  }

  const onButtonMaximize = () => {
    setIsMaximized(!isMaximized);
    onMaximize();
  }

  const onButtonClose = () => {
    onClose();
  }

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    item: { id, left, top, type: "window"},
    previewOptions: {},
    canDrag: !isMaximized,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  return (
    <W ref={previewRef} resizable={resizable} className='window' style={{ height: currentHeight, width: currentWidth, position: 'absolute', top:currentTop, left:currentLeft, display: isMinimized||isClosed&& 'none'}}>
      <WindowHeader ref={dragRef} active={active} className='window-header is-flex is-justify-content-space-between is-align-items-center'>
        <span className="windowTitle">{title}</span>
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
  );
}

export default Window;