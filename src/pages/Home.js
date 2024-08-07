import React, { useState, useEffect } from 'react';
import './Home.css';
import NormalDistribution from '../components/NormalDistribution';
import * as THREE from 'three';
import GLOBE from 'vanta/dist/vanta.globe.min';
import '../components/NormalDistribution.css'

const Home = () => {
  const [showDistribution, setShowDistribution] = useState(false);
  const [snarkyMessage, setSnarkyMessage] = useState('');
  const [resetAnimation, setResetAnimation] = useState(false);
  const [vantaEffect, setVantaEffect] = useState(0);
  const [showText, setShowText] = useState(false);
  const [textIndex, setTextIndex] = useState(0);

  const explanationText = 
    "the galton board, also known as a quincunx, is a device invented by sir Francis Galton to demonstrate the central limit theorem. " +
    "it consists of a vertical board with interleaved rows of pegs. pellets are dropped from the top and bounce randomly left or right " +
    "as they hit the pegs, eventually collecting into bins at the bottom, forming a bell curve distribution. \n \n also, hi! i'm vayd, " +
    "a recent MIT grad, and this is my website! i occasionally update the widget to the right, so stay tuned (or don't, that's good too, " +
    "live your life fellow human)! i also host my blog (currently migrating it over) on this website, where i ramble about many things " +
    "that i believe make me an interesting person.";
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(GLOBE({
        el: document.body, // Target the entire body element
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: window.innerHeight, // Set minimum height to full viewport height
        minWidth: window.innerWidth, // Set minimum width to full viewport width
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xff96ff, // Warm pink
        color2: 0x96ffff, // Warm blue
        backgroundColor: 0x333333, // Set background color to match the body background color
        size: 1,
        spacing: 24.00
      }));
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    }
  }, [vantaEffect]);

  useEffect(() => {
    if (showText && textIndex < explanationText.split(' ').length) {
      const timer = setTimeout(() => {
        setTextIndex(prev => prev + 1);
      }, 50); // Adjust the speed of the text fade-in here
      return () => clearTimeout(timer);
    }
  }, [showText, textIndex, explanationText]);

  const handleButtonClick = () => {
    setShowDistribution(true);
    setResetAnimation(prev => !prev); // Toggle to trigger animation reset
    setShowText(true);
  };

  return (
    <div className="home-container" style={{ display: 'flex', zIndex: -1 }}>
      <div className="left-container" style={{ flex: 1 }}>
        <h1 className="vaporwave-title">🛠️🚧 currently under construction 🚧🛠️</h1>
        <p>yes, you're in the right place! vayd's full-time job is preventing him from updating this website, but he's working on it!</p>
        <p>if you click "Feeling Lucky?", something cool will happen</p>
        <button onClick={handleButtonClick} className="vaporwave-button">Feeling Lucky?</button>
        <p className="fade-in-text">
          {showText && explanationText.split(' ').slice(0, textIndex).join(' ')}
        </p>
      </div>
      <div className="right-container" style={{ flex: 1 }}>
        {showDistribution && <NormalDistribution setSnarkyMessage={setSnarkyMessage} resetAnimation={resetAnimation} />}
      </div>
    </div>
  );
};

export default Home;