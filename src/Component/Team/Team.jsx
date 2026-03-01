import React, { useEffect, useState } from "react";
import "./Team.css";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import API from "../../lib/api";
import { OptimizedImage } from "../../components/OptimizedImage";

const API_BASE = import.meta.env.VITE_API_BASE;

const waitForImageLoad = (src, timeout = 15000) =>
  new Promise((resolve) => {
    if (!src) {
      resolve(true);
      return;
    }

    const img = new Image();
    let settled = false;

    const finish = (ok) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(ok);
    };

    const timer = setTimeout(() => finish(false), timeout);
    img.onload = () => finish(true);
    img.onerror = () => finish(false);
    img.src = src;
  });

const preloadMemberImages = async (list = []) => {
  const sources = list.map((member) => member?.image).filter(Boolean);
  if (!sources.length) return true;
  const results = await Promise.all(
    sources.map((src) => waitForImageLoad(src)),
  );
  return results.every(Boolean);
};

// Import images
import Nikhil from "../../assets/Team/messa.jpg";
import Sanjit from "../../assets/Team/sanju.jpg";
import Ravi from "../../assets/Team/ravi.jpg";
import Aman from "../../assets/Team/aman.jpg";
import Prajwal from "../../assets/Team/Pk.jpg";
import Sanath from "../../assets/Team/anna.jpg";
import GroupImage from "../../assets/Team/group-image.jpg";
import TeamEmailImage from "../../assets/Team/team-email.jpg";

// =========================
// TEAM DATA (fallback demo)
// =========================
const demo = [
  {
    image: Nikhil,
    title: "Nikhil Messa",
    role: "Full Stack Architect",
    handle: "@nikhilmessa",
    bio: "Building scalable web applications with modern technologies",
    url: "https://www.linkedin.com/in/nikhil-messa/",
  },
  {
    image: Sanjit,
    title: "Sanjit Prajapati",
    role: "UI/UX Specialist",
    handle: "@sanjitprajapati",
    bio: "Transforming ideas into stunning digital experiences",
    url: "https://www.linkedin.com/in/sanjit-prajapati-5420a9222/",
  },
  {
    image: Ravi,
    title: "Ravindra Patil",
    role: "Infrastructure Expert",
    handle: "@ravindrapatil",
    bio: "Engineering reliable systems at scale",
    url: "https://www.linkedin.com/in/ravindra-patil-3a2876250/",
  },
  {
    image: Aman,
    title: "Aman Mishra",
    role: "Tech Lead",
    handle: "@amanmishra",
    bio: "Driving technical excellence and team growth",
    url: "https://www.linkedin.com/in/amanmishra107/",
  },
  {
    image: Prajwal,
    title: "Prajwal Kolure",
    role: "Brand Visionary",
    handle: "@prajwalkolure",
    bio: "Crafting compelling visual stories and experiences",
    url: "https://www.linkedin.com/in/prajwal-k-956865328/",
  },
  {
    image: Sanath,
    title: "Sanath Shetty",
    role: "Growth Enabler",
    handle: "@sanathshetty",
    bio: "Connecting technology with business strategy",
    url: "#",
  },
];

