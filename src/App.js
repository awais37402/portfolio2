import React, { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import FindMe from './components/FindMe';
import CustomCursor from './components/CustomCursor';

function App() {
  const [isAboutVisible, setIsAboutVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const touchStartY = useRef(0);
  const aboutSectionRef = useRef(null);
  const transitionTimeout = useRef(null);

  // Clean up timeouts
  useEffect(() => {
    return () => {
      if (transitionTimeout.current) {
        clearTimeout(transitionTimeout.current);
      }
    };
  }, []);

  // Smooth scroll to element
  const smoothScrollTo = useCallback((element) => {
    if (element && aboutSectionRef.current) {
      const offsetTop = element.offsetTop;
      aboutSectionRef.current.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }, []);

  // Handle wheel events with smooth behavior
  const handleWheel = useCallback((e) => {
    if (isScrolling) return;

    const delta = e.deltaY;
    const scrollableElement = aboutSectionRef.current;

    // When About is visible
    if (isAboutVisible && scrollableElement) {
      const currentScrollTop = scrollableElement.scrollTop;
      const isAtTop = currentScrollTop <= 0;
      const isScrollingUp = delta < 0;

      // If at top and scrolling up, hide About section
      if (isAtTop && isScrollingUp) {
        e.preventDefault();
        setIsScrolling(true);
        setIsAboutVisible(false);
        transitionTimeout.current = setTimeout(() => {
          setIsScrolling(false);
        }, 600);
      }
      return;
    }

    // When About is not visible, handle slide down transition
    if (!isAboutVisible && delta > 30) {
      e.preventDefault();
      setIsScrolling(true);
      setIsAboutVisible(true);
      transitionTimeout.current = setTimeout(() => {
        setIsScrolling(false);
        // Reset scroll position when About becomes visible
        if (scrollableElement) {
          scrollableElement.scrollTop = 0;
        }
      }, 600);
    }
  }, [isAboutVisible, isScrolling]);

  // Handle touch events for mobile with smooth gestures
  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (isScrolling) return;

    const scrollableElement = aboutSectionRef.current;
    const touchEndY = e.touches[0].clientY;
    const delta = touchStartY.current - touchEndY;
    const isSwipingUp = delta > 0;
    const isSwipingDown = delta < 0;

    // When About is visible
    if (isAboutVisible && scrollableElement) {
      const currentScrollTop = scrollableElement.scrollTop;
      const isAtTop = currentScrollTop <= 0;

      // If at top and swiping down, hide About
      if (isAtTop && isSwipingDown && Math.abs(delta) > 30) {
        e.preventDefault();
        setIsScrolling(true);
        setIsAboutVisible(false);
        transitionTimeout.current = setTimeout(() => {
          setIsScrolling(false);
        }, 600);
      }
      return;
    }

    // When About is not visible and swiping up, show About
    if (!isAboutVisible && isSwipingUp && Math.abs(delta) > 50) {
      e.preventDefault();
      setIsScrolling(true);
      setIsAboutVisible(true);
      transitionTimeout.current = setTimeout(() => {
        setIsScrolling(false);
        if (scrollableElement) {
          scrollableElement.scrollTop = 0;
        }
      }, 600);
    }
  }, [isAboutVisible, isScrolling]);

  // Handle scroll events within content
  const handleContentScroll = useCallback(() => {
    if (aboutSectionRef.current) {
      const currentScrollTop = aboutSectionRef.current.scrollTop;
      setScrollPosition(currentScrollTop);
    }
  }, []);

  // Navigation handler with smooth transitions
  const handleNavigation = useCallback((section) => {
    if (section === 'about' && !isAboutVisible) {
      setIsScrolling(true);
      setIsAboutVisible(true);
      transitionTimeout.current = setTimeout(() => {
        setIsScrolling(false);
        if (aboutSectionRef.current) {
          aboutSectionRef.current.scrollTop = 0;
        }
      }, 600);
    } 
    else if (section === 'home' && isAboutVisible) {
      setIsScrolling(true);
      setIsAboutVisible(false);
      transitionTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 600);
    } 
    else if (section === 'skills' && isAboutVisible) {
      // Smooth scroll to Skills section
      setTimeout(() => {
        const skillsElement = document.getElementById('skills');
        if (skillsElement && aboutSectionRef.current) {
          const offsetTop = skillsElement.offsetTop;
          aboutSectionRef.current.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
    else if (section === 'projects' && isAboutVisible) {
      // Smooth scroll to Projects section
      setTimeout(() => {
        const projectsElement = document.getElementById('projects');
        if (projectsElement && aboutSectionRef.current) {
          const offsetTop = projectsElement.offsetTop;
          aboutSectionRef.current.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [isAboutVisible]);

  // Add event listeners with passive options for better performance
  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove]);

  return (
    <div className="App">
      <CustomCursor />
      <div className="hero-wrapper">
        <Hero onNavigate={handleNavigation} />
      </div>
      <div className={`content-wrapper ${isAboutVisible ? 'visible' : ''}`}>
        <div 
          className="scrollable-content" 
          ref={aboutSectionRef}
          onScroll={handleContentScroll}
        >
          <About onNavigate={handleNavigation} />
          <Skills />
          <Projects />
          <FindMe />
        </div>
      </div>
    </div>
  );
}

export default App;