import React from 'react';
import './About.css';
import FactCard from '../components/FactCard';
import FlavorText from '../components/FlavorText';

const sections = [
  {
    type: 'image',
    title: 'Image',
    content: null,
  },
  {
    title: 'Personal Life',
    content: [
      { label: 'Birthplace:', value: <> <FlavorText text="JFK Hospital" link="https://example.com/jfk-hospital" /> in <FlavorText text="Edison, NJ" link="https://example.com/edison-nj" /> </> },
      { label: 'Birthdate:', value: '5:19 PM EDT on October 22, 2002' },
      { label: 'Raised:', value: <> <FlavorText text="Starkville, MS" link="https://example.com/starkville-ms" /> </> },
      { label: 'Parents:', value: 'Professors at MSU' },
    ],
  },
  {
    title: 'Education',
    content: [
      { label: 'Education:', value: <> <FlavorText text="MIT" link="https://example.com/mit" /> grad in AI and Math </> },
    ],
  },
  {
    title: 'Occupation',
    content: [
      { label: 'Occupation:', value: <>Software Engineer at <FlavorText text="TikTok" link="https://example.com/tiktok" /></> },
    ],
  },
  {
    title: 'Fun Facts',
    content: [
      { label: 'Hobby:', value: <>Playing <FlavorText text="VALORANT" link="https://example.com/valorant" /></> },
      { label: 'Favorite Food:', value: 'Sushi' },
    ],
  },
];

const About = () => {
  return (
    <div className="about-container">
      <div className="main-content">
        <div className="title">Ramblings</div>
        <div className="description">
          <div className="paragraph">My mother tells me that I have a metallic, resonant voice that captures attention. It's something I share with my father.</div>
          <div className="paragraph">Having a voice that stands out can be a double-edged sword. While it grabs attention, it also invites scrutiny. I've come to see that this attention is a form of engagement, even if it brings criticism. I've learned to embrace it as part of who I am.</div>
          <div className="paragraph">When I speak with passion, I aim to share insights and emotions, not just fill silence. I believe that meaningful conversations can leave a lasting impact, and I strive to make my words count.</div>
        </div>
        <div className="blog-links">
          <div className="blog-placeholder">Blog links will go here.</div>
        </div>
      </div>
      <div className="fact-card-container">
        <FactCard sections={sections} />
      </div>
    </div>
  );
};
export default About;
