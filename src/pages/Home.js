import React, { useState, useEffect } from 'react';
import './Home.css';
import NormalDistribution from '../components/NormalDistribution';
import * as THREE from 'three';
import GLOBE from 'vanta/dist/vanta.globe.min';

const Home = () => {
  const [showDistribution, setShowDistribution] = useState(false);
  const [snarkyMessage, setSnarkyMessage] = useState('');
  const [resetAnimation, setResetAnimation] = useState(false);
  const [vantaEffect, setVantaEffect] = useState(0);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(GLOBE({
        el: document.body, // Target the body element directly
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: window.innerHeight, // Set minimum height to full viewport height
        minWidth: window.innerWidth, // Set minimum width to full viewport width
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x2061ff,
        color2: 0x7b20ff,
        backgroundColor: 0x000000, // Set background color to black
        size: 1,
        spacing: 24.00
      }));
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    }
  }, [vantaEffect]);

  const handleButtonClick = () => {
    setShowDistribution(true);
    setResetAnimation(prev => !prev); // Toggle to trigger animation reset
  };

  return (
    <div className="home-container">
      <h1 className="vaporwave-title">A Little Galton Board</h1>
      <button onClick={handleButtonClick} className="vaporwave-button">Feeling Lucky?</button>
      {showDistribution && <NormalDistribution setSnarkyMessage={setSnarkyMessage} resetAnimation={resetAnimation} />}
      {snarkyMessage && <p className="vaporwave-snarky-message">{snarkyMessage}</p>}
    </div>
  );
};

export default Home;