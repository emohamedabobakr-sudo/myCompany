// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import "../App.css";
import myImage from "./EROYS.png";

export default function Navbar({ setPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavClick = (page) => {
    setPage(page);
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <h1 onClick={() => handleNavClick("home")} className="logo">
      <img className="dunb" src={myImage} alt="contact" />
      </h1>

      {isMobile && (
        <div
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
          style={{ fontSize: "28px", cursor: "pointer" }}
        >
          ☰
        </div>
      )}

      <ul className={`nav-links ${isMobile ? (isOpen ? "open" : "") : ""}`}>
        <li onClick={() => handleNavClick("home")}>Home</li>
        <li onClick={() => handleNavClick("about")}>About</li>
        <li onClick={() => handleNavClick("portfolio")}>Portfolio</li>
        <li onClick={() => handleNavClick("contact")}>Contact</li>
      </ul>
    </nav>
  );
}
