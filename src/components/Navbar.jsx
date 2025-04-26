import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');

  // Function to handle scroll and detect active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.6, // Trigger when 60% of the section is visible
      }
    );

    // Observe all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach((section) => observer.observe(section));

    // Cleanup observer on unmount
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);


  return (
    <>
    <nav className={`navbar ${activeSection !== 'home' ? 'scrolled' : ''}`}>
        

      <div className="logo">
        <a href='#home'>
          <img src='/vite.svg' alt='logo'></img>
        </a>
      </div>
      <ul className="nav-links">
        <li>
          <a
            href="#home"
            className={activeSection === 'home' ? 'active' : ''}
          >
            Home
            

          </a>
        </li>
        <li>
          <a
            href="#about"
            className={activeSection === 'about' ? 'active' : ''}
          >
            Model
          </a>
        </li>
        <li>
          <a
            href="#services"
            className={activeSection === 'services' ? 'active' : ''}
          >
            Services
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className={activeSection === 'contact' ? 'active' : ''}
          >
            Contact
          </a>
        </li>
      </ul>
    </nav>
    </>
  );
};

export default Navbar;