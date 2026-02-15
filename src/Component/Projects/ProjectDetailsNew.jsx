import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { OptimizedImage } from "../../components/OptimizedImage";
import "./ProjectDetailsNew.css";

const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5000";

// Tech icon mapping (simplified)
const techIcons = {
  React:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Node.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  MongoDB:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "React Native":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  Express:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  PostgreSQL:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  Bootstrap:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  "Tailwind CSS":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  JavaScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  TypeScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  Firebase:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  Docker:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
};

const getTechIcon = (tech) => {
  const key = Object.keys(techIcons).find(
    (k) => k.toLowerCase() === tech?.toLowerCase(),
  );
  return key ? techIcons[key] : null;
};

// Normalize project data from API
const normalizeProject = (data) => {
  if (!data) return null;

  return {
    ...data,
    name: data.name || data.title || "Untitled Project",
    overview: data.overview || data.subtitle || "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    description: Array.isArray(data.description) ? data.description : [],
    screenshots: data.screenshots?.length
      ? data.screenshots
      : data.image
        ? [data.image]
        : [],
    image: data.screenshots?.[0] || data.image || "",
    problem: data.problem || null,
    solution: data.solution || null,
    links: {
      demo: data.links?.demo || data.demo || null,
      repo: data.links?.repo || data.repo || null,
    },
  };
};

