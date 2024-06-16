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
          <div className="paragraph">
            <div className="label">Email:</div>
            <div><FlavorText text="vramkumar369@gmail.com" link="mailto:vramkumar369@gmail.com" /> (personal)</div>
            <div><FlavorText text="vayd.ramkumar@bytedance.com" link="mailto:vayd.ramkumar@bytedance.com" /> (work)</div>
            <div><FlavorText text="vayd@mit.edu" link="mailto:vayd@mit.edu" /> (school)</div>
          </div>
          <div className="paragraph">
            <div className="label">Phone:</div>
            <div>+1 (662) 518-1351 (cell)</div>
          </div>
          <div className="paragraph">
            <div className="label">Address:</div>
            <div>42 George Street, Medford, MA 02155</div>
          </div>
          <div className="paragraph">
            <div className="label">Instagram (don't have installed consistently, rarely use):</div>
            <FlavorText text="@vaydthewise" link="https://www.instagram.com/vaydthewise" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;