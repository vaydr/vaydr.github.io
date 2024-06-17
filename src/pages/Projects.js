import React from 'react';
import FlavorText from '../components/FlavorText';
import './Projects.css';
import '../components/FlavorText.css';

const Projects = () => {
  return (
    <div className="projects-container">
      <div className="main-content">
        <div className="title">
          <FlavorText text="My Projects" type={1} />
        </div>
        <div className="description">
          <div className="project-paragraph">
            I'm working on a number of projects right now- namely, an NBA predictor, an elections forecast, an automatic VJ (rave visuals generator), an AI-generated short-form 
            content creation pipeline, and a chess threats visualizer! You might be able to tell from these, but I really like <FlavorText text="PyTorch" link="https://pytorch.org/docs/"/> and its capabilities for making custom models. As this site is still under construction,
            I'll be adding more projects as I get them ready, and eventually host demos + more relevant information on this page.
          </div>
        </div>
      </div>
    </div>
  );
};
export default Projects;
