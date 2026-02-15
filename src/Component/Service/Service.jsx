import React, { useState } from "react";
import "./Services.css";
import "./FlowingMenu.css";
import { gsap } from "gsap";

// ================= Shared Icon Function =================
// Professional SVG-based icons for software agency portfolio
const getCreativeIcon = (type) => {
  const icons = {
    "Website Development": (
      <svg viewBox="0 0 100 100" className="creative-icon">
        <defs>
          <linearGradient id="webdevGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#667eea", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#764ba2", stopOpacity: 1 }}
            />
          </linearGradient>
          <linearGradient id="webdevGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "#667eea", stopOpacity: 0.3 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#764ba2", stopOpacity: 0.3 }}
            />
          </linearGradient>
        </defs>
        {/* Browser Window - Professional */}
        <rect
          x="10"
          y="18"
          width="80"
          height="64"
          rx="4"
          fill="url(#webdevGrad)"
          opacity="0.95"
        />
        <rect
          x="10"
          y="18"
          width="80"
          height="64"
          rx="4"
          fill="none"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="2"
        />
        {/* Browser Header Bar */}
        <rect
          x="10"
          y="18"
          width="80"
          height="14"
          rx="4"
          fill="rgba(255,255,255,0.15)"
        />
        {/* Navigation Dots - Minimal */}
        <circle cx="20" cy="25" r="2.5" fill="rgba(255,255,255,0.8)" />
        <circle cx="28" cy="25" r="2.5" fill="rgba(255,255,255,0.6)" />
        <circle cx="36" cy="25" r="2.5" fill="rgba(255,255,255,0.6)" />
        {/* Code Structure - Professional */}
        <rect
          x="18"
          y="38"
          width="64"
          height="3"
          rx="1.5"
          fill="rgba(255,255,255,0.7)"
        />
        <rect
          x="18"
          y="46"
          width="48"
          height="3"
          rx="1.5"
          fill="rgba(255,255,255,0.5)"
        />
        <rect
          x="18"
          y="54"
          width="56"
          height="3"
          rx="1.5"
          fill="rgba(255,255,255,0.6)"
        />
        <rect
          x="18"
          y="62"
          width="40"
          height="3"
          rx="1.5"
          fill="rgba(255,255,255,0.4)"
        />
        <rect
          x="18"
          y="70"
          width="52"
          height="3"
          rx="1.5"
          fill="rgba(255,255,255,0.5)"
        />
      </svg>
    ),
    "Web Design": (
      <svg viewBox="0 0 100 100" className="creative-icon">
        <defs>
          <linearGradient id="designGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#fa709a", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#fee140", stopOpacity: 1 }}
            />
          </linearGradient>
          <linearGradient id="designGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#30cfd0", stopOpacity: 0.6 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#330867", stopOpacity: 0.6 }}
            />
          </linearGradient>
        </defs>
        {/* Design Canvas - Professional */}
        <rect
          x="15"
          y="15"
          width="70"
          height="70"
          rx="6"
          fill="url(#designGrad)"
          opacity="0.95"
        />
        <rect
          x="15"
          y="15"
          width="70"
          height="70"
          rx="6"
          fill="none"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="2"
        />
        {/* Grid Layout Structure */}
        <line
          x1="30"
          y1="30"
          x2="30"
          y2="80"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
        />
        <line
          x1="50"
          y1="30"
          x2="50"
          y2="80"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
        />
        <line
          x1="70"
          y1="30"
          x2="70"
          y2="80"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
        />
        <line
          x1="15"
          y1="45"
          x2="85"
          y2="45"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
        />
        <line
          x1="15"
          y1="60"
          x2="85"
          y2="60"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="1.5"
        />
        {/* Design Elements - Geometric */}
        <rect
          x="35"
          y="35"
          width="12"
          height="8"
          rx="2"
          fill="rgba(255,255,255,0.6)"
        />
        <rect
          x="55"
          y="35"
          width="12"
          height="8"
          rx="2"
          fill="rgba(255,255,255,0.5)"
        />
        <rect
          x="35"
          y="50"
          width="32"
          height="8"
          rx="2"
          fill="rgba(255,255,255,0.4)"
        />
        <rect
          x="35"
          y="65"
          width="20"
          height="8"
          rx="2"
          fill="rgba(255,255,255,0.5)"
        />
      </svg>
    ),
    "Android Development": (
      <svg viewBox="0 0 100 100" className="creative-icon">
        <defs>
          <linearGradient id="androidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#3ddc84", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#2ecc71", stopOpacity: 1 }}
            />
          </linearGradient>
          <linearGradient id="androidGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#1a1a1a", stopOpacity: 0.9 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#2d2d2d", stopOpacity: 0.9 }}
            />
          </linearGradient>
        </defs>
        {/* Phone Body - Professional */}
        <rect
          x="25"
          y="20"
          width="50"
          height="60"
          rx="6"
          fill="url(#androidGrad)"
          opacity="0.95"
        />
        <rect
          x="25"
          y="20"
          width="50"
          height="60"
          rx="6"
          fill="none"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="2"
        />
        {/* Screen */}
        <rect
          x="30"
          y="28"
          width="40"
          height="44"
          rx="3"
          fill="url(#androidGrad2)"
        />
        {/* Status Bar */}
        <rect
          x="30"
          y="28"
          width="40"
          height="4"
          rx="3"
          fill="rgba(255,255,255,0.2)"
        />
        {/* App Icons Grid - Professional */}
        <rect
          x="35"
          y="38"
          width="8"
          height="8"
          rx="1.5"
          fill="rgba(61,220,132,0.6)"
        />
        <rect
          x="46"
          y="38"
          width="8"
          height="8"
          rx="1.5"
          fill="rgba(61,220,132,0.5)"
        />
        <rect
          x="57"
          y="38"
          width="8"
          height="8"
          rx="1.5"
          fill="rgba(61,220,132,0.4)"
        />
        <rect
          x="35"
          y="50"
          width="8"
          height="8"
          rx="1.5"
          fill="rgba(61,220,132,0.5)"
        />
        <rect
          x="46"
          y="50"
          width="8"
          height="8"
          rx="1.5"
          fill="rgba(61,220,132,0.4)"
        />
        <rect
          x="57"
          y="50"
          width="8"
          height="8"
          rx="1.5"
          fill="rgba(61,220,132,0.3)"
        />
        {/* Navigation Bar */}
        <rect
          x="30"
          y="66"
          width="40"
          height="4"
          rx="2"
          fill="rgba(255,255,255,0.3)"
        />
      </svg>
    ),
    "Logo Design": (
      <svg viewBox="0 0 100 100" className="creative-icon">
        <defs>
          <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#f59e0b", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#ef4444", stopOpacity: 1 }}
            />
          </linearGradient>
          <linearGradient id="logoGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#667eea", stopOpacity: 0.8 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#764ba2", stopOpacity: 0.8 }}
            />
          </linearGradient>
        </defs>
        {/* Main Logo Mark - Professional */}
        <circle cx="50" cy="38" r="16" fill="url(#logoGrad)" opacity="0.95" />
        <circle
          cx="50"
          cy="38"
          r="16"
          fill="none"
          stroke="rgba(255,255,255,0.9)"
          strokeWidth="2"
        />
        {/* Letter "L" - Clean Typography */}
        <path
          d="M 42 30 L 42 46 L 58 46"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Brand Identity Elements - Professional */}
        <rect
          x="30"
          y="58"
          width="40"
          height="3"
          rx="1.5"
          fill="url(#logoGrad2)"
        />
        <rect
          x="35"
          y="66"
          width="30"
          height="2.5"
          rx="1.25"
          fill="url(#logoGrad2)"
          opacity="0.8"
        />
        <rect
          x="40"
          y="73"
          width="20"
          height="2"
          rx="1"
          fill="url(#logoGrad2)"
          opacity="0.6"
        />
      </svg>
    ),
    "E-commerce Solutions": (
      <svg viewBox="0 0 100 100" className="creative-icon">
        <defs>
          <linearGradient id="ecomGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#10b981", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#059669", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <rect
          x="25"
          y="30"
          width="50"
          height="45"
          rx="4"
          fill="url(#ecomGrad)"
          opacity="0.9"
        />
        <rect
          x="25"
          y="30"
          width="50"
          height="45"
          rx="4"
          fill="none"
          stroke="rgba(255,255,255,0.8)"
          strokeWidth="2"
        />
        <path
          d="M 35 40 L 40 50 L 50 35"
          stroke="white"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="42" cy="60" r="4" fill="white" opacity="0.9" />
        <circle cx="58" cy="60" r="4" fill="white" opacity="0.9" />
        <path
          d="M 35 45 Q 40 50, 45 45"
          stroke="white"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),
    "UI/UX Design": (
      <svg viewBox="0 0 100 100" className="creative-icon">
        <defs>
          <linearGradient id="uiuxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#8b5cf6", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#6366f1", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <rect
          x="20"
          y="25"
          width="60"
          height="50"
          rx="6"
          fill="url(#uiuxGrad)"
          opacity="0.9"
        />
        <rect
          x="28"
          y="35"
          width="20"
          height="3"
          rx="1.5"
          fill="white"
          opacity="0.9"
        />
        <rect
          x="28"
          y="42"
          width="44"
          height="2"
          rx="1"
          fill="white"
          opacity="0.7"
        />
        <rect
          x="28"
          y="48"
          width="36"
          height="2"
          rx="1"
          fill="white"
          opacity="0.6"
        />
        <circle cx="65" cy="60" r="8" fill="white" opacity="0.3" />
        <path
          d="M 30 60 L 45 60"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    ),
    "SEO Optimization": (
      <svg viewBox="0 0 100 100" className="creative-icon">
        <defs>
          <linearGradient id="seoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#f59e0b", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#d97706", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <circle
          cx="45"
          cy="40"
          r="18"
          fill="none"
          stroke="url(#seoGrad)"
          strokeWidth="4"
        />
        <path
          d="M 58 53 L 70 65"
          stroke="url(#seoGrad)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M 35 35 L 42 42 L 52 28"
          stroke="url(#seoGrad)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    "Brand Strategy": (
      <svg viewBox="0 0 100 100" className="creative-icon">
        <defs>
          <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              style={{ stopColor: "#ec4899", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#be185d", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <polygon
          points="50,25 70,40 65,65 35,65 30,40"
          fill="url(#brandGrad)"
          opacity="0.9"
        />
        <circle cx="50" cy="45" r="12" fill="white" opacity="0.3" />
        <path
          d="M 45 45 L 50 50 L 60 35"
          stroke="white"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };
  return icons[type] || icons["Website Development"];
};

// ================= FlowingMenu Component =================
function FlowingMenu({ items = [] }) {
  return (
    <div className="menu-wrap">
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, imageType }) {
  const itemRef = React.useRef(null);
  const marqueeRef = React.useRef(null);
  const marqueeInnerRef = React.useRef(null);

  const animationDefaults = { duration: 0.6, ease: "expo" };

  const distMetric = (x, y, x2, y2) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
  };

  const handleMouseEnter = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" }, 0);
  };

  const handleMouseLeave = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0);
  };

  const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span>{text}</span>
      <div className={`marquee__img marquee__img--${imageType}`}>
        {getCreativeIcon(text)}
      </div>
    </React.Fragment>
  ));

  return (
    <div className="menu__item" ref={itemRef}>
      <a
        className="menu__item-link"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </a>
      <div className="marquee" ref={marqueeRef}>
        <div className="marquee__inner-wrap" ref={marqueeInnerRef}>
          <div className="marquee__inner" aria-hidden="true">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= Main Services Page =================
const Services = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All Services");
  const toggleFaq = (id) => setOpenFaq(openFaq === id ? null : id);

  // Demo items for FlowingMenu with creative icon types
  const demoItems = [
    {
      link: "#",
      text: "Website Development",
      imageType: "webdev",
      description:
        "Custom websites built with cutting-edge technologies for optimal performance",
      category: "Development",
    },
    {
      link: "#",
      text: "Web Design",
      imageType: "webdesign",
      description:
        "Stunning, user-friendly interfaces that captivate and convert visitors",
      category: "Design",
    },
    {
      link: "#",
      text: "Android Development",
      imageType: "android",
      description:
        "Native and cross-platform mobile apps with seamless user experiences",
      category: "Development",
    },
    {
      link: "#",
      text: "Logo Design",
      imageType: "logo",
      description:
        "Memorable brand identities that make your business stand out",
      category: "Design",
    },
    {
      link: "#",
      text: "E-commerce Solutions",
      imageType: "ecommerce",
      description:
        "Complete online stores with secure payment gateways and inventory management",
      category: "Development",
    },
    {
      link: "#",
      text: "UI/UX Design",
      imageType: "uiux",
      description:
        "Research-driven design that enhances user satisfaction and engagement",
      category: "Design",
    },
    {
      link: "#",
      text: "SEO Optimization",
      imageType: "seo",
      description: "Boost your visibility and rank higher on search engines",
      category: "Marketing",
    },
    {
      link: "#",
      text: "Brand Strategy",
      imageType: "branding",
      description: "Comprehensive brand guidelines and positioning strategies",
      category: "Design",
    },
  ];

  const faqs = [
    {
      id: 1,
      question: "Why choose Nexlume?",
      answer:
        "With Nexlume, you gain a skilled, multi-disciplinary team specializing in web, software, app development, and branding—delivering top-quality solutions without the cost of full-time hires.",
    },
    {
      id: 2,
      question: "How fast can we deliver?",
      answer:
        "Websites: 7-14 days, Android Apps: 3-6 weeks, Logos: 2-3 days. We balance speed and quality for exceptional results.",
    },
    {
      id: 3,
      question: "How do you track progress?",
      answer:
        "We provide regular updates via email, project management tools, or scheduled meetings, ensuring full transparency at every stage.",
    },
    {
      id: 4,
      question: "How to request a project?",
      answer:
        "Simply contact us via our website or email, share your requirements, and receive a custom proposal and timeline.",
    },
  ];

  // Filter services based on active category
  const filteredServices =
    activeCategory === "All Services"
      ? demoItems
      : demoItems.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* Header */}
      <div className="full-screen-container">
        <div className="header">
          <h1>Discover Our Expertise</h1>
          <p>
            At Nexlume, we pride ourselves on our commitment to <br />
            <span className="highlight">
              Excellence, Creativity, and Timely delivery
            </span>
            <br />
            Let us help you build a strong online presence that sets your brand
            apart.
          </p>
        </div>
      </div>

      {/* Flowing Services Menu - Enhanced */}
      <section className="main-container services-showcase">
        <div className="services-header">
          <h6 className="sub-head mb-15" data-aos="fade-up">
            Our Services
          </h6>
          <h2 className="header" data-aos="fade-up" data-aos-delay="100">
            What We Offer
          </h2>
          <p
            className="services-subtitle"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Comprehensive digital solutions tailored to elevate your brand and
            drive growth
          </p>
        </div>

        {/* Service Categories */}
        <div
          className="service-categories"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <button
            className={`category-btn text-white fw-semibold ${activeCategory === "All Services" ? "active" : ""}`}
            onClick={() => setActiveCategory("All Services")}
          >
            All Services
          </button>
          <button
            className={`category-btn text-white fw-semibold ${activeCategory === "Development" ? "active" : ""}`}
            onClick={() => setActiveCategory("Development")}
          >
            Development
          </button>
          <button
            className={`category-btn text-white fw-semibold ${activeCategory === "Design" ? "active" : ""}`}
            onClick={() => setActiveCategory("Design")}
          >
            Design
          </button>
          <button
            className={`category-btn text-white fw-semibold ${activeCategory === "Marketing" ? "active" : ""}`}
            onClick={() => setActiveCategory("Marketing")}
          >
            Marketing
          </button>
        </div>

        {/* Service Cards Grid */}
        <div className="services-grid">
          {filteredServices.map((item, index) => (
            <div
              className="service-card"
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <div className="service-card-inner">
                <div className="service-icon-wrapper">
                  <div className="service-icon">
                    {getCreativeIcon(item.text)}
                  </div>
                  <div className="service-glow"></div>
                </div>
                <span className="service-category-badge">{item.category}</span>
                <h3 className="service-title">{item.text}</h3>
                <p className="service-description">{item.description}</p>
                <a href={item.link} className="service-link">
                  Learn More
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M1 8h14M9 2l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faqs-pg section-padding">
        <div className="container">
          <div className="row lg-marg align-items-center">
            <div className="col-lg-5">
              <div className="faq-illustration-container">
                <div className="faq-illustration">
                  {/* Floating Particles */}
                  <div className="particle particle-1"></div>
                  <div className="particle particle-2"></div>
                  <div className="particle particle-3"></div>
                  <div className="particle particle-4"></div>
                  <div className="particle particle-5"></div>

                  {/* Floating Lines */}
                  <div className="floating-line line-1"></div>
                  <div className="floating-line line-2"></div>
                  <div className="floating-line line-3"></div>

                  {/* Q&A Cards */}
                  <div className="faq-card card-1">
                    <div className="card-glow"></div>
                    <div className="card-content">
                      <div className="card-icon">Q</div>
                      <div className="card-title">Question</div>
                    </div>
                  </div>

                  <div className="faq-card card-2">
                    <div className="card-glow"></div>
                    <div className="card-content">
                      <div className="card-icon">A</div>
                      <div className="card-title">Answer</div>
                    </div>
                  </div>

                  <div className="faq-card card-3">
                    <div className="card-glow"></div>
                    <div className="card-content">
                      <div className="card-icon">?</div>
                      <div className="card-title">FAQ</div>
                    </div>
                  </div>

                  {/* Ambient Light Spheres */}
                  <div className="ambient-sphere sphere-1"></div>
                  <div className="ambient-sphere sphere-2"></div>
                  <div className="ambient-sphere sphere-3"></div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="sec-head mb-60">
                <h6 className="sub-head mb-15">Questions & Answers</h6>
                <h2>Providing clarity on frequently asked questions</h2>
              </div>
              <div className="faq-list">
                {faqs.map((faq) => (
                  <div key={faq.id} className="faq-item">
                    <button
                      className="faq-question"
                      onClick={() => toggleFaq(faq.id)}
                    >
                      {faq.question}
                      <span className="faq-icon">
                        {openFaq === faq.id ? "–" : "+"}
                      </span>
                    </button>
                    <div
                      className={`faq-answer ${
                        openFaq === faq.id ? "show" : ""
                      }`}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - NEW */}
      <section className="process-section section-padding">
        <div className="container">
          <div className="sec-head mb-60 text-center">
            <h6 className="sub-head mb-15">Our Process</h6>
            <h2>How We Bring Your Vision to Life</h2>
            <p className="sec-desc">
              A streamlined, transparent approach from concept to launch
            </p>
          </div>

          <div className="process-timeline">
            <div
              className="process-step"
              data-aos="fade-right"
              data-aos-delay="0"
            >
              <div className="process-number">01</div>
              <div className="process-content">
                <div className="process-icon">
                  <svg viewBox="0 0 64 64" fill="none">
                    <circle
                      cx="32"
                      cy="32"
                      r="30"
                      stroke="currentColor"
                      strokeWidth="2"
                      opacity="0.3"
                    />
                    <path
                      d="M32 16v32M16 32h32"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3>Discovery & Planning</h3>
                <p>
                  We dive deep into your business goals, target audience, and
                  project requirements to create a strategic roadmap.
                </p>
              </div>
              <div className="process-line"></div>
            </div>

            <div
              className="process-step"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <div className="process-number">02</div>
              <div className="process-content">
                <div className="process-icon">
                  <svg viewBox="0 0 64 64" fill="none">
                    <rect
                      x="12"
                      y="12"
                      width="40"
                      height="40"
                      rx="4"
                      stroke="currentColor"
                      strokeWidth="2"
                      opacity="0.3"
                    />
                    <path
                      d="M20 24h24M20 32h20M20 40h16"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3>Design & Prototype</h3>
                <p>
                  Our designers craft intuitive, beautiful interfaces with
                  interactive prototypes for your feedback and approval.
                </p>
              </div>
              <div className="process-line"></div>
            </div>

            <div
              className="process-step"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="process-number">03</div>
              <div className="process-content">
                <div className="process-icon">
                  <svg viewBox="0 0 64 64" fill="none">
                    <circle
                      cx="32"
                      cy="32"
                      r="30"
                      stroke="currentColor"
                      strokeWidth="2"
                      opacity="0.3"
                    />
                    <path
                      d="M22 32l8 8 16-16"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3>Development & Testing</h3>
                <p>
                  Expert developers build your solution with clean code,
                  followed by rigorous testing to ensure flawless performance.
                </p>
              </div>
              <div className="process-line"></div>
            </div>

            <div
              className="process-step"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              <div className="process-number">04</div>
              <div className="process-content">
                <div className="process-icon">
                  <svg viewBox="0 0 64 64" fill="none">
                    <path
                      d="M32 8l8 16h16l-13 13 5 15-16-10-16 10 5-15-13-13h16z"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
                <h3>Launch & Support</h3>
                <p>
                  Seamless deployment to production with ongoing maintenance,
                  updates, and dedicated support to ensure success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section - NEW */}
      <section className="tech-stack-section section-padding">
        <div className="container">
          <div className="sec-head mb-60 text-center">
            <h6 className="sub-head mb-15">Technology Stack</h6>
            <h2>Powered by Modern Technologies</h2>
            <p className="sec-desc">
              We use cutting-edge tools to build scalable, high-performance
              solutions
            </p>
          </div>

          <div className="tech-categories">
            <div
              className="tech-category"
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <h3 className="tech-category-title">Frontend</h3>
              <div className="tech-grid">
                <div className="tech-item">
                  <div className="tech-icon-box">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <span>React</span>
                </div>
                <div className="tech-item">
                  <div className="tech-icon-box">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l10 6v10l-10 6-10-6V8l10-6z" />
                    </svg>
                  </div>
                  <span>Vue.js</span>
                </div>
                <div className="tech-item">
                  <div className="tech-icon-box">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    </svg>
                  </div>
                  <span>Next.js</span>
                </div>
                <div className="tech-item">
                  <div className="tech-icon-box">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5z" />
                    </svg>
                  </div>
                  <span>TypeScript</span>
                </div>
              </div>
            </div>

            <div
              className="tech-category"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <h3 className="tech-category-title">Backend</h3>
              <div className="tech-grid">
                <div className="tech-item">
                  <div className="tech-icon-box">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l10 6v10l-10 6-10-6V8z" />
                    </svg>
                  </div>
                  <span>Node.js</span>
                </div>
                <div className="tech-item">
                  <div className="tech-icon-box">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <span>Python</span>
                </div>
                <div className="tech-item">
                  <div className="tech-icon-box">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <rect x="4" y="4" width="16" height="16" rx="2" />
                    </svg>
                  </div>
                  <span>MongoDB</span>
                </div>
                <div className="tech-item">
                  <div className="tech-icon-box">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7v10l10 5 10-5V7z" />
                    </svg>
                  </div>
                  <span>PostgreSQL</span>
                </div>
              </div>
            </div>

            <div
              className="tech-category"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <h3 className="tech-category-title">Cloud & DevOps</h3>
              <div className="tech-grid">
                <div className="tech-item">
                  <div className="tech-icon-box">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l10 6v10l-10 6-10-6V8z" />
                    </svg>
                  </div>
                  <span>AWS</span>
                </div>
                <div className="tech-item">
                  <div className="tech-icon-box">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <span>Docker</span>
                </div>
                <div className="tech-item">
                  <div className="tech-icon-box">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <rect x="4" y="4" width="16" height="16" rx="2" />
                    </svg>
                  </div>
                  <span>Firebase</span>
                </div>
                <div className="tech-item">
                  <div className="tech-icon-box">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5z" />
                    </svg>
                  </div>
                  <span>Vercel</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
