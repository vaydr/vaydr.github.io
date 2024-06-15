import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="AboutContainer">
      <div className="FastFactsCard">
        <h2 className="CardTitle">Fast Facts</h2>
        <ul className="FastFactsList">
          <li>Born in New Jersey</li>
          <li>Raised in Mississippi</li>
          <li>MIT grad in AI and Math</li>
          <li>Software Engineer at TikTok</li>
          <li>Parents are professors at MSU</li>
        </ul>
      </div>
      {/* 
      <div className="AboutContent">
        <h1 className="BigBoldText">About Me</h1>
        <p className="Paragraph">
          Hi, I'm <span className="Highlight">Vayd</span>. Born in New Jersey, raised in Mississippi. MIT grad in AI and Math. Now, a software engineer at TikTok's advertising department.
        </p>
        <p className="Paragraph">
          My academic journey? Distributed algorithms, sublinear algorithms, and GANs for privacy-focused content. My parents, both professors at Mississippi State University, fueled my passion for the intersection of machine learning and biology.
        </p>
        <p className="Paragraph">
          I'm all about leveraging technology to unlock the mysteries of biological systems. The future is bright with groundbreaking discoveries.
        </p>
        <p className="Paragraph">
          Outside of work, you'll find me working out, playing VALORANT, or exploring Boston.
        </p>
      </div>
      */}
    </div>
  );
};

export default About;
