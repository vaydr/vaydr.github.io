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
      { label: 'Birthplace:', value: <> <FlavorText text="JFK University Medical Center" link="https://www.hackensackmeridianhealth.org/en/locations/jfk-university-medical-center?city=none" /> in <FlavorText text="Edison, NJ" link="https://www.edisonnj.org/" /> </> },
      { label: 'Birthdate:', value: '5:19 PM EDT on October 22, 2002' },
      { label: 'Raised:', value: <> <FlavorText text="Starkville, MS" link="https://www.cityofstarkville.org/" /> </> },
      { label: 'Family:', value: <> <FlavorText text="Mahalingam Ramkumar" link="https://web.cse.msstate.edu/~ramkumar/" /> (father, b. 1966), <FlavorText text="Bindu Nanduri" link="https://www.vetmed.msstate.edu/directory/bbn5" /> (mother, b. 1969), Professors at <FlavorText text="MSU" link="https://www.msstate.edu/" /> </> },
    ],
  },
  {
    title: 'Education',
    content: [
      { label: 'Master\'s:', value: <> <FlavorText text="MIT" link="https://web.mit.edu/" /> MS in <FlavorText text="BioEECS" link="https://www.eecs.mit.edu/academics/undergraduate-programs/curriculum/6-7-computer-science-and-molecular-biology/" /> (2025) </> },
      { label: 'Bachelor\'s:', value: <> <FlavorText text="MIT" link="https://web.mit.edu/" /> BS in <FlavorText text="Artificial Intelligence and Decision-Making" link='https://www.eecs.mit.edu/academics/undergraduate-programs/curriculum/6-4-artificial-intelligence-and-decision-making/'/> and <FlavorText text="Mathematics" link="https://catalog.mit.edu/degree-charts/mathematics-course-18/" /> (2024) </> },
      { label: 'Pre-College:', value: <> <FlavorText text="MSMS" link="https://www.themsms.org/" /> (2020), <FlavorText text="SHS" link="https://www.starkvillesd.com/starkville-high-school" /> (2018), <FlavorText text="AMS" link="https://www.starkvillesd.com/armstrong-middle-school/index" /> (2016), <FlavorText text="HWS" link="https://www.starkvillesd.com/henderson-ward-stewart-elementary/index" /> (2013), <FlavorText text="Sudduth" link="https://www.starkvillesd.com/sudduth-elementary/index" /> (2010) </> },
    ],
  },
  {
    title: 'Occupation',
    content: [
      { label: 'Current:', value: <>Software Engineer at <FlavorText text="TikTok" link="https://www.tiktok.com/" /></> },
      { label: 'Former:', value: <>Researcher at <FlavorText text="MIT CSAIL" link="https://www.csail.mit.edu/" /></> },
    ],
  },
  {
    title: 'Fun Facts',
    content: [
      { label: 'Interests:', value: <>Playing <FlavorText text="VALORANT" link="https://playvalorant.com/en-us/" />, the <FlavorText text="Celtics" link="https://www.nba.com/celtics/" /> and <FlavorText text="Grizzlies" link="https://www.nba.com/grizzlies/" />, Reading <FlavorText text="538" link="https://fivethirtyeight.com/" />, lifting, cubing, music composition, playing piano</> },
      { label: 'Favorite Quote:', value: <> "People will forget what you said, people will forget what you did, but people will never forget how you made them feel." <FlavorText text="(Maya Angelou)" link="https://www.biography.com/writer/maya-angelou" /> </> },
      { label: 'S/B/D:', value: '305/225/365' },
      { label: 'Blood Type:', value: 'B+' },
      { label: 'Secret Talents:', value: <>Has <FlavorText text="perfect pitch" link="https://en.wikipedia.org/wiki/Absolute_pitch" />, peaked rank 126 globally in <FlavorText text="Geometry Dash" link="https://en.wikipedia.org/wiki/Geometry_Dash" /></> },
      { label: <>Favorite <FlavorText text="Pokémon" link="https://www.pokemon.com/" />:</>, value: <FlavorText text="Zekrom" link="https://www.pokemon.com/us/pokedex/zekrom" /> },
    ],
  },
];

const about_label = <FlavorText text="Vayd Ramkumar" link="none" type={1} />;
const title = <FlavorText text="Ramblings" link="none" type={1} />;
const About = () => {
  return (
    <div className="about-container">
      <div className="main-content">
        <div className="title">{title}</div>
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
        <FactCard sections={sections} label = {about_label}/>
      </div>
    </div>
  );
};
export default About;
