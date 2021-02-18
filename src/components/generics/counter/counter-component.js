import React from 'react';
import './counter-component.css';
import {
  Panel,
  Counter as C,
} from 'react95';

import anime from 'animejs/lib/anime.es.js';

const Counter = ({value=0, logo, minLength=4, digitSize='sm', color='red', animate=false, onClick}) => {

  if(animate){
    anime({
      targets: '.innerCounter',
      opacity: '0.35',
      easing: 'linear',
      direction: 'alternate',
      loop: true,
      duration: 1000
    });
  }

  return (
    <Panel onClick={onClick} variant='well' className="is-flex is-align-items-center p-1 mx-2 counter has-background-black is-clickable">
      <div className={`has-background-black innerCounter ${color}`}>
        <div className="counterWrapper">
          <C value={value} minLength={minLength} size={digitSize} className="counter95_override"/>
        </div>
        {logo && <img src={logo} className="counterLogo ml-1"></img>}
      </div>
    </Panel>
  );
}

export default Counter;