import React, { Fragment } from 'react';
import './counter-component.css';
import {
  Panel
} from 'react95';
import {
  Counter as C,
} from 'react95';

const Counter = ({value=0, logo, minLength=4, digitSize='sm'}) => {

  return (
    <Panel variant='well' className="is-flex is-align-items-center p-1 mx-2 has-background-black counter">
      <div className="counterWrapper">
        <C value={value} minLength={minLength} size={digitSize} className="counter95_override"/>
      </div>
      {logo && <img src={logo} className="counterLogo ml-1"></img>}
    </Panel>
  );
}

export default Counter;