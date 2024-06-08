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
        My academic journey includes courses in distributed algorithms, sublinear algorithms, and GANs for privacy-focused content. Both of my parents are professors—my father in Computer Science and my mother in Biology—at Mississippi State University. Their professions deeply inspired my passion for the intersection of machine learning and biology.
      </p>
      <p className="Paragraph">
        I am excited about the potential of technology to advance our understanding of biological systems, a field that holds promise for groundbreaking discoveries.
      </p>
      <p className="Paragraph">
        In my spare time, I enjoy working out, playing VALORANT, and exploring Boston.
      </p>
    </div>
  );
};

export default About;

