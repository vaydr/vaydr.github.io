import React from 'react';
import FlavorText from '../components/FlavorText';
import './CV.css';
import '../components/FlavorText.css';
const CV = () => {
  return (
    <div className="cv-container">
      <div className="main-content">
        <div className="title">
          <FlavorText text="Neo-Humanist Manifesto" type={1} />
        </div>
        <div className="description">
          <div className="paragraph">
            <FlavorText text="Prologue" type={1} />
            <div className="list-item">
              The Neo-Humanist Manifesto seeks to uncover the fundamental motivations that unite humanity: the desire to survive, thrive, and reproduce. It acknowledges that exploitation is a product of these shared human drives and aims to address these issues through understanding and systemic change.
            </div>
          </div>
          <div className="paragraph">
            <FlavorText text="The Ever-Evolving Theses of the Neo-Humanist Manifesto" type={1} />
            <div className="list-item">
              I. Large technology corporations exploit inherent weaknesses in the human genome, leveraging our natural vulnerabilities for profit.
            </div>
            <div className="list-item">
              II. This exploitation is particularly evident in the manipulation of dopamine regulation, which bends human behavior to suit commercial interests.
            </div>
            <div className="list-item">
              III. The result is a crisis of motivation, threatening the stability of society as we know it.
            </div>
            <div className="list-item">
              IV. The system itself, including the economy, has risen as a reflection of our collective desires. It is not individuals, but the system that perpetuates exploitation.
            </div>
            <div className="list-item">
              V. Switching roles between individuals, whether rich or poor, would likely yield similar outcomes, as human nature drives our actions.
            </div>
            <div className="list-item">
              VI. Cognitive biases, such as hyperbolic discounting and the availability heuristic, are systematically exploited to manipulate consumer behavior and maintain corporate power.
            </div>
            <div className="list-item">
              VII. The attention economy capitalizes on the limited cognitive resources of individuals, leading to widespread issues of distraction, reduced productivity, and mental health crises.
            </div>
            <div className="list-item">
              VIII. The commodification of personal data undermines privacy and autonomy, creating power imbalances that favor corporations over individuals.
            </div>
            <div className="list-item">
              IX. Technological advancements should be directed towards enhancing societal well-being and addressing existential risks, rather than exacerbating inequalities and vulnerabilities.
            </div>
            <div class="list-item">
              X. True systemic change requires an interdisciplinary approach, integrating insights from neuroscience, behavioral economics, and social sciences to create resilient and equitable systems.
            </div>
            <div className="list-item">
              XI. The future of society depends on our ability to recognize and mitigate the systemic exploitation of human vulnerabilities, fostering a culture of dignity and prosperity for all.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CV;
