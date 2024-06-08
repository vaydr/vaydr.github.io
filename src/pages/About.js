import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="AboutContainer">
      <h1 className="Title">About Me</h1>
      <h2 className="Subtitle">Welcome to my world!</h2>
      <p className="Paragraph">
        Hi, I'm <span className="Highlight">Vayd</span>. I was born in New Jersey and moved to Mississippi during my childhood. I graduated with a degree in AI and Math from MIT and am currently a software engineer in the advertising department at TikTok.
      </p>
      <p className="Paragraph">
        My academic journey includes courses in distributed algorithms, sublinear algorithms, and GANs for privacy-focused content. Both of my parents are professors—my father in Computer Science and my mother in Biology—at a university in Mississippi. Their professions deeply inspired my passion for the intersection of machine learning and biology.
      </p>
      <p className="Paragraph">
        I am excited about the potential of technology to advance our understanding of biological systems, a field that holds promise for groundbreaking discoveries.
      </p>
      <p className="Paragraph">
        When I'm not immersed in my professional interests, I enjoy working out and exploring Boston.
      </p>
    </div>
  );
};

export default About;

