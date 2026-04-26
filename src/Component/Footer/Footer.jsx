import React from "react";
import "./Footer.css";
import logoImage from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { OptimizedImage } from "../../components/OptimizedImage";

const Footer = () => {
  return (
    <footer className="footer py-5">
      <div className="container">
        <div className="row align-items-center mb-4">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <Link to="/" className="footer-logo-link">
              <OptimizedImage
                src={logoImage}
                alt="Nexlume"
                className="footer-logo"
                priority
                generateSources={false}
              />
            </Link>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <div className="social-links-container">
              <div className="follow-us mb-4 ">Follow Us</div>
              <div className="social-links">
                <Link to="/" className="social-link">
                  <i className="bi bi-facebook"></i>
                </Link>
                <Link to="/" className="social-link">
                  <i className="bi bi-twitter-x"></i>
                </Link>
                <Link to="/" className="social-link">
                  <i className="bi bi-instagram"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <div className="contact-email">
              <Link to="/">nexlume.co@gmail.com</Link>
            </div>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <span className="copyright">
              Nexlume &copy; 2025 All Rights Reserved
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
