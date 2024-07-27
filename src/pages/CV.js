import React from 'react';
import FlavorText from '../components/FlavorText';
import './CV.css';
import '../components/FlavorText.css';
import React from 'react';
import FlavorText from '../components/FlavorText';
import './CV.css';
import '../components/FlavorText.css';

const CV = () => {
  return (
    <div className="cv-container">
      <div className="main-content">
        <div className="title">
          <FlavorText text="everyone needs a grove to tend" type={1} />
        </div>
        <div className="description">
        </div>
      </div>
    </div>
  );
};

export default CV;
