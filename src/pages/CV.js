import React from 'react';
import FlavorText from '../components/FlavorText';
import './CV.css';
import '../components/FlavorText.css';

const CV = () => {
  return (
    <div className="cv-container">
      <div className="main-content">
        <div className="title">
          <FlavorText text="Curriculum Vitae" type={1} />
        </div>
        <div className="description">
          <div className="paragraph">
            Stay tuned! I'm currently migrating over my CV to this website.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CV;
