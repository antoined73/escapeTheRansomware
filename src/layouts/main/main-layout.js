import React, { Fragment } from 'react';
import TaskBar from '../../components/taskbar/taskbar-component';
import './main-layout.css'
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
  return (
    <Fragment>
      <div className="mainScreen">
        {displayGrid(10,15)}
      </div>
      <TaskBar/>
    </Fragment>
  );
}

export default MainLayout;