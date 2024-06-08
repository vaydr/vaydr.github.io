import React, { useEffect } from 'react';
import * as THREE from 'three';
import VANTA from 'vanta/dist/vanta.dots.min';

const AnimatedBackground = () => {
  useEffect(() => {
    VANTA.DOTS({
      el: "#animated-background",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0x303ff,
      color2: 0x7500cd,
      backgroundColor: 0x0,
      size: 4.90,
      spacing: 32.00
    });
  }, []);

  return <div id="animated-background" style={{ width: '100%', height: '100%' }} />;
};

export default AnimatedBackground;
