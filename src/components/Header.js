import React, { useState, useEffect } from "react";
import "./Header.css";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-content">
        <div className="logo">
          {/* <div className="logo-icon">
            <span>B</span>
            <span className="heart-symbol">♥</span>
            <span>D</span>
          </div> */}
          <span className="logo-text">BIN & DIEU</span>
        </div>
        <nav className="nav">
          <button onClick={() => scrollToSection("hero")}>Home</button>
          <button onClick={() => scrollToSection("about")}>About Us</button>
          <button onClick={() => scrollToSection("story")}>Our Story</button>
          <button onClick={() => scrollToSection("memories")}>Memories</button>
        </nav>
        <div className="header-buttons">
          <button className="btn-login">Khám phá</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
