import React from 'react';
import FlavorText from '../components/FlavorText';
import './Contact.css';
import '../components/FlavorText.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="main-content">
        <div className="title">
          <FlavorText text="Contact Me" type={1} />
        </div>
        <div className="description">
          <div className="contact-section">
            <div className="label">Email:</div>
            <div><FlavorText text="vramkumar369 [at] gmail.com" link="none" type={1}/> (personal)</div>
            <div><FlavorText text="vayd.ramkumar [at] bytedance.com" link="none" type={1}/> (work)</div>
            <div><FlavorText text="vayd [at] mit.edu" link="none" type={1}/> (school)</div>
          </div>
          <div className="contact-section">
            <div className="label">Phone:</div>
            <FlavorText text="+1 (662) 518-1351" link="none" type={1} /> (cell)
          </div>
          <div className="contact-section">
            <div className="label">Instagram (don't have installed consistently, rarely use):</div>
            <FlavorText text="@vaydthewise" link="https://www.instagram.com/vaydthewise" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;