import React from 'react';
import './About.css';
import aboutImage from '../images/awais.jpg'; // Add your about image

const About = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <h2 className="about-title">
          <span className="title-gradient">About Me</span>
          <span className="title-line"></span>
        </h2>
        
        <div className="about-content">
          <div className="about-image-container">
            <div className="image-wrapper">
              <img 
                src={aboutImage} 
                alt="About Awais Tahir" 
                className="about-image"
              />
              <div className="image-overlay"></div>
              <div className="image-border"></div>
            </div>
          </div>

          <div className="about-text-container">
            <p className="about-description">
              I'm a passionate Full Stack Developer with a keen interest in creating 
              innovative and efficient web solutions. With expertise in modern 
              JavaScript frameworks and a strong foundation in both frontend and 
              backend development, I strive to build seamless digital experiences 
              that make a difference.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;