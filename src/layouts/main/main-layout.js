import React, { Fragment, useState } from 'react';
import TaskBar from '../../components/taskbar/taskbar-component';
import './main-layout.css'
import WindowsLayout from '../windows/windows-layout'
import PayRansomEndingLayout from '../screens/pay_ransom_ending-layout'
import { useStoreState } from 'easy-peasy';
import { Screens } from "../../utils/screens/screen-utils";

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

  const screenIdToComponentMap = {};
  screenIdToComponentMap[Screens.LOGIN] = <div>LOGIN</div>;
  screenIdToComponentMap[Screens.PAY_RANSOM_ENDING] = <PayRansomEndingLayout/>;
  const displayedScreen = useStoreState(store => store.screens.displayedScreen);
  const fullscreenViews = () => {
    console.log(displayedScreen)
    return (
      displayedScreen && <div className="fullscreenLayout is-flex">
      {screenIdToComponentMap[displayedScreen.id]}
    </div>
    );
  }

  const desktopView = () => {
    return (
    <div className="mainLayout is-flex">
      <div className="mainScreen" style={{marginBottom: taskBarHeight}}>
        <WindowsLayout/>
      </div>
      <TaskBar height={taskBarHeight}/>
    </div>
    );
  }

  return (
    <>
      {desktopView()}
      {fullscreenViews()}
    </>
  );
}

export default MainLayout;