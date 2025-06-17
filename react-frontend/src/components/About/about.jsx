import React from 'react';
import './about.css';
import profileImg from '../../assets/pratik-profile.jpg'; // ✅ Ensure this path is correct
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const AboutDeveloper = () => {
  return (
    <div className="about-developer">
      <div className="developer-header">
        <img src={profileImg} alt="Pratik Tiwari" className="profile-img" />
        <h2>🚆 Pratik Tiwari</h2>
        <p className="tagline">Full Stack Developer • Tech Explorer • Problem Solver</p>
      </div>

      <div className="developer-content">

        <p>
          I’m a dedicated and growth-focused software developer with a strong foundation in Data Structures, Algorithms, and Full-Stack Web Development. I specialize in building real-world applications using the MERN stack, MySQL, and modern development practices.

          Currently pursuing a B.Tech in Computer Science at SRM University, I actively sharpen my problem-solving skills through coding competitions and hackathons.
        </p>

        <h3>🚀 Projects</h3>
        <ul>
          <li>
            <strong>🚆 YatraGuide:</strong> Full-stack railway booking system with live seat availability, admin panel, secure login, platform & coach positions, and auto-cancellation logic.
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
          <a href="mailto:pratik12122005@gmail.com" target="_blank" rel="noopener noreferrer"><FaEnvelope />E-Mail</a>
          <a href="https://github.com/PratikTiwari05" target="_blank" rel="noopener noreferrer"><FaGithub /> Github</a>
          <a href="https://www.linkedin.com/in/pratik-tiwari05/" target="_blank" rel="noopener noreferrer"><FaLinkedin /> Linkedin</a>
        </div>
      </div>
    </div>
  );
};

export default AboutDeveloper;
