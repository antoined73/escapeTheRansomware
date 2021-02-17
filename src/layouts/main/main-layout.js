import React, { Fragment, useState } from 'react';
import TaskBar from '../../components/taskbar/taskbar-component';
import './main-layout.css'
import Window from '../../components/generics/window/window-component'
import Login from '../../components/login/login-component'

import { useDrop } from 'react-dnd';
const MainLayout = ({children}) => {

  const line = (lineId, columnsNumber, lineHeight) => {
    const columns = [];
    for (let colId = 0; colId < columnsNumber; colId++) {
      columns.push(<div className="column" id={lineId+'.'+colId} key={lineId+'.'+colId} style={{height: `${lineHeight}vh`}}>{lineId+1 +'.'+ (colId+1)}</div>);
    }
    return (
      <div className="columns" key={lineId}>
        {columns}
      </div>
    );
  }

  const displayGrid = (lines, columns) => {
    const result = [];
    const taskBarSizeInVh = 6;
    for (let lineId = 0; lineId < lines; lineId++) {
      result.push(line(lineId, columns, ((100-taskBarSizeInVh)/lines)));
    }
    return result;
  }

  const taskBarHeight = 48;

  const [windows, setWindows] = useState([
    { id: 0, top: 20, left: 80, height: 500, width: 450, title: 'Drag me around', status: "maximized", focused: false },
    { id: 1, top: 180, left: 80, height: 250, width: 200, title: 'Drag me too',  status: "free", focused: false },
    { id: 2, top: 180, left: 400, height: 500, width: 450, title: 'Drag me too 1',  status: "free", focused: false },
    { id: 3, top: 50, left: 20, height: 150, width: 600, title: 'Drag me too 2',  status: "free", focused: false },
    { id: 4, top: 180, left: 600, height: 500, width: 450, title: 'Drag me too 3',  status: "free", focused: false },
    { id: 5, top: 500, left: 20, height: 500, width: 450, title: 'Drag me too 4',  status: "free", focused: false },
    { id: 6, top: 800, left: 50, height: 500, width: 450, title: 'Drag me too 5',  status: "free", focused: true },
  ]);

  const [, drop] = useDrop({
      accept: "window",
      drop(item, monitor) {
          const delta = monitor.getDifferenceFromInitialOffset();
          const left = Math.round(item.left + delta.x);
          const top = Math.round(item.top + delta.y);
          moveWindow(item.id, left, top);
          return undefined;
      },
  });

  const moveWindow = (id, left, top) => {
    const newWindows = [ ...windows ];
    let windowToMove = newWindows.find(w => w.id === id);
    windowToMove.left = left;
    windowToMove.top= top;
    setWindows(newWindows);
    setWindowFocused(id);
  };

  const setWindowFocused = (id) => {
    const newWindows = [ ...windows.map(w => { w.focused = false; return w; }) ];
    const windowToMove = newWindows.find(w => w.id === id);
    windowToMove.focused = true;
    const index = newWindows.indexOf(windowToMove);
    if(index != newWindows.length-1) {
      newWindows.push(newWindows.splice(index, 1)[0]);
    }
    setWindows(newWindows);
  };

  const minimizeWindow = (id) => {

  }

  const deleteWindow = (id) => {
    const newWindows = [ ...windows.filter(w => w.id != id) ];
    setWindows(newWindows);
  }

  return (
    <div className="mainLayout is-flex">
      <div className="mainScreen" style={{marginBottom: taskBarHeight}} ref={drop}>
        {/* {displayGrid(10,15)} */}
        {windows.map(window => {
          const { left, top, height, width, title, id, focused, status } = window;

          return (
            <div>
            <Login></Login>
            <Window key={id} id={id} title={title} left={left} top={top} height={height} width={width} maximized={status=="maximized"} active={focused} onClose={() => {deleteWindow(id);}} onMinimize={() => {minimizeWindow(id); }} onMaximize={ () => { setWindowFocused(id); } }>hello</Window>
            </div>
          );
        })}
      </div>
      <TaskBar height={taskBarHeight} windows={windows}/>
    </div>
  );
}

export default MainLayout;