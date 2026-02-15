import React, { useEffect, useRef, useMemo } from "react";
import { ArrowRight, Mail } from "lucide-react";
import profileImage from "../../../assets/Team/aman.jpg";
import "./Hero.css";

export default function Hero() {
  const starsRef = useRef(null);

  // Memoize star count for performance
  const starCount = useMemo(() => 80, []);

  // Generate stars for the background with improved performance
  useEffect(() => {
    const starsContainer = starsRef.current;
    if (!starsContainer) return;

    // Clear existing stars
    starsContainer.innerHTML = "";

    // Use DocumentFragment for better performance
    const fragment = document.createDocumentFragment();

    // Generate minimal stars for cinematic atmosphere
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      star.setAttribute("aria-hidden", "true");
      fragment.appendChild(star);
    }

    starsContainer.appendChild(fragment);
  }, [starCount]);

  // Smooth scroll handler for anchor links
  const handleConnectClick = (e) => {
    const href = e.currentTarget.getAttribute("href");
    if (href && href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return (
    <section
      className="hero-section position-relative min-vh-100 d-flex align-items-center justify-content-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Starry Background */}
      <div
        ref={starsRef}
        className="stars-container position-absolute top-0 start-0 w-100 h-100"
        aria-hidden="true"
      />

      {/* Glowing Horizon Line */}
      <div className="horizon-line" aria-hidden="true" />

      {/* Content Container */}
      <div className="container position-relative z-2">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-8 text-center">
            {/* Coming Soon Banner */}
            <div className="coming-soon-banner mb-4 mb-md-5">
              <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill">
                <span
                  className="coming-soon-badge"
                  aria-label="Coming soon badge"
                >
                  Coming Soon
                </span>
                <span className="banner-text">Nextnode is launching soon!</span>
                <ArrowRight
                  size={16}
                  className="banner-arrow"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="hero-heading mb-4 mb-md-5">
              Transforming ideas into digital experiences
              <br />
              with our agency<em> NexLume</em>
            </h1>

            {/* Personal Introduction */}
            {/* <div className="intro-section mb-4 mb-md-5">
              <p className="intro-text mb-3">
              Welcome to 
              <span className="name-highlight"> <em>NexLume</em></span>
              </p> */}
            {/* <div className="profile-container d-inline-flex align-items-center gap-3 mb-3">
                <div className="profile-image-wrapper">
                  <img
                    src={profileImage}
                    alt="Aayush Bharti - Full Stack Developer"
                    className="profile-image"
                    loading="eager"
                    width="80"
                    height="80"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://ui-avatars.com/api/?name=Aayush+Bharti&size=80&background=6B46C1&color=fff&bold=true";
                    }}
                  />
                </div>
                <span className="role-text">Your Full-Stack Development Partner</span>
              </div> */}
            {/* </div> */}

            {/* Call to Action */}
            <div className="cta-section d-flex flex-column flex-md-row align-items-center justify-content-center gap-3 gap-md-4">
              {/* Let's Connect Button */}
              <a
                href="#contact"
                onClick={handleConnectClick}
                className="connect-btn d-inline-flex align-items-center gap-2 px-4 py-3 rounded-pill text-decoration-none"
                aria-label="Navigate to contact section"
              >
                <span>Let's Connect</span>
                <div className="arrow-circle" aria-hidden="true">
                  <ArrowRight size={18} />
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:hello@aayushbharti.in"
                className="email-link d-inline-flex align-items-center gap-2 text-decoration-none"
                aria-label="Send email to hello@aayushbharti.in"
              >
                <Mail size={20} className="email-icon" aria-hidden="true" />
                <span>nexlume.co@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