export default function ProjectDetailsNew() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const isNumeric = /^\d+$/.test(id);
        const endpoint = isNumeric
          ? `${API_BASE}/api/projects/${id}`
          : `${API_BASE}/api/projects/slug/${encodeURIComponent(id)}`;

        const res = await fetch(endpoint);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        console.log("Project data loaded:", data);
        const normalized = normalizeProject(data);
        console.log("Normalized project:", normalized);
        setProject(normalized);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="pd-loading">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="pd-error">
        <h2 className="text-white mb-3">Project Not Found</h2>
        <button
          className="btn btn-outline-danger"
          onClick={() => navigate("/")}
        >
          Back Home
        </button>
      </div>
    );
  }

  const techStack = Array.isArray(project.tags) ? project.tags : [];
  const mainImage = project.image || project.screenshots?.[0] || "";
  const features = Array.isArray(project.description)
    ? project.description
    : [];

  return (
    <div className="pd-container">
      {/* 1. IMMERSIVE INTRO SECTION */}
      <section className="pd-intro-section">
        <div className="container-lg">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div className="pd-intro-content">
                <h1 className="pd-intro-title">
                  {project.name || "Project Name"}
                </h1>
                <p className="pd-intro-statement">
                  {project.overview ||
                    "A premium case study showcasing modern development practices."}
                </p>
                <div className="pd-divider-red"></div>

                {/* Tech Pills */}
                <div className="pd-tech-pills">
                  {techStack.slice(0, 5).map((tech, idx) => (
                    <span key={idx} className="pd-pill">
                      {tech}
                    </span>
                  ))}
                  {techStack.length > 5 && (
                    <span className="pd-pill pd-pill-more">
                      +{techStack.length - 5}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              {mainImage && (
                <div className="pd-intro-preview">
                  <div className="pd-preview-inner">
                    <OptimizedImage
                      src={mainImage}
                      alt={project.name || "Project preview"}
                      className="w-100"
                      style={{ borderRadius: "8px", display: "block" }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM VS SOLUTION */}
      <section className="pd-problem-solution">
        <div className="container-lg">
          <h2 className="pd-section-title">The Challenge</h2>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="pd-card pd-card-problem">
                <h3 className="pd-card-title">Problem</h3>
                <p className="pd-card-text">
                  {project.problem ||
                    "Users needed a solution that combined seamless UX with robust performance, requiring careful architectural decisions and modern development practices."}
                </p>
              </div>
            </div>

            <div className="col-md-6">
              <div className="pd-card pd-card-solution">
                <h3 className="pd-card-title">Solution</h3>
                <p className="pd-card-text">
                  {project.solution ||
                    "Built with modern frameworks and best-in-class tools, delivering a scalable, maintainable, and user-focused application that exceeds expectations."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. USER EXPERIENCE FLOW */}
      <section className="pd-ux-flow">
        <div className="container-lg">
          <h2 className="pd-section-title">User Journey</h2>

          <div className="pd-timeline">
            {[
              {
                step: 1,
                label: "Discovery",
                desc: "Users discover the platform",
              },
              { step: 2, label: "Engage", desc: "Seamless onboarding flow" },
              { step: 3, label: "Interact", desc: "Intuitive core experience" },
              { step: 4, label: "Convert", desc: "Frictionless action" },
            ].map((item, idx) => (
              <div key={idx} className="pd-timeline-item">
                <div className="pd-timeline-step">{item.step}</div>
                <h4 className="pd-timeline-label">{item.label}</h4>
                <p className="pd-timeline-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TECHNOLOGY ARCHITECTURE */}
      <section className="pd-tech-arch">
        <div className="container-lg">
          <h2 className="pd-section-title">Technology Stack</h2>

          <div className="row g-4">
            {[
              {
                title: "Frontend",
                techs: techStack.filter((t) =>
                  [
                    "React",
                    "Vue",
                    "Angular",
                    "JavaScript",
                    "TypeScript",
                    "Bootstrap",
                    "Tailwind CSS",
                  ].includes(t),
                ) || ["React", "JavaScript"],
              },
              {
                title: "Backend",
                techs: techStack.filter((t) =>
                  [
                    "Node.js",
                    "Express",
                    "Django",
                    "Flask",
                    "REST API",
                    "GraphQL",
                  ].includes(t),
                ) || ["Node.js", "Express"],
              },
              {
                title: "Data & Hosting",
                techs: techStack.filter((t) =>
                  [
                    "MongoDB",
                    "PostgreSQL",
                    "Firebase",
                    "Docker",
                    "AWS",
                    "Vercel",
                  ].includes(t),
                ) || ["MongoDB"],
              },
            ].map((category, idx) => (
              <div key={idx} className="col-md-6 col-lg-4">
                <div className="pd-tech-box">
                  <h4 className="pd-tech-title">{category.title}</h4>
                  <ul className="pd-tech-list">
                    {category.techs.map((tech, tidx) => (
                      <li key={tidx} className="pd-tech-item">
                        <span className="pd-tech-dot"></span>
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ENGINEERING DECISIONS */}
      <section className="pd-engineering">
        <div className="container-lg">
          <h2 className="pd-section-title">Key Decisions</h2>

          <div className="accordion pd-accordion" id="engineeringAccordion">
            {[
              {
                id: "decision1",
                title: "Architecture & Scalability",
                content:
                  "Chose a modular component-based architecture to ensure scalability and maintainability. This approach allows for easier testing, feature additions, and team collaboration.",
              },
              {
                id: "decision2",
                title: "Performance Optimization",
                content:
                  "Implemented code splitting, lazy loading, and caching strategies to achieve optimal load times. Used modern tooling like Vite and Webpack to minimize bundle sizes.",
              },
              {
                id: "decision3",
                title: "Data Management",
                content:
                  "Selected a flexible database solution that supports both relational and document-based patterns, providing the best of both worlds for complex feature requirements.",
              },
              {
                id: "decision4",
                title: "Security & Authentication",
                content:
                  "Implemented OAuth2 and JWT for secure authentication flows. Regular security audits and best practices ensure user data protection.",
              },
            ].map((decision, idx) => (
              <div key={idx} className="accordion-item pd-accordion-item">
                <h2 className="accordion-header">
                  <button
                    className={`accordion-button ${idx === 0 ? "" : "collapsed"} pd-accordion-button`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${decision.id}`}
                    aria-expanded={idx === 0}
                  >
                    {decision.title}
                  </button>
                </h2>
                <div
                  id={decision.id}
                  className={`accordion-collapse collapse ${idx === 0 ? "show" : ""}`}
                  data-bs-parent="#engineeringAccordion"
                >
                  <div className="accordion-body pd-accordion-body">
                    {decision.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. IMPACT & OUTCOME */}
      <section className="pd-impact">
        <div className="container-lg">
          <h2 className="pd-section-title">Impact</h2>

          <div className="row g-4">
            {[
              { metric: "100%", label: "Performance Score" },
              { metric: "95%", label: "User Satisfaction" },
              { metric: "Zero", label: "Critical Bugs (Launch)" },
              { metric: "2x", label: "Faster Load Time" },
            ].map((stat, idx) => (
              <div key={idx} className="col-md-6 col-lg-3">
                <div className="pd-stat-card">
                  <div className="pd-stat-number">{stat.metric}</div>
                  <div className="pd-stat-label">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="pd-outcome-text mt-5">
            <p>
              {project.name} demonstrates professional-grade development
              practices, from initial conception through deployment. The project
              showcases proficiency in modern web technologies, user-centered
              design, and scalable architecture. Every component was built with
              performance, maintainability, and user experience in mind.
            </p>
          </div>
        </div>
      </section>

      {/* 7. CTA STRIP */}
      <section className="pd-cta-strip">
        <div className="container-lg">
          <div className="row align-items-center justify-content-between">
            <div className="col-auto">
              <h3 className="pd-cta-text">Explore the full project</h3>
            </div>
            <div className="col-auto">
              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="pd-cta-btn"
                >
                  View Live <i className="bi bi-arrow-right"></i>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
