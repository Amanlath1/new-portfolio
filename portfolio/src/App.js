// /src/App.js

import React, { useState } from 'react';
import './App.css';
import { resumeData } from './resumeData';
import Quote from './components/Quote';
import Background3D from './components/Background3D';
import bitmoji from './assets/bitmoji.png';
import ContactForm from './components/ContactForm';
import { useFadeIn } from './hooks/useFadeIn';

function App() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const [isProfileVisible, profileRef] = useFadeIn();
  const [isExperienceVisible, experienceRef] = useFadeIn();
  const [isEducationVisible, educationRef] = useFadeIn();
  const [isProjectsVisible, projectsRef] = useFadeIn();
  const [isSkillsVisible, skillsRef] = useFadeIn();
  const [isContactVisible, contactRef] = useFadeIn();

  const handleMouseMove = (e) => {
    const header = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - header.left;
    const mouseY = e.clientY - header.top;
    const x = (mouseY - header.height / 2) / header.height;
    const y = (mouseX - header.width / 2) / header.width;
    const intensity = 15;
    setRotate({ x: x * intensity, y: y * -intensity });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <>
      <Background3D />
      <div className="container">
        <header onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <div 
            className="bitmoji-container" 
            style={{ 
              transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` 
            }}
          >
            <img src={bitmoji} alt="Aman's Bitmoji" className="bitmoji-hello" />
          </div>

          <h1>{resumeData.name}</h1>

          <a 
            href="/AmanLath_Resume.pdf"
            download="AmanLath_Resume.pdf"
            className="download-btn"
          >
            Download Resume
          </a>

          <p>
            {resumeData.location} | {resumeData.email} | {resumeData.phone}
          </p>
          <p>
            <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </p>
        </header>

        <Quote />

        <main>
          <section ref={profileRef} className={`fade-in-section ${isProfileVisible ? 'is-visible' : ''}`}>
            <h2>Profile</h2>
            {resumeData.profile.map((item, index) => (
              <p key={index}>{item}</p>
            ))}
          </section>
          
          <section ref={experienceRef} className={`fade-in-section ${isExperienceVisible ? 'is-visible' : ''}`}>
            <h2>Experience</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="item">
                <h3>{exp.title}</h3>
                <p><strong>{exp.company}</strong> | {exp.duration}</p>
                <ul>
                  {exp.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section ref={educationRef} className={`fade-in-section ${isEducationVisible ? 'is-visible' : ''}`}>
            <h2>Education</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="item">
                <h3>{edu.degree}</h3>
                <p><strong>{edu.university}</strong> | {edu.duration}</p>
                {edu.cgpa && <p>CGPA: {edu.cgpa}</p>}
              </div>
            ))}
          </section>

          <section ref={projectsRef} className={`fade-in-section ${isProjectsVisible ? 'is-visible' : ''}`}>
            <h2>Projects</h2>
            {resumeData.projects.map((project, index) => (
              <div key={index} className="item">
                <h3>{project.title}</h3>
                <p><em>Technologies: {project.technologies}</em></p>
                <ul>
                  {project.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          
          <section ref={skillsRef} className={`fade-in-section ${isSkillsVisible ? 'is-visible' : ''}`}>
            <h2>Skills</h2>
            <div className="skills-grid">
              <div>
                <h3>Web</h3>
                <p>{resumeData.skills.web.join(', ')}</p>
              </div>
              <div>
                <h3>DevOps</h3>
                <p>{resumeData.skills.devops.join(', ')}</p>
              </div>
              <div>
                <h3>Data Science</h3>
                <p>{resumeData.skills.dataScience.join(', ')}</p>
              </div>
              <div>
                <h3>Languages</h3>
                <p>{resumeData.skills.languages.join(', ')}</p>
              </div>
            </div>
          </section>
        </main>
        
        <section ref={contactRef} className={`fade-in-section ${isContactVisible ? 'is-visible' : ''} contact-section`}>
          <h2>Contact Me</h2>
          <p>Have a question or want to work together? Leave a message!</p>
          <ContactForm />
        </section>
      </div>
    </>
  );
}

export default App;