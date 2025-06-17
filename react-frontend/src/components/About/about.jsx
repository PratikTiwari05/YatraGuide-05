import React from 'react';
import './about.css';
import profileImg from '../../assets/pratik-profile.jpg'; // ✅ Ensure this path is correct
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const AboutDeveloper = () => {
  return (
    <div className="about-developer">
      <div className="developer-header">
        <img src={profileImg} alt="Pratik Tiwari" className="profile-img" />
        <h2>Pratik Tiwari</h2>
        <p className="tagline">Full Stack Developer • Tech Explorer • Problem Solver</p>
      </div>

      <div className="developer-content">
        <p>
          I'm <strong>Pratik Tiwari</strong>, a B.Tech Computer Science student at SRM Institute of Science and Technology, Ghaziabad, with a
          <strong> CGPA of 8.5</strong>. I specialize in the <strong>MERN stack</strong> (MongoDB, Express.js, React.js, Node.js) and love building clean,
          efficient, real-world applications.
        </p>
        <p>
          I believe in continuous learning and applying concepts to solve practical problems. I'm an active participant in hackathons and workshops, and I enjoy collaborating on impactful projects.
        </p>

        <h3>🚀 Projects</h3>
        <ul>
          <li>
            <strong>YatraGuide:</strong> Full-stack railway booking system with live seat availability, admin panel, secure login, and auto-cancellation.
          </li>
          <li>
            <strong>CryptoVista:</strong> Real-time cryptocurrency tracker with live price updates, market trends, and portfolio management features.
          </li>
          <li>
            <strong>Weather App:</strong> Real-time weather updates using React + OpenWeatherMap API.
          </li>
          <li>
            <strong>Jewellery Website:</strong> Product showcase with responsive design, filters, and image carousel.
          </li>
        </ul>

        <h3>🧭 Hobbies & Interests</h3>
        <p>
          I love <strong>traveling, trekking, exploring mountains, driving cars</strong>, and solving real-world problems using my learnings from Computer Science.
        </p>

        <h3>📬 Contact Me</h3>
        <div className="contact-links">
          <a href="mailto:pratik12122005@gmail.com" target="_blank" rel="noopener noreferrer"><FaEnvelope /> Gmail</a>
          <a href="https://github.com/PratikTiwari" target="_blank" rel="noopener noreferrer"><FaGithub /> GitHub</a>
          <a href="https://www.linkedin.com/in/pratik-tiwari" target="_blank" rel="noopener noreferrer"><FaLinkedin /> LinkedIn</a>
          <a href="https://instagram.com/pratik__tiwari" target="_blank" rel="noopener noreferrer"><FaInstagram /> Instagram</a>
        </div>
      </div>
    </div>
  );
};

export default AboutDeveloper;
