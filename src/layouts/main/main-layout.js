import React, { Fragment, useState } from 'react';
import TaskBar from '../../components/taskbar/taskbar-component';
import './main-layout.css'
import WindowsLayout from '../windows/windows-layout'

import { useDrop } from 'react-dnd';
const MainLayout = ({children}) => {
  const taskBarHeight = 48;

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

  return (
    <div className="mainLayout is-flex">
      <div className="mainScreen" style={{marginBottom: taskBarHeight}}>
        {/* {displayGrid(10,15)} */}
        <WindowsLayout/>
      </div>
      <TaskBar height={taskBarHeight}/>
    </div>
  );
}

export default MainLayout;