import React from 'react';
import './FlavorText.css';

const FlavorText = ({ text, link }) => (
  link && link !== 'none' ? (
    <a href={link} className="flavor-text" target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  ) : (
    <span className="flavor-text">{text}</span>
  )
);
export default FlavorText;
