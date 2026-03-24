import React, { useEffect, useRef } from 'react';
import './Projects.css';

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 1,
      title: 'Prodexo Platform (Frontend)',
      description: 'A comprehensive professional networking platform integrating social community features, freelance job marketplaces, and gamified skill-building.',
      tech: ['React', 'TypeScript', 'TailwindCSS'],
      links: {
        source: 'https://github.com',
        live: 'https://prodexo.vercel.app'
      }
    },
    {
      id: 2,
      title: 'Prodexo Backend',
      description: 'The official core microfrontend site with robust API architecture and service integration.',
      tech: ['Node.js', 'Express', 'MongoDB', 'Docker'],
      links: {
        source: 'https://github.com',
        live: 'https://api.prodexo.com'
      }
    },
    {
      id: 3,
      title: 'The Wild Oasis (Next.js)',
      description: 'A luxury online hosting platform for premium vacation rentals with seamless booking experience.',
      tech: ['Next.js', 'React', 'TailwindCSS', 'Prisma'],
      links: {
        source: 'https://github.com',
        live: 'https://wild-oasis.vercel.app'
      }
    }
  ];

  return (
    <section className="projects-section" ref={sectionRef} id="projects">
      <div className="projects-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span className="tag-dot"></span>
            <span className="tag-text">PROJECTS</span>
          </div>
          <h2 className="section-title">
            Featured
            <span className="title-highlight"> Work</span>
          </h2>
          <p className="section-subtitle">
            Exploring the intersection of design, technology, and user experience
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          <div className="projects-cards">
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                {/* Folder Icon */}
                <div className="folder-icon">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tech">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>

                {/* Hover Details */}
                <div className="hover-details">
                  <div className="details-content">
                    <div className="details-header">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                      <h4>Project Details</h4>
                    </div>
                    <p className="details-description">{project.description}</p>
                    <div className="details-tech">
                      {project.tech.map((tech, idx) => (
                        <span key={idx} className="detail-tech">{tech}</span>
                      ))}
                    </div>
                    <div className="details-links">
                      <a href={project.links.source} target="_blank" rel="noopener noreferrer" className="details-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                        </svg>
                        Source Code
                      </a>
                      <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="details-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;