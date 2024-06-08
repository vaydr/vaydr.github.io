import React, { useState, useEffect, useRef, useCallback } from 'react';

const NormalDistribution = ({ setSnarkyMessage, resetAnimation }) => {
  const canvasRef = useRef(null);
  const pelletsSettledRef = useRef(0);
  const pelletsRemainingRef = useRef(1500);
  const userPelletRankRef = useRef(0);
  const userPelletPercentileRef = useRef(0);

  const [pelletsSettled, setPelletsSettled] = useState(0);
  const [userPelletRank, setUserPelletRank] = useState(0);
  const [pelletsRemaining, setPelletsRemaining] = useState(1500);
  const [userPelletPercentile, setUserPelletPercentile] = useState(0);

  const config = {
    numPellets: 1000,
    pelletRadius: 2,
    pegRadius: 3,
    pegRows: 25,
    binCount: 300,
    gravity: 0.1,
    maxDownwardSpeed: 5,
    animationSpeed: 0.3,
    curveDrawingSpeed: 0.005,
    curveStrokeWidth: 2,
    initialPelletVelocity: 0,
    pegSpacing: 20,
    pelletColor: '#FFFFFF',
    pegColor: '#FFFFFF',
    binColors: Array(300).fill('rgba(255, 255, 255, 0.7)'), // Default bin colors
    userPelletColor: '#FF6347', // Highlighted user pellet color (Tomato)
    userTrailColor: '#D8BFD8', // Light purple
    snarkyMessages: [
      "You're the best of the worst!",
      "Meh, try again!",
      "You could have been a star!",
      "Not bad, but not great either.",
      "Middle of the pack, like always.",
      "Almost there, but not quite.",
      "You hit rock bottom!",
      "Top tier! Or not..."
    ].map(msg => msg.toUpperCase())
  };

  // Update binColors to be dynamic based on binCount
  config.binColors = Array(config.binCount).fill('rgba(255, 255, 255, 0.7)');

  const startAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = window.innerWidth * 0.8;
    const height = canvas.height = window.innerHeight * 0.6;
    const pegSpacing = config.pegSpacing;
    const pegs = [];
    const pellets = [];
    const bins = new Array(config.binCount).fill(0);
    let userPelletIndex = Math.floor(Math.random() * config.numPellets);
    const userPelletTrail = [];
    let settledPellets = 0;

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
          settledPellets++;
          const binIndex = Math.floor(pellet.x / (width / config.binCount));
          bins[binIndex]++;
          
          // Update refs
          pelletsSettledRef.current = settledPellets;
          pelletsRemainingRef.current = config.numPellets - settledPellets;
          
          if (index === userPelletIndex) {
            userPelletRankRef.current = settledPellets;
            userPelletPercentileRef.current = ((binIndex / config.binCount) * 100).toFixed(2);
            config.binColors = Array(config.binCount).fill('rgba(255, 255, 255, 0.7)'); // Reset all bins to default color
            config.binColors[binIndex] = 'rgba(255, 99, 71, 0.8)'; // Highlight only the bin where the user pellet lands
          }
        }

        if (index === userPelletIndex) {
          userPelletTrail.push({ x: pellet.x, y: pellet.y });
        }
      }
    };

    const drawBins = () => {
      const maxBinHeight = Math.max(...bins);
      for (let i = 0; i < bins.length; i++) {
        const binHeight = (bins[i] / maxBinHeight) * height * 0.3;
        ctx.fillStyle = config.binColors[i];
        ctx.fillRect(i * (width / bins.length), height - binHeight, width / bins.length, binHeight);
      }
    };

    const drawStats = () => {
      ctx.font = '24px Arial';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(`Pellets Settled: ${pelletsSettledRef.current}`, 20, 30);
      ctx.fillText(`Your Pellet Rank (Speed): ${userPelletRankRef.current}`, 20, 60);
      ctx.fillText(`Pellets Remaining: ${pelletsRemainingRef.current}`, 20, 90);
      ctx.fillText(`Your Pellet Percentile (Curve): ${userPelletPercentileRef.current}%`, 20, 120);
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      drawBins();
      pegs.forEach(peg => drawPeg(peg.x, peg.y));
      pellets.forEach((pellet, index) => {
        updatePellet(pellet, index);
        drawPellet(pellet.x, pellet.y, index === userPelletIndex);
      });
      drawStats();

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

        animateCurve(binTops);
      }
    };

    const animateCurve = (points) => {
      let t = 0;
      const drawStep = () => {
        if (t > 1) {
          return;
        }
        ctx.clearRect(0, 0, width, height);
        drawBins();
        pegs.forEach(peg => drawPeg(peg.x, peg.y));
        pellets.forEach((pellet, index) => {
          drawPellet(pellet.x, pellet.y, index === userPelletIndex);
        });
        drawStats();

        const currentPoint = Math.floor(points.length * t);
        const partialPoints = points.slice(0, currentPoint);
        drawSmoothCurve(partialPoints);

        t += config.curveDrawingSpeed;
        requestAnimationFrame(drawStep);
      };
      drawStep();
    };

    const drawSmoothCurve = (points) => {
      if (points.length < 2) return;

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      for (let i = 1; i < points.length - 1; i++) {
        const midX = (points[i].x + points[i + 1].x) / 2;
        const midY = (points[i].y + points[i + 1].y) / 2;
        ctx.quadraticCurveTo(points[i].x, points[i].y, midX, midY);
      }

      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      ctx.strokeStyle = config.userTrailColor;
      ctx.lineWidth = config.curveStrokeWidth;
      ctx.stroke();

      ctx.lineTo(width, height);
      ctx.lineTo(points[0].x, height);
      ctx.closePath();
      ctx.fillStyle = 'rgba(216, 191, 216, 0.5)';
      ctx.fill();
    };

    createPegs();
    createPellets();
    animate();
  }, [setSnarkyMessage]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation, resetAnimation]);

  return <canvas ref={canvasRef} className="modern-canvas" style={{ width: '80vw', height: '60vh', background: 'transparent' }}></canvas>;
};

export default NormalDistribution;
