import React from 'react';
import FlavorText from '../components/FlavorText';
import './CV.css';
import '../components/FlavorText.css';

const CV = () => {
  return (
    <div className="cv-container">
      <div className="main-content">
        <div className="title">
          <FlavorText text="Neo-Humanist Manifesto" type={1} />
        </div>
        <div className="description">
          <div className="paragraph">
            This is where I'll put my manifesto. 
          </div>
        </div>
      </div>
    </div>
  );
};

export default CV;
