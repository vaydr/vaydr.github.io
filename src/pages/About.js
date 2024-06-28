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
      { label: 'Hometown:', value: <> <FlavorText text="Starkville, MS" link="https://www.cityofstarkville.org/" /> </> },
      { label: 'Family:', value: <> <FlavorText text="Mahalingam Ramkumar" link="none" type={1} /> (father, b. 1966), <FlavorText text="Bindu Nanduri" link="none" type={1} /> (mother, b. 1969), Professors at <FlavorText text="MSU" link="https://www.msstate.edu/" /> </> },
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
      { label: 'Current:', value: <>Software Engineer at <FlavorText text="TikTok" link="https://www.tiktok.com/" /> </> },
      { label: 'Former:', value: <>Researcher at <FlavorText text="MIT CSAIL" link="https://www.csail.mit.edu/" /> </> },
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

const BlogContainer = ({ children }) => {
  return (
    <div className="blog-links">
      {children}
    </div>
  );
};

const BlogDescription = ({ title, description }) => {
  return (
    <>
      <div className="blog-title">
        <FlavorText text={title} link="none" type={1} />
      </div>
      <div className="blog-description">{description}</div>
    </>
  );
};

const About = () => {
  return (
    <div className="about-container">
      <div className="main-content">
        <div className="title">{title}</div>
        <div className="explanation">
          There is a subtle, but crucial difference between <FlavorText text="knowing about" link="none" type={1} /> someone and <FlavorText text="knowing" link="none" type={1} /> someone. If you just want to <FlavorText text="know about" link="none" type={1} /> me, feel free to refer to the fact card! If, however, you're interested in getting to <FlavorText text="know" link="none" type={1} /> me, you can refer to the blog posts below! If you get through them and still want to stick around, thank you! I live for the smiles of people such as yourself, and the <FlavorText text="Contact" link="https://vaydr.github.io/#/contact" type={0} /> page was made just for you!
        </div>
        <BlogContainer>
          <BlogDescription title="On Thinking" description="some shower thoughts- particularly on how to apply graph algorithms to thinking (one might say i was thinking about thinking)" />
        </BlogContainer>
      </div>
      <div className="fact-card-container">
        <FactCard sections={sections} label={about_label} />
      </div>
    </div>
  );
};
export default About;
