import React from 'react';

const GaltonConfig = ({
  gravity,
  setGravity,
  animationSpeed,
  setAnimationSpeed,
  pegSpacing,
  setPegSpacing,
  numPellets,
  setNumPellets,
  pegRows,
  setPegRows,
  pelletRadius,
  setPelletRadius,
  pegRadius,
  setPegRadius
}) => {
  return (
    <div className="controls">
      <div className="control-group">
        <div className="label">Gravity: {gravity}</div>
        <input className="custom-slider" type="range" min="0.01" max="1" step="0.01" value={gravity} onChange={(e) => setGravity(parseFloat(e.target.value))} />
      </div>
      <div className="control-group">
        <div className="label">Animation Speed: {animationSpeed}</div>
        <input className="custom-slider" type="range" min="0.1" max="2" step="0.1" value={animationSpeed} onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))} />
      </div>
      <div className="control-group">
        <div className="label">Peg Spacing: {pegSpacing}</div>
        <input className="custom-slider" type="range" min="20" max="100" step="1" value={pegSpacing} onChange={(e) => setPegSpacing(parseFloat(e.target.value))} />
      </div>
      <div className="control-group">
        <div className="label">Number of Pellets: {numPellets}</div>
        <input className="custom-slider" type="range" min="1" max="2500" step="1" value={numPellets} onChange={(e) => setNumPellets(parseInt(e.target.value))} />
      </div>
      <div className="control-group">
        <div className="label">Number of Peg Rows: {pegRows}</div>
        <input className="custom-slider" type="range" min="1" max="20" step="1" value={pegRows} onChange={(e) => setPegRows(parseInt(e.target.value))} />
      </div>
      <div className="control-group">
        <div className="label">Pellet Radius: {pelletRadius}</div>
        <input className="custom-slider" type="range" min="1" max="20" step="1" value={pelletRadius} onChange={(e) => setPelletRadius(parseInt(e.target.value))} />
      </div>
      <div className="control-group">
        <div className="label">Peg Radius: {pegRadius}</div>
        <input className="custom-slider" type="range" min="1" max="20" step="1" value={pegRadius} onChange={(e) => setPegRadius(parseInt(e.target.value))} />
      </div>
    </div>
  );
};

export default GaltonConfig;
