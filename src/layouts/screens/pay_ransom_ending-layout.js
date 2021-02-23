import React, { Fragment, useEffect } from 'react';
import anime from 'animejs/lib/anime.es.js';
import pirateImage from '../../assets/images/pirate_uni.png'
import laughingImage from '../../assets/images/laughing.png'
import laughingSound from '../../assets/sounds/evil_laugh.mp3'

const PayRansomEndingLayout = ({children}) => {
  
  let text1 = React.createRef();
  let text2 = React.createRef();
  let pirateImg = React.createRef();
  let laughImg = React.createRef();
  let finalImg = React.createRef();
  let mainContent = React.createRef();

  useEffect(() => {
    var evil_laughAudio = new Audio(laughingSound);

    var elements = [pirateImg, text1, text2, laughImg]
    var tl = anime.timeline();
    tl
    .add({
      targets: elements,
      opacity: 1,
      delay: anime.stagger(2000, {start: 0})
    })
    .add({
      targets: [finalImg],
      scale: 50,
      translateX: {
        value: 100,
        duration: 5000,
        easing: 'easeInOutQuad',
      },
      translateY: {
        value: -50,
        duration: 5000,
        easing: 'easeInOutQuad',
      },
      duration: 20000,
      easing: 'easeInOutQuad',
      begin: function(anim) {
        evil_laughAudio.play();
      },
    })

    anime({
      targets: mainContent,
      opacity: 0,
      delay: 6000,
      duration: 10000,
      easing: 'linear'
    })
    
    
  }, [])

  return (
    <div style={{width: "100%", height: "100%"}} className="has-background-black has-text-centered is-flex is-flex-direction-column is-justify-content-center is-align-content-center">
      <div style={{width: "100%", height: "100%"}} ref={el => mainContent = el} className="has-background-black has-text-centered is-flex is-flex-direction-column is-justify-content-center is-align-content-center">
        <div ref={el => finalImg = el} style={{position: 'relative'}}>
          <img ref={el => pirateImg = el} style={{opacity:0, height: 500, width: 'auto',}} src={pirateImage}></img>
          <img ref={el => laughImg = el} style={{opacity:0, height: 100, width: 'auto', position: 'absolute', top: 250, left: 'calc(50% - 150px)' }} src={laughingImage}></img>
        </div>
        <h1 ref={el => text1 = el} style={{opacity:0}} className="is-size-1 has-text-white">Thank you for your monney</h1>
        <h1 ref={el => text2 = el} style={{opacity:0}} className="is-size-1 has-text-white has-text-weight-bold has-text-danger">Dummy.</h1>
      </div>
    </div>
  );
}

export default PayRansomEndingLayout;