import React, { useState } from 'react';
import './Hero.css';

const Hero = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="hero-container">
      {/* Left side - Name */}
      <div className="name-container">
        <div className="name-line">AWAIS</div>
        <div className="name-line">TAHIR</div>
      </div>

      {/* Right side - Animated Navbar Icon */}
      <div className="nav-container">
        <button 
          className={`nav-icon ${isNavOpen ? 'open' : ''}`}
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Animated Navigation Menu */}
        <div className={`nav-menu ${isNavOpen ? 'active' : ''}`}>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>

      {/* Center - Profile Picture */}
      <div className="profile-container">
        <div className="profile-circle">
          {/* Replace with your image */}
          <img 
            src="/api/placeholder/400/400" 
            alt="Awais Tahir" 
            className="profile-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;