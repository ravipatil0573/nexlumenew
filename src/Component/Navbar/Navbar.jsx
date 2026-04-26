import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Navbar.css";

import logoImage from "../../assets/logo.png"; // Import the logo image
import { OptimizedImage } from "../../components/OptimizedImage";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking on a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="">
      <nav className="navbar navbar-dark bg-black">
        <div className="container-fluid px-0">
          {/* Desktop Navigation */}
          <div className="desktop-nav d-none d-lg-flex">
            {/* Left links */}
            <div className="nav-left">
              <Link className="nav-link" to="/projects">
                PROJECTS
              </Link>
              <Link className="nav-link" to="/services">
                SERVICES
              </Link>
            </div>

            {/* Center logo */}
            <div className="nav-center">
              <Link to="/" className="navbar-brand">
                <OptimizedImage
                  src={logoImage}
                  alt="NEXLUME Logo"
                  className="logo-img"
                  priority
                  generateSources={false}
                />
              </Link>
            </div>

            {/* Right links */}
            <div className="nav-right">
              <Link className="nav-link" to="/team">
                TEAM
              </Link>
              <Link className="nav-link" to="/contact">
                CONTACT
              </Link>
            </div>
          </div>

          {/* Mobile view */}
          <div className="d-flex d-lg-none justify-content-between align-items-center w-100">
            <Link to="/" className="navbar-brand">
              <OptimizedImage
                src={logoImage}
                alt="NEXLUME Logo"
                className="logo-img-mobile"
                priority
                generateSources={false}
              />
            </Link>
            <button
              className={`navbar-toggler border-0 ${isMenuOpen ? "active" : ""}`}
              type="button"
              onClick={toggleMenu}
              aria-label="Toggle navigation"
            >
              <span className="hamburger-icon">
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </span>
            </button>
          </div>

          {/* Mobile menu popup overlay */}
          {isMenuOpen && (
            <div className="mobile-menu-overlay">
              <div className="mobile-menu-backdrop" onClick={toggleMenu}></div>
              <div className="mobile-menu-content">
                <ul className="navbar-nav d-lg-none text-center">
                  <li className="nav-item">
                    <Link
                      className="nav-link text-white py-2"
                      to="/projects"
                      onClick={handleLinkClick}
                    >
                      PROJECTS
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-white py-2"
                      to="/services"
                      onClick={handleLinkClick}
                    >
                      SERVICES
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-white py-2"
                      to="/team"
                      onClick={handleLinkClick}
                    >
                      TEAM
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link text-white py-2"
                      to="/contact"
                      onClick={handleLinkClick}
                    >
                      CONTACT
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