// =========================
// TEAM CARD COMPONENT
// =========================
const TeamCard = ({ items = demo }) => {
  return (
    <div className="team-grid">
      {items.map((member, index) => (
        <div key={index} className="team-card" data-index={index}>
          <div className="team-card-inner">
            <div className="team-image-wrapper">
              <OptimizedImage
                src={member.image}
                alt={member.title}
                className="team-image"
                generateSources={false}
              />
              <div className="team-image-overlay"></div>
            </div>

            <div className="team-content">
              <div className="team-header">
                <h3 className="team-name">{member.title}</h3>
                <p className="team-role">{member.role}</p>
              </div>

              {member.bio && <p className="team-bio">{member.bio}</p>}

              <div className="team-footer">
                {member.handle && member.url && (
                  <a
                    href={member.url}
                    className="team-handle-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.title} LinkedIn profile`}
                  >
                    <span className="team-handle">{member.handle}</span>
                    <FaLinkedin className="linkedin-icon" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const TeamCardSkeleton = ({ count = 6 }) => {
  return (
    <div className="team-grid" aria-hidden="true">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="team-card team-card--skeleton">
          <div className="team-card-inner">
            <div className="team-image-wrapper team-image-wrapper--skeleton">
              <span className="team-skeleton team-skeleton-media" />
            </div>
            <div className="team-content">
              <div className="team-header">
                <span className="team-skeleton team-skeleton-name" />
                <span className="team-skeleton team-skeleton-role" />
              </div>
              <span className="team-skeleton team-skeleton-bio" />
              <span className="team-skeleton team-skeleton-bio team-skeleton-bio--short" />
              <div className="team-footer">
                <span className="team-skeleton team-skeleton-handle" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// =========================
// MAIN TEAM COMPONENT
// =========================
const Team = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTeamLoading, setIsTeamLoading] = useState(true);
  const [members, setMembers] = useState([]);

  // Fetch team members from backend (fallback to demo on failure)
  useEffect(() => {
    let isMounted = true;
    const loadTeams = async () => {
      const teamsAPI = API.main || "http://localhost:5000"; // Port 5000 for teams
      if (!teamsAPI) return;
      try {
        const res = await fetch(`${teamsAPI}/api/teams`);
        const json = await res.json();
        const list = Array.isArray(json) ? json : json.data || [];
        const finalMembers = list.length ? list : demo;

        if (!isMounted) return;
        setMembers(finalMembers);

        const imagesLoaded = await preloadMemberImages(finalMembers);
        if (!isMounted) return;

        if (!imagesLoaded) {
          console.warn("Some team images are not loaded yet.");
        }
      } catch (err) {
        console.error("Failed to load teams:", err);
        if (isMounted) {
          setMembers(demo);
          await preloadMemberImages(demo);
        }
      } finally {
        if (isMounted) setIsTeamLoading(false);
      }
    };
    loadTeams();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = `${API_BASE}/api/team/enroll`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Server error:", data);
        alert(data.message || "Something went wrong");
        return;
      }

      alert("Email sent successfully!");
      setEmail(""); // Clear the input on success
    } catch (error) {
      console.error("Fetch failed:", error);
      alert("Network error");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <section id="team" className="team-body">
        <div className="team-hero">
          <div className="team-hero-badge">Our Team</div>
          <h1 className="team-hero-title">
            Meet The Visionaries <br />
            <span className="gradient-text">Behind NexLume</span>
          </h1>
          <p className="team-hero-description">
            A passionate collective of creators, developers, and innovators
            dedicated to transforming ideas into extraordinary digital
            experiences.
          </p>
        </div>

        <div className="team-stats">
          <div className="stat-item">
            <div className="stat-number">6+</div>
            <div className="stat-label">Team Members</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Projects Delivered</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Client Satisfaction</div>
          </div>
        </div>

        <div id="teams" className="team-main-container">
          {isTeamLoading ? (
            <TeamCardSkeleton count={6} />
          ) : (
            <TeamCard items={members.length ? members : demo} />
          )}
        </div>
      </section>

      <section className="about-us-section">
        <div className="about-us-container">
          <div className="about-us-content">
            <div className="about-us-badge">About Us</div>
            <h2 className="about-us-title">
              Building the <span className="gradient-text">Future</span> of
              Digital Innovation
            </h2>
            <p className="about-us-description">
              At NexLume, we're more than just a team — we're a family of
              passionate innovators committed to pushing the boundaries of
              what's possible in the digital world. Founded with a vision to
              transform ideas into reality, we combine cutting-edge technology
              with creative excellence to deliver exceptional solutions.
            </p>
            <p className="about-us-description">
              Our journey began with a simple belief: that great software should
              not only solve problems but should inspire and delight users.
              Today, we've helped countless businesses bring their visions to
              life through custom web applications, mobile solutions, and
              stunning digital experiences.
            </p>
            <div className="about-us-values">
              <div className="value-item">
                <div className="value-icon">🎯</div>
                <h3>Mission-Driven</h3>
                <p>
                  Empowering businesses through innovative digital solutions
                </p>
              </div>
              <div className="value-item">
                <div className="value-icon">💡</div>
                <h3>Innovation First</h3>
                <p>
                  Embracing cutting-edge technologies and creative approaches
                </p>
              </div>
              <div className="value-item">
                <div className="value-icon">🤝</div>
                <h3>Client-Centric</h3>
                <p>Your success is our success, always</p>
              </div>
            </div>
          </div>
          <div className="about-us-image">
            <OptimizedImage
              src={GroupImage}
              alt="NexLume Team"
              className="about-group-image"
              generateSources={false}
            />
          </div>
        </div>
      </section>

      <div
        className="join-team"
        style={{ backgroundImage: `url(${TeamEmailImage})` }}
      >
        <div className="join-container">
          <h2 className="join-title">Join Our Growing Team</h2>
          <p className="join-subtitle">
            Be part of something extraordinary. We're always looking for
            talented individuals who share our passion for innovation.
          </p>
          <div className="form-container">
            <input
              type="email"
              placeholder="Enter your email address"
              className="email-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="button"
              className="apply-button"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="button-spinner"></span>
                  Sending...
                </>
              ) : (
                <>
                  Join Us
                  <svg
                    className="button-arrow"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M4 10h12M12 6l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
          <p className="contact-info">
            Or reach out directly at{" "}
            <Link to="mailto:nexlume.co@gmail.com" className="contact-link">
              nexlume.co@gmail.com
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Team;
