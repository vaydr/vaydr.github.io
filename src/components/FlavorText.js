import React from 'react';
import './FlavorText.css';

const FlavorText = ({ text, link, type = 0 }) => {
  const getClassName = () => {
    switch (type) {
      case 1:
        return 'flavor-text-type-1';
      case 2:
        return 'flavor-text-type-2';
      default:
        return 'flavor-text';
    }
  };

  return (
    link && link !== 'none' ? (
      <a href={link} className={getClassName()} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    ) : (
      <span className={getClassName()}>{text}</span>
    )
  );
};

export default FlavorText;
