import React, { useState, useEffect, useRef } from 'react';
import './Hero.css';
import profileImage from '../images/awais.jpg';

const Hero = ({ onNavigate }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!profileRef.current) return;
      
      const rect = profileRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);
      
      setMouseX(deltaY * 8);
      setMouseY(deltaX * 8);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNavClick = (e, section) => {
    e.preventDefault();
    setIsNavOpen(false);
    if (onNavigate) {
      onNavigate(section);
    }
  };

  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isNavOpen]);

  return (
    <div className="hero">
      {/* Background Elements */}
      <div className="bg-gradient"></div>
      <div className="bg-noise"></div>
      
      {/* Floating Particles */}
      <div className="particles">
        {[...Array(30)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${8 + Math.random() * 10}s`
          }}></div>
        ))}
      </div>

      {/* Left Side - Name */}
      <div className="name-section">
        <div className="name-wrapper">
          <h1 className="first-name">AWAIS</h1>
          <h1 className="last-name">TAHIR</h1>
        </div>
        <div className="title-wrapper">
          <span className="title">DESIGN & CODE</span>
          <div className="title-line"></div>
        </div>
      </div>

      {/* Right Side - Navigation */}
      <div className="nav-section">
        <button 
          className={`menu-btn ${isNavOpen ? 'active' : ''}`}
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <div className="menu-line"></div>
          <div className="menu-line"></div>
          <div className="menu-line"></div>
        </button>

        <div className={`menu-overlay ${isNavOpen ? 'active' : ''}`}></div>
        
        <div className={`nav-menu ${isNavOpen ? 'active' : ''}`}>
          <div className="menu-content">
            <div className="menu-header">
              <div className="menu-logo">✦</div>
            </div>
            <ul className="nav-list">
              <li>
                <a 
                  href="#home" 
                  className="nav-item"
                  onClick={(e) => handleNavClick(e, 'home')}
                >
                  <span className="nav-index">01</span>
                  <span className="nav-name">Home</span>
                  <span className="nav-arrow">→</span>
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="nav-item"
                  onClick={(e) => handleNavClick(e, 'about')}
                >
                  <span className="nav-index">02</span>
                  <span className="nav-name">About</span>
                  <span className="nav-arrow">→</span>
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  className="nav-item"
                  onClick={(e) => handleNavClick(e, 'projects')}
                >
                  <span className="nav-index">03</span>
                  <span className="nav-name">Projects</span>
                  <span className="nav-arrow">→</span>
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="nav-item"
                  onClick={(e) => handleNavClick(e, 'contact')}
                >
                  <span className="nav-index">04</span>
                  <span className="nav-name">Contact</span>
                  <span className="nav-arrow">→</span>
                </a>
              </li>
            </ul>
            <div className="menu-footer">
              <div className="menu-status">
                <span className="status-dot"></span>
                <span>Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Center - Profile with 3D Tilt */}
      <div className="profile-section">
        <div className="profile-frame">
          <div 
            className="profile-card"
            ref={profileRef}
            style={{
              transform: `perspective(800px) rotateX(${mouseX}deg) rotateY(${mouseY}deg)`
            }}
          >
            <div className="profile-glow"></div>
            <div className="profile-image-container">
              <img 
                src={profileImage}
                alt="Awais Tahir" 
                className="profile-image"
              />
            </div>
            <div className="profile-border"></div>
          </div>
        </div>
        
        {/* Orbital Rings */}
        <div className="rings">
          <div className="ring ring-1"></div>
          <div className="ring ring-2"></div>
        </div>
        
        {/* Info Badge */}
        <div className="info-badge">
          <div className="badge-content">
            <span className="badge-icon">✦</span>
            <span className="badge-text">Creative Technologist</span>
            <span className="badge-icon">✦</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator" onClick={() => onNavigate && onNavigate('about')}>
        <div className="scroll-wheel"></div>
        <span>Scroll</span>
      </div>
    </div>
  );
};

export default Hero;