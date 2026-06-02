import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaLinkedin, FaGithub, FaFileDownload, FaTrophy, FaUsers, FaExternalLinkAlt } from 'react-icons/fa';
import './App.css';


// 🚀 EASY PROJECT MANAGEMENT: Add your GitHub links here!
const projectList = [
  { 
    title: "OpenBook", 
    desc: " Built with a responsive React frontend and a robust Django backend, the platform intelligently cross-references user interests, language selections, and current emotional moods to deliver highly accurate book matches.", 
    tech: ["frontend- react.js" ," Backend- node.js, Express.js, Restful API architecture"],
    githubLink: "https://github.com" // Replace with your link
  },
  { 
    title: "Ecommerce web Ecosystem", 
    desc: "A responsive , end to end fullstack e commerce application featuring real-time inventory tracking , secure user authenticattion and seamless payment  gateway integration", 
    tech: ["frontend- react.js" ," Backend- node.js, Express.js, Restful API architecture"],
    githubLink: "https://github.com" // Replace with your link
  },
  { 
    title: "Data Structure Algorithm Tracker", 
    desc: " A full-stack web application designed to help developers master coding interviews by tracking, organizing, and visualizing their DSA practice. Features robust search filters, progress analytics, and a responsive UI to streamline daily interview preparation.", 
    tech: ["frontend- react.js" ," Backend- node.js, Express.js, Restful API architecture"],
    githubLink: "https://github.com" // Replace with your link
  }
];


// 🏆 EASY ACHIEVEMENTS MANAGEMENT: Put your achievement pic inside the public/ folder!
const achievementsList = [
  {
    title: "Google Gemini Student Ambassador (GSAP 2026)",
    detail: "Selected for Google's official campus leadership program to spearhead AI communities and technological initiatives.",
    date: "2025",
    image: "GSA.jpeg" // Path to your small picture in the public directory
  },
  {
    title: "National Means-cum-Merit Scholarship (NMMS) Achiever",
    detail: " Awarded by the Ministry of Education, Government of India, recognizing academic excellence and top performance in the state-level competitive examination. And unfortunately i got scholarship for 2 years only ",
    date: "2019",
    image: "NMMS.png" // Path to your small picture in the public directory
  },
  {
    title: " Sankalpa Achiever ",
    detail: " Selected through a highly competitive selection test to receive fully-sponsored access to the premium GATE Computer Science program by GO Classes",
    date: "2026",
    image: "san.jpeg" // Path to your small picture in the public directory
  },
];

// 🌟 EASY EXTRA-CURRICULAR MANAGEMENT: Add your activities here!
const activitiesList = [
  {
    role: " Cadet",
    organization: " National Cadet Corps (NCC)  🇮🇳️",
    description: "Discipline is the bridge between goals and accomplishment. Proud of my NCC journey."
  },
  {
    role: "R & D ",
    organization: "Artix Club",
    description: "The Artix Club focuses on student-driven initiatives in public speaking, communication, and research paper mentorship to build students' confidence, articulation, and academic skills."
  }
];

function App() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    trackAction('Main Portfolio Landing');
  }, []);
   const trackAction = (sectionName) => {
  // 🌟 Ensure there is a '/' right after 'track'
  axios.post('http://localhost:8000/api/track/', { page: sectionName })
    .then(response => console.log(`Logged view for: ${sectionName}`))
    .catch(error => console.error('Error logging metrics view:', error));
};

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

   const handleSubmit = (e) => {
    e.preventDefault();
    
    // Package form data + flag to tell Django this is a text message submission
    const payload = {
      isForm: true,
      name: formData.name,
      email: formData.email,
      message: formData.message
    };

    // Post data straight to Django database tables
    axios.post('http://localhost:8000/api/track/', payload)
      .then(response => {
        setSubmitStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        
        // Also log a standard analytics track event to know they submitted successfully
        trackAction(`Submitted Form: From ${formData.email}`);
      })
      .catch(error => {
        console.error('Error submitting contact form message:', error);
        setSubmitStatus('Failed to send message. Please try again.');
      });

    setTimeout(() => setSubmitStatus(''), 4000);
  };


  return (
    <div className="portfolio-wrapper">
      <div className="tech-node blob-purple"></div>
      <div className="tech-node blob-cyan"></div>
      <div className="tech-node blob-amber"></div>
      <div className="tech-grid-overlay"></div>

      <div className="scrollable-content-stream">
        <main className="glass-container section-spacing">
         <header className="profile-header">
  <div className="status-badge">Available for Projects</div>
  
 {/* 🌟 FIXED: Points cleanly to your image file inside your public folder */}
<div className="profile-pic-container">
  <img src="SriramsettyDeepikamadhuri .jpg" alt="Deepika's Profile" className="profile-pic" />
</div>


  <h1>Deepika Madhuri Sriramsetty</h1>
  <h2>Full-Stack Developer</h2>
</header>

          <section className="about-text">
            <p>
              Building elegant, high-performance web applications using robust Python backends 
              and fluid React interfaces. Welcome to my custom portfolio workspace.
            </p>
          </section>
          <div className="action-group">
            <a href="#projects" className="btn btn-primary" onClick={() => trackAction('Clicked View Work Button')}>View Work</a>
            <a href="#connect" className="btn btn-secondary" onClick={() => trackAction('Clicked Connect Button')}>Let's Connect</a>
          </div>
        </main>

        {/* 🌟 UPDATED PROJECTS SECTION: Clickable titles with GitHub links & Tracking */}
        <section id="projects" className="section-spacing width-limiter" onMouseEnter={() => trackAction('Scrolled to Projects')}>
          <h3 className="section-title">Featured Engineering</h3>
          <div className="projects-grid">
            {projectList.map((proj, idx) => (
              <div key={idx} className="glass-container project-card">
                <div className="project-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h4 style={{ margin: 0 }}>{proj.title}</h4>
                  {proj.githubLink && (
                    <a 
                      href={proj.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-github-link"
                      onClick={() => trackAction(`Clicked Project Link: ${proj.title}`)}
                    >
                      <FaExternalLinkAlt size={16} />
                    </a>
                  )}
                </div>
                <p>{proj.desc}</p>
                <div className="tech-tag-row">
                  {proj.tech.map((t, i) => <span key={i} className="tech-tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>
       {/* ACHIEVEMENTS SECTION */}
        <section id="achievements" className="section-spacing width-limiter" onMouseEnter={() => trackAction('Scrolled to Achievements')}>
          <h3 className="section-title">Key Achievements</h3>
          <div className="info-list-grid">
            {achievementsList.map((ach, idx) => (
              <div key={idx} className="glass-container list-item-card">
                <div className="card-icon-title-row">
                  {ach.image ? (
                    <div className="achievement-pic-container">
                      <img src={ach.image} alt={ach.title} className="achievement-pic" />
                    </div>
                  ) : (
                    <FaTrophy className="card-icon golden-glow" size={22} />
                  )}
                  <div className="card-text-block">
                    <div className="card-header-split">
                      <h4>{ach.title}</h4>
                      <span className="card-date-badge">{ach.date}</span>
                    </div>
                    <p>{ach.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EXTRA-CURRICULAR ACTIVITIES SECTION */}
        <section id="activities" className="section-spacing width-limiter" onMouseEnter={() => trackAction('Scrolled to Activities')}>
          <h3 className="section-title">Extra-Curricular Activities</h3>
          <div className="info-list-grid">
            {activitiesList.map((act, idx) => (
              <div key={idx} className="glass-container list-item-card">
                <div className="card-icon-title-row">
                  <FaUsers className="card-icon cyan-glow" size={22} />
                  <div className="card-text-block">
                    <h4>{act.role}</h4>
                    <h5>{act.organization}</h5>
                    <p>{act.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="connect" className="section-spacing width-limiter" onMouseEnter={() => trackAction('Scrolled to Connect Section')}>
          <h3 className="section-title">Let's Connect 🔗️</h3>
          <div className="glass-container connect-card-wrapper" style={{ display: 'flex', justifyContent: 'center', gap: '40px', padding: '3rem', flexWrap: 'wrap' }}>
            <a href="https://www.linkedin.com/in/deepika-madhuri-sriramsetty-216995328/?skipRedirect=true" target="_blank" rel="noopener noreferrer" className="connect-icon-link" onClick={() => trackAction('Clicked LinkedIn Link')}>
              <FaLinkedin size={50} className="icon-linkedin" />
              <span>LinkedIn</span>
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="connect-icon-link" onClick={() => trackAction('Clicked GitHub Link')}>
              <FaGithub size={50} className="icon-github" />
              <span>GitHub</span>
            </a>
            <a href="/your-resume.pdf" target="_blank" rel="noopener noreferrer" className="connect-icon-link" onClick={() => trackAction('Clicked Resume Link')}>
              <FaFileDownload size={50} className="icon-resume" />
              <span>Resume</span>
            </a>
          </div>
        </section>

        <section id="contact" className="section-spacing width-limiter" onMouseEnter={() => trackAction('Scrolled to Contact Form')}>
          <h3 className="section-title">Initiate A Project</h3>
          <div className="glass-container form-card-wrapper">
            <form onSubmit={handleSubmit} className="portfolio-form">
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Alex Carter" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="alex@example.com" required />
              </div>
              <div className="form-group">
                <label>Project Details</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} rows="4" placeholder="Let's build something exceptional..." required></textarea>
              </div>
              <button type="submit" className="btn btn-primary form-submit-btn">Send Message</button>
              {submitStatus && <p className="success-banner">{submitStatus}</p>}
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
