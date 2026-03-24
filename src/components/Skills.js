import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Html } from '@react-three/drei';
import * as THREE from 'three';
import './Skills3D.css';

// Skill data
const skills = [
  { name: "REST APIs", color: "#00b894" },
  { name: "NoSQL", color: "#00b894" },
  { name: "CSS", color: "#00b894" },
  { name: "MongoDB", color: "#00b894" },
  { name: "ROS", color: "#00b894" },
  { name: "TypeScript", color: "#00b894" },
  { name: "Next.js", color: "#00b894" },
  { name: "npm", color: "#00b894" },
  { name: "Redux", color: "#00b894" },
  { name: "macOS", color: "#00b894" },
  { name: "Ubuntu", color: "#00b894" },
  { name: "Win", color: "#00b894" },
  { name: "Bash", color: "#00b894" },
  { name: "Python", color: "#00b894" },
  { name: "Docker", color: "#00b894" },
  { name: "Node.js", color: "#00b894" },
  { name: "React", color: "#00b894" },
  { name: "Mongoose", color: "#00b894" }
];

// Floating skill tag component with responsive scaling
const FloatingTag = ({ position, skill, index, cameraDistance }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  
  // Calculate responsive font size based on screen width
  const getFontSize = () => {
    const width = window.innerWidth;
    if (width < 480) return '8px';
    if (width < 768) return '9px';
    if (width < 1024) return '10px';
    return '11px';
  };
  
  const getPadding = () => {
    const width = window.innerWidth;
    if (width < 480) return '3px 8px';
    if (width < 768) return '4px 10px';
    return '5px 14px';
  };
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.5 + index) * 0.05;
    }
  });

  return (
    <group position={position} ref={meshRef}>
      <Html
        distanceFactor={cameraDistance || 12}
        style={{
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'auto',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        <div
          className={`skill-tag-3d ${hovered ? 'hovered' : ''}`}
          style={{
            backgroundColor: hovered ? `${skill.color}15` : 'white',
            borderColor: skill.color,
            boxShadow: hovered ? `0 4px 20px ${skill.color}30` : '0 2px 8px rgba(0,0,0,0.08)',
            padding: getPadding(),
            fontSize: getFontSize(),
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <span style={{ color: skill.color }}>{skill.name}</span>
        </div>
      </Html>
    </group>
  );
};

// Main 3D Sphere Cloud with responsive radius
const SkillSphere = ({ setLoading, setPositionsGenerated, cameraDistance }) => {
  const groupRef = useRef();
  const [positions, setPositions] = useState([]);
  const [sphereRadius, setSphereRadius] = useState(2.2);
  
  useEffect(() => {
    // Responsive sphere radius based on screen size
    const updateRadius = () => {
      const width = window.innerWidth;
      if (width < 480) return 1.6;
      if (width < 768) return 1.8;
      if (width < 1024) return 2.0;
      if (width < 1440) return 2.2;
      return 2.4;
    };
    
    const radius = updateRadius();
    setSphereRadius(radius);
    
    // Generate positions on sphere surface with Fibonacci sphere algorithm
    const numSkills = skills.length;
    const newPositions = [];
    
    const phi = Math.PI * (3 - Math.sqrt(5));
    
    for (let i = 0; i < numSkills; i++) {
      const y = 1 - (i / (numSkills - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = i * phi * 2;
      
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      
      newPositions.push([x * radius, y * radius, z * radius]);
    }
    
    setPositions(newPositions);
    
    setTimeout(() => {
      setLoading(false);
      setPositionsGenerated(true);
    }, 100);
    
    // Handle resize
    const handleResize = () => {
      const newRadius = updateRadius();
      setSphereRadius(newRadius);
      
      // Regenerate positions with new radius
      const updatedPositions = [];
      for (let i = 0; i < numSkills; i++) {
        const y = 1 - (i / (numSkills - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = i * phi * 2;
        
        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;
        
        updatedPositions.push([x * newRadius, y * newRadius, z * newRadius]);
      }
      setPositions(updatedPositions);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setLoading, setPositionsGenerated]);
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.05;
      groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.1) * 0.03;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Core sphere - subtle glow */}
      <Sphere args={[sphereRadius * 0.73, 64, 64]}>
        <meshStandardMaterial
          color="#00b894"
          emissive="#00b89420"
          transparent
          opacity={0.03}
          wireframe={false}
        />
      </Sphere>
      
      {/* Wireframe sphere */}
      <Sphere args={[sphereRadius * 0.91, 48, 48]}>
        <meshBasicMaterial
          color="#00b894"
          wireframe
          transparent
          opacity={0.08}
        />
      </Sphere>
      
      {/* Floating tags */}
      {positions.length > 0 && positions.map((pos, idx) => (
        <FloatingTag
          key={idx}
          position={pos}
          skill={skills[idx]}
          index={idx}
          cameraDistance={cameraDistance}
        />
      ))}
    </group>
  );
};

// Main Component
const Skills3D = () => {
  const [loading, setLoading] = useState(true);
  const [positionsGenerated, setPositionsGenerated] = useState(false);
  const [cameraDistance, setCameraDistance] = useState(6.5);
  const [cameraFov, setCameraFov] = useState(45);
  
  useEffect(() => {
    // Responsive camera settings
    const updateCamera = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setCameraDistance(5.2);
        setCameraFov(52);
      } else if (width < 768) {
        setCameraDistance(5.8);
        setCameraFov(48);
      } else if (width < 1024) {
        setCameraDistance(6.2);
        setCameraFov(46);
      } else if (width < 1440) {
        setCameraDistance(6.5);
        setCameraFov(45);
      } else {
        setCameraDistance(7);
        setCameraFov(44);
      }
    };
    
    updateCamera();
    window.addEventListener('resize', updateCamera);
    return () => window.removeEventListener('resize', updateCamera);
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (positionsGenerated) {
        setLoading(false);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [positionsGenerated]);
  
  return (
    <section className="skills-3d-section" id="skills">
      <div className="skills-3d-container">
        {/* Left Side - Text Content */}
        <div className="skills-3d-content">
          <div className="skills-badge">
            <span>⚡ Expertise</span>
          </div>
          <h2 className="skills-3d-title">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="skills-3d-subtitle">
            A comprehensive toolkit spanning low-level systems programming to modern full-stack web architectures.
          </p>
          <p className="skills-3d-description">
            Drag and rotate the interactive 3D cloud to explore the languages, frameworks, and tools that power my applications.
          </p>
          
          <div className="skill-stats">
            <div className="stat-item">
              <div className="stat-number">18+</div>
              <div className="stat-label">Technologies</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5+</div>
              <div className="stat-label">Years Experience</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Commitment</div>
            </div>
          </div>
        </div>
        
        {/* Right Side - 3D Cloud */}
        <div className="skills-3d-visual">
          <div className="canvas-wrapper">
            {loading && (
              <div className="loading-overlay">
                <div className="loader"></div>
              </div>
            )}
            
            <Canvas
              camera={{ position: [0, 0, cameraDistance], fov: cameraFov }}
              style={{ background: 'transparent', width: '100%', height: '100%' }}
              gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
              resize={{ scroll: true, debounce: { scroll: 50, resize: 50 } }}
            >
              <ambientLight intensity={0.5} />
              <pointLight position={[5, 5, 5]} intensity={0.6} />
              <pointLight position={[-5, -3, 4]} intensity={0.4} />
              <directionalLight position={[2, 3, 4]} intensity={0.5} />
              <pointLight position={[0, 0, 4]} intensity={0.2} color="#00b894" />
              
              <SkillSphere 
                setLoading={setLoading} 
                setPositionsGenerated={setPositionsGenerated}
                cameraDistance={cameraDistance}
              />
              
              <OrbitControls
                enableZoom={true}
                enablePan={false}
                zoomSpeed={0.8}
                rotateSpeed={1.0}
                autoRotate={false}
                enableDamping={true}
                dampingFactor={0.05}
                minDistance={4}
                maxDistance={10}
                target={[0, 0, 0]}
              />
            </Canvas>
          </div>
          
          <div className="interaction-hint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            <span>Drag to rotate • Scroll to zoom</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills3D;