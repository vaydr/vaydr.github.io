import React, { useState, useEffect, useRef, useCallback } from 'react';

const NormalDistribution = ({ setSnarkyMessage, resetAnimation }) => {

  const config = {
    numPellets: 250,
    pelletRadius: 5,
    pegRadius: 3,
    pegRows: 10,
    binCount: 150,
    gravity: 0.1,
    maxDownwardSpeed: 5,
    animationSpeed: 0.3,
    curveDrawingSpeed: 0.005,
    curveStrokeWidth: 2,
    initialPelletVelocity: 0,
    pegSpacing: 40,
    pelletColor: '#FFFFFF',
    pegColor: '#FFFFFF',
    binColors: Array(150).fill('rgba(255, 255, 255, 0.7)'), // Default bin colors
    userPelletColor: '#00FF00', // Highlighted user pellet color (Green)
    userTrailColor: '#D8BFD8', // Light purple
    snarkyMessages: [
      "You're the best of the worst!",
      "Meh, try again!",
      "You could have been a star!",
      "Not bad, but not great either.",
      "Middle of the pack, like always.",
      "Almost there, but not quite.",
      "You hit rock bottom!",
      "Top tier! Or not...",
      "So close, yet so far!",
      "Was that your best shot?",
      "Oops, better luck next time!",
      "That was... something.",
      "Are you even trying?",
      "Yikes, that was rough!",
      "Keep practicing!",
      "Better than nothing, right?",
      "Don't quit your day job!",
      "Is it too late to start over?",
      "That's going to leave a mark!",
      "Well, it could be worse..."
    ].map(msg => msg.toUpperCase())
  };

  const canvasRef = useRef(null);
  const pelletsSettledRef = useRef(0);
  const pelletsRemainingRef = useRef(config.numPellets);
  const userPelletRankRef = useRef(0);
  const userBinIndexRef = useRef(null); // Reference to store the bin index of the user pellet

  const [pelletsSettled, setPelletsSettled] = useState(0);
  const [userPelletRank, setUserPelletRank] = useState(0);
  const [pelletsRemaining, setPelletsRemaining] = useState(config.numPellets);
  const [snarkyMessageIndex, setSnarkyMessageIndex] = useState(null);

  const startAnimation = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = window.innerWidth * 0.8;
    const height = canvas.height = window.innerHeight * 0.6;
    const pegSpacing = config.pegSpacing;
    const pegs = [];
    const pellets = [];
    const bins = new Array(config.binCount).fill(0);
    let userPelletIndex = config.numPellets - 1; // User pellet is the last one
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

        // Collision detection with pegs
        for (let peg of pegs) {
          const dx = pellet.x - peg.x;
          const dy = pellet.y - peg.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const collisionThreshold = config.pegRadius + config.pelletRadius;
          if (distance < collisionThreshold) {
            // Bounce pellet on collision
            pellet.vx = (Math.random() - 0.5) * 2;
            pellet.vy = -pellet.vy * 0.5;
            pellet.y = peg.y + Math.sign(dy) * collisionThreshold;
          }
        }

        // Check if pellet has settled at the bottom
        const bottomThreshold = height - config.pelletRadius;
        if (pellet.y >= bottomThreshold) {
          pellet.y = bottomThreshold;
          pellet.settled = true;
          settledPellets++;
          const binIndex = Math.floor(pellet.x / (width / config.binCount));
          bins[binIndex]++;
          
          // Update reference counts
          pelletsSettledRef.current = settledPellets;
          pelletsRemainingRef.current = config.numPellets - settledPellets;
          
          // Special handling for user pellet
          if (index === userPelletIndex) {
            userPelletRankRef.current = settledPellets;
            userBinIndexRef.current = binIndex;
            // Reset all bin colors to default
            config.binColors.fill('rgba(255, 255, 255, 0.7)');
            // Highlight user's bin in green
            config.binColors[binIndex] = 'rgba(0, 255, 0, 0.8)';
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
      const baseText = "Your pellet, dropped first, is in ";
      const greenText = "GREEN";
      const continuationText = ". See where it lands!";
      const baseTextWidth = ctx.measureText(baseText).width;
      const greenTextWidth = ctx.measureText(greenText).width;
      ctx.fillText(baseText, 20, 120);
      ctx.fillStyle = '#00FF00'; // Set text color to green for the word "GREEN"
      ctx.fillText(greenText, 20 + baseTextWidth, 120);
      ctx.fillStyle = '#FFFFFF'; // Reset text color to white
      ctx.fillText(continuationText, 20 + baseTextWidth + greenTextWidth, 120);
    };

    const flashMessage = () => {
      if (snarkyMessageIndex === null) {
        const now = new Date();
        const seed = now.getTime();
        const randomIndex = Math.floor((seed % config.snarkyMessages.length));
        setSnarkyMessageIndex(randomIndex);
      }
      const message = config.snarkyMessages[Math.floor(Math.random() * config.snarkyMessages.length)];
      ctx.font = 'bold 48px Arial';
      ctx.fillStyle = 'rgba(255, 0, 0)';
      ctx.fillText(message, 20, 180);
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
        setTimeout(() => {
          const flashInterval = setInterval(() => {
            ctx.clearRect(0, 0, width, height);
            drawBins();
            pegs.forEach(peg => drawPeg(peg.x, peg.y));
            pellets.forEach((pellet, index) => {
              drawPellet(pellet.x, pellet.y, index === userPelletIndex);
            });
            drawStats();
            flashMessage();
          }, 500); // Flash message every 500ms

          setTimeout(() => {
            clearInterval(flashInterval);
          }, 500); // Stop flashing after 3 seconds
        }, 500); // Flash message after a delay
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


