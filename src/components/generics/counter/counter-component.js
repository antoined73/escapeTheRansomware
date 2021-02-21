import React, { useEffect, setTarget } from 'react';
import './counter-component.css';
import {
  Panel,
  Counter as C,
} from 'react95';

import anime from 'animejs/lib/anime.es.js';


const Counter = ({value=0, logo, minLength=4, digitSize='sm', color='red', animate=false, onClick}) => {

  let animTarget = React.createRef();

  useEffect(() => {
    if(animate){
      anime({
        targets: animTarget,
        opacity: '0.35',
        easing: 'linear',
        direction: 'alternate',
        loop: true,
        duration: 1000
      });
    }
  }, [])

  const digitSizeToWidthMap = {
    sm: 18,
    md: 30,
    lg: 50
  }

  return (
    <Panel onClick={onClick} variant='well' className="is-flex is-align-items-center p-1 mx-2 counter has-background-black is-clickable">
      <div ref={el => animTarget = el} className={`has-background-black innerCounter ${color}`}>
        <div className="counterWrapper">
          <C value={value} minLength={minLength} size={digitSize} className="counter95_override"/>
        </div>
        {logo && <img src={logo} className="counterLogo ml-1" style={{minWidth: digitSizeToWidthMap[digitSize] || null, width: digitSizeToWidthMap[digitSize] || null}}></img>}
      </div>
    </Panel>
  );
}

export default Counter;