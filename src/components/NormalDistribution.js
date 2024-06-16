import React, { useState, useEffect, useRef, useCallback } from 'react';
import GaltonConfig from './GaltonConfig';

const NormalDistribution = ({ setSnarkyMessage, resetAnimation }) => {
  const config = {
    numPellets: 250,
    pelletRadius: 2,
    pegRadius: 6,
    pegRows: 10,
    binCount: 150,
    gravity: 0.31,
    maxDownwardSpeed: 5,
    animationSpeed: 2,
    curveDrawingSpeed: 0.007,
    curveStrokeWidth: 5,
    initialPelletVelocity: 0,
    pegSpacing: 41,
    pelletColor: '#FFFFFF',
    pegColor: '#FFFFFF',
    binColors: Array(150).fill('rgba(255, 255, 255, 0.7)'),
    userPelletColor: '#00FFFF',
    userTrailColor: '#FF00FF',
  };

  const canvasRef = useRef(null);
  const pelletsSettledRef = useRef(0);
  const pelletsRemainingRef = useRef(config.numPellets);
  const userPelletRankRef = useRef(0);
  const userBinIndexRef = useRef(null);

  const [gravity, setGravity] = useState(config.gravity);
  const [animationSpeed, setAnimationSpeed] = useState(config.animationSpeed);
  const [pegSpacing, setPegSpacing] = useState(config.pegSpacing);
  const [numPellets, setNumPellets] = useState(config.numPellets);
  const [pegRows, setPegRows] = useState(config.pegRows);
  const [pelletRadius, setPelletRadius] = useState(config.pelletRadius);
  const [pegRadius, setPegRadius] = useState(config.pegRadius);

  const startAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = (canvas.width = window.innerWidth * 0.8);
    const height = (canvas.height = window.innerHeight * 0.6);
    const pegs = [];
    const pellets = [];
    const bins = new Array(config.binCount).fill(0);
    const userPelletIndex = numPellets - 1;
    const userPelletTrail = [];
    let settledPellets = 0;
    let animationFrameId = null;

    const createPegs = () => {
      for (let row = 0; row < pegRows; row++) {
        for (let col = 0; col <= row; col++) {
          const x = width / 2 - (row * pegSpacing) / 2 + col * pegSpacing;
          const y = row * pegSpacing + 50;
          pegs.push({ x, y });
        }
      }
    };

    const createPellets = () => {
      for (let i = 0; i < numPellets; i++) {
        pellets.push({
          x: width / 2,
          y: 10,
          vx: 0,
          vy: config.initialPelletVelocity,
          settled: false,
        });
      }
    };

    const drawPeg = (x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, pegRadius, 0, Math.PI * 2);
      ctx.fillStyle = config.pegColor;
      ctx.fill();
      ctx.closePath();
    };

    const drawPellet = (x, y, isUserPellet) => {
      ctx.beginPath();
      ctx.arc(x, y, pelletRadius, 0, Math.PI * 2);
      ctx.fillStyle = isUserPellet ? config.userPelletColor : config.pelletColor;
      ctx.fill();
      ctx.closePath();
    };

    const updatePellet = (pellet, index) => {
      if (!pellet.settled) {
        pellet.vy = Math.min(pellet.vy + gravity, config.maxDownwardSpeed);
        pellet.x += pellet.vx * animationSpeed;
        pellet.y += pellet.vy * animationSpeed;

        for (let peg of pegs) {
          const dx = pellet.x - peg.x;
          const dy = pellet.y - peg.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const collisionThreshold = pegRadius + pelletRadius;
          if (distance < collisionThreshold) {
            pellet.vx = (Math.random() - 0.5) * 2;
            pellet.vy = -pellet.vy * 0.5;
            pellet.y = peg.y + Math.sign(dy) * collisionThreshold;
          }
        }

        const bottomThreshold = height - pelletRadius;
        if (pellet.y >= bottomThreshold) {
          pellet.y = bottomThreshold;
          pellet.settled = true;
          settledPellets++;
          const binIndex = Math.floor(pellet.x / (width / config.binCount));
          bins[binIndex]++;

          pelletsSettledRef.current = settledPellets;
          pelletsRemainingRef.current = numPellets - settledPellets;

          if (index === userPelletIndex) {
            userPelletRankRef.current = settledPellets;
            userBinIndexRef.current = binIndex;
            config.binColors.fill('rgba(255, 255, 255, 0.7)');
            config.binColors[binIndex] = 'rgba(0, 255, 255, 0.8)';
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
      ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(`Pellets Settled: ${pelletsSettledRef.current}`, 20, 30);
      ctx.fillText(`Your Pellet Rank (Speed): ${userPelletRankRef.current}`, 20, 60);
      ctx.fillText(`Pellets Remaining: ${pelletsRemainingRef.current}`, 20, 90);
      const baseText = "Your pellet is in ";
      const cyanText = "CYAN!";
      const continuationText = "See where it lands!";
      const baseTextWidth = ctx.measureText(baseText).width;
      ctx.fillText(baseText, 20, 120);
      ctx.fillStyle = '#00FFFF';
      ctx.fillText(cyanText, 20 + baseTextWidth, 120);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(continuationText, 20, 150);
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
        animationFrameId = requestAnimationFrame(animate);
      } else {
        const binTops = bins.map((count, i) => ({
          x: i * (width / bins.length) + (width / bins.length) / 2,
          y: height - (count / Math.max(...bins)) * height * 0.3,
        }));
        animateCurve(binTops);
      }
    };

    const animateCurve = (points) => {
      let t = 0;
      const drawStep = () => {
        if (t > 1) return;
        ctx.clearRect(0, 0, width, height);
        drawBins();
        pegs.forEach(peg => drawPeg(peg.x, peg.y));
        pellets.forEach((pellet, index) => drawPellet(pellet.x, pellet.y, index === userPelletIndex));
        drawStats();

        const currentPoint = Math.floor(points.length * t);
        const partialPoints = points.slice(0, currentPoint);
        drawSmoothCurve(partialPoints);

        t += config.curveDrawingSpeed;
        animationFrameId = requestAnimationFrame(drawStep);
      };
      drawStep();
    };

    const drawSmoothCurve = (points) => {
      if (points.length < 2) return;

      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      const drawSegment = (start, end) => {
        const midX = (start.x + end.x) / 2;
        const midY = (start.y + end.y) / 2;
        ctx.quadraticCurveTo(start.x, start.y, midX, midY);
      };

      for (let i = 1; i < points.length - 1; i++) {
        drawSegment(points[i], points[i + 1]);
      }

      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
      ctx.strokeStyle = config.userTrailColor;
      ctx.lineWidth = config.curveStrokeWidth;
      ctx.stroke();

      ctx.lineTo(width, height);
      ctx.lineTo(points[0].x, height);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 0, 255, 0.5)';
      ctx.fill();
    };

    createPegs();
    createPellets();
    animate();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [setSnarkyMessage, gravity, animationSpeed, pegSpacing, numPellets, pegRows, pelletRadius, pegRadius]);

  useEffect(() => {
    const cleanup = startAnimation();
    return () => {
      if (cleanup) cleanup();
    };
  }, [startAnimation, resetAnimation]);

  return (
    <div>
      <canvas ref={canvasRef} className="modern-canvas" style={{ width: '80vw', height: '60vh', background: 'transparent' }}></canvas>
      <GaltonConfig
        gravity={gravity}
        setGravity={setGravity}
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
        pegSpacing={pegSpacing}
        setPegSpacing={setPegSpacing}
        numPellets={numPellets}
        setNumPellets={setNumPellets}
        pegRows={pegRows}
        setPegRows={setPegRows}
        pelletRadius={pelletRadius}
        setPelletRadius={setPelletRadius}
        pegRadius={pegRadius}
        setPegRadius={setPegRadius}
      />
    </div>
  );
};

export default NormalDistribution;
