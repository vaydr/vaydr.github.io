import React, { useState, useEffect, useRef, useCallback } from 'react';

const NormalDistribution = ({ setSnarkyMessage, resetAnimation }) => {
  const canvasRef = useRef(null);
  const [curves, setCurves] = useState([]);

  const config = {
    numPellets: 500,
    pelletRadius: 2,
    pegRadius: 3,
    pegRows: 5,
    binCount: 10,
    gravity: 0.1,
    maxDownwardSpeed: 5,
    animationSpeed: 0.5,
    curveDrawingSpeed: 0.3,
    curveStrokeWidth: 2,
    initialPelletVelocity: 0,
    pegSpacing: 50,
    pelletColor: '#FFFFFF', // White
    pegColor: '#FFFFFF', // White
    binColor: 'rgba(255, 255, 255, 0.7)', // White with transparency
    userPelletColor: '#FFFFFF', // White
    snarkyMessages: [
      "You're the best of the worst!",
      "Meh, try again!",
      "You could have been a star!",
      "Not bad, but not great either.",
      "Middle of the pack, like always.",
      "Almost there, but not quite.",
      "You hit rock bottom!",
      "Top tier! Or not..."
    ].map(msg => msg.toUpperCase()) // Convert messages to uppercase for better visibility
  };

  const startAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const pegSpacing = config.pegSpacing;
    const pegs = [];
    const pellets = [];
    const bins = new Array(config.binCount).fill(0);
    let userPelletIndex = Math.floor(Math.random() * config.numPellets);
    const userPelletTrail = [];

    const createPegs = () => {
      for (let row = 0; row < config.pegRows; row++) {
        for (let col = 0; col <= row; col++) {
          const x = width / 2 - row * pegSpacing / 2 + col * pegSpacing;
          const y = row * pegSpacing + 50;
          pegs.push({ x, y });
        }
      }
    };

    const createPellets = () => {
      for (let i = 0; i < config.numPellets; i++) {
        pellets.push({
          x: width / 2,
          y: 10,
          vx: 0,
          vy: config.initialPelletVelocity,
          settled: false
        });
      }
    };

    const drawPeg = (x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, config.pegRadius, 0, Math.PI * 2);
      ctx.fillStyle = config.pegColor;
      ctx.fill();
      ctx.closePath();
    };

    const drawPellet = (x, y, isUserPellet) => {
      ctx.beginPath();
      ctx.arc(x, y, config.pelletRadius, 0, Math.PI * 2);
      ctx.fillStyle = isUserPellet ? config.userPelletColor : config.pelletColor;
      ctx.fill();
      ctx.closePath();
    };

    const drawUserPelletTrail = () => {
      ctx.beginPath();
      ctx.moveTo(userPelletTrail[0].x, userPelletTrail[0].y);
      for (let i = 1; i < userPelletTrail.length; i++) {
        ctx.lineTo(userPelletTrail[i].x, userPelletTrail[i].y);
      }
      ctx.strokeStyle = config.userPelletColor;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.closePath();
    };

    const drawBins = () => {
      const maxBinHeight = Math.max(...bins);
      for (let i = 0; i < bins.length; i++) {
        const binHeight = (bins[i] / maxBinHeight) * height * 0.3;
        ctx.fillStyle = config.binColor;
        ctx.fillRect(i * (width / bins.length), height - binHeight, width / bins.length, binHeight);
      }
    };

    const drawBezierCurve = (points, t) => {
      if (points.length < 2) return;

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length - 2; i++) {
        const cp1x = (points[i].x + points[i + 1].x) / 2;
        const cp1y = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, cp1x, cp1y);
      }

      ctx.quadraticCurveTo(
        points[points.length - 2].x,
        points[points.length - 2].y,
        points[points.length - 1].x,
        points[points.length - 1].y
      );

      ctx.strokeStyle = config.userPelletColor;
      ctx.lineWidth = config.curveStrokeWidth;
      ctx.stroke();
      ctx.closePath();
    };

    const fadeInArea = (points) => {
      if (points.length < 2) return;

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length - 2; i++) {
        const cp1x = (points[i].x + points[i + 1].x) / 2;
        const cp1y = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, cp1x, cp1y);
      }

      ctx.quadraticCurveTo(
        points[points.length - 2].x,
        points[points.length - 2].y,
        points[points.length - 1].x,
        points[points.length - 1].y
      );

      ctx.lineTo(points[points.length - 1].x, height);
      ctx.lineTo(points[0].x, height);
      ctx.closePath();

      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)'); // White
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)'); // White

      ctx.fillStyle = gradient;
      ctx.fill();
    };

    const updatePellet = (pellet, index) => {
      if (!pellet.settled) {
        pellet.vy = Math.min(pellet.vy + config.gravity, config.maxDownwardSpeed);
        pellet.x += pellet.vx * config.animationSpeed;
        pellet.y += pellet.vy * config.animationSpeed;

        for (let peg of pegs) {
          const dx = pellet.x - peg.x;
          const dy = pellet.y - peg.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < config.pegRadius + config.pelletRadius) {
            pellet.vx = (Math.random() - 0.5) * 2;
            pellet.vy = -pellet.vy * 0.5;
            pellet.y = peg.y + Math.sign(dy) * (config.pegRadius + config.pelletRadius);
          }
        }

        if (pellet.y >= height - config.pelletRadius) {
          pellet.y = height - config.pelletRadius;
          pellet.settled = true;
          const binIndex = Math.floor(pellet.x / (width / config.binCount));
          bins[binIndex]++;
        }

        if (index === userPelletIndex) {
          userPelletTrail.push({ x: pellet.x, y: pellet.y });
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      drawBins();
      pegs.forEach(peg => drawPeg(peg.x, peg.y));
      pellets.forEach((pellet, index) => {
        updatePellet(pellet, index);
        drawPellet(pellet.x, pellet.y, index === userPelletIndex);
      });

      drawUserPelletTrail();

      if (pellets.some(pellet => !pellet.settled)) {
        requestAnimationFrame(animate);
      } else {
        const userPellet = pellets[userPelletIndex];
        const message = config.snarkyMessages[Math.floor(userPellet.x / width * config.snarkyMessages.length)];
        setSnarkyMessage(message);

        const binTops = bins.map((count, i) => ({
          x: i * (width / bins.length) + (width / bins.length) / 2,
          y: height - (count / Math.max(...bins)) * height * 0.3
        }));

        animateBezierCurve(binTops);
        setTimeout(() => fadeInArea(binTops), 500); // Delay to show the fade-in effect
      }
    };

    const animateBezierCurve = (points) => {
      let t = 0;
      const drawStep = () => {
        if (t > 1) return;
        ctx.clearRect(0, 0, width, height);
        drawBins();
        pegs.forEach(peg => drawPeg(peg.x, peg.y));
        pellets.forEach((pellet, index) => {
          drawPellet(pellet.x, pellet.y, index === userPelletIndex);
        });
        drawUserPelletTrail();

        const partialPoints = points.slice(0, Math.floor(points.length * t));
        drawBezierCurve(partialPoints, t);

        t += config.curveDrawingSpeed * 0.01;
        requestAnimationFrame(drawStep);
      };
      drawStep();
    };

    createPegs();
    createPellets();
    animate();
  }, [setSnarkyMessage]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation, resetAnimation]);

  return <canvas ref={canvasRef} width="600" height="400" className="modern-canvas" style={{ background: 'transparent' }}></canvas>;
};

export default NormalDistribution;
