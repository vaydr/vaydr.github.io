import React from 'react';
import './FactCard.css';

const ImageSection = () => (
  <div className="section">
    <div className="section-header">Image</div>
    <div className="image-container">
      {/* Add your image here */}
    </div>
  </div>
);

const Fact = ({ label, value }) => (
  <div className="item">
    <span className="label">{label}</span>
    <span className="value">{value}</span>
  </div>
);

const FactCard = ({ sections }) => {
  return (
    <div className="card">
      <div className="header">Fast Facts</div>
      <div className="content">
        {sections.map((section, index) => (
          section.type === 'image' ? (
            <ImageSection key={index} />
          ) : (
            <div className="section" key={index}>
              <div className="section-header">{section.title}</div>
              {section.content.map((fact, factIndex) => (
                <Fact key={factIndex} label={fact.label} value={fact.value} />
              ))}
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default FactCard;