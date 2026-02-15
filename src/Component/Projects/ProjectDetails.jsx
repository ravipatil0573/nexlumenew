import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { OptimizedImage } from "../../components/OptimizedImage";
import "./ProjectDetails.css";

// -------------------------------------------
// Config
// -------------------------------------------
const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5000";

// -------------------------------------------
// Tech Icons Mapping
// -------------------------------------------
const techIcons = {
  // JavaScript & TypeScript
  JavaScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  TypeScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",

  // Frontend Frameworks
  React:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Next.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  Vue: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  Angular:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  Svelte:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",

  // CSS Frameworks
  "Tailwind CSS":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  Bootstrap:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  "Material-UI":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
  Sass: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
  Less: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/less/less-plain-wordmark.svg",
  CSS3: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  HTML5:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",

  // Backend & Runtime
  "Node.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Node: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  NodeJS:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Express:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "Express.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  NestJS:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg",
  "ASP.NET":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
  ASPNET:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
  ".NET":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
  DotNet:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",

  // Databases
  MongoDB:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  MySQL:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  PostgreSQL:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  Postgres:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  SQLite:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
  "SQL Server":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
  SQLServer:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
  MSSQL:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
  Redis:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  Firebase:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  Supabase:
    "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/supabase.svg",

  // Cloud & Hosting
  Vercel:
    "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png",
  AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  Azure:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  Heroku:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg",
  Netlify:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg",
  Docker:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  Kubernetes:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",

  // Tools & Libraries
  "Socket.io":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
  SocketIO:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
  "Framer Motion":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg",
  "Motion.dev":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg",
  GraphQL:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  REST: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/swagger.svg",
  "REST API":
    "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/swagger.svg",
  RestAPI:
    "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/swagger.svg",
  RESTful:
    "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/swagger.svg",
  API: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/swagger.svg",
  Swagger:
    "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/swagger.svg",
  Redux:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  Zustand:
    "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/zustand.svg",
  GSAP: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/gsap.svg",
  ThreeJS:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
  "Three.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",

  // Programming Languages
  Python:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "C++":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  C: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  Go: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  Rust: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  Ruby: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
  Swift:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
  Kotlin:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  Dart: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",

  // Mobile Development
  ReactNative:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  Flutter:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  Ionic:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg",

  // Testing
  Jest: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
  Cypress:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg",
  Mocha:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mocha/mocha-plain.svg",

  // Build Tools
  Webpack:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
  Vite: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
  Babel:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg",
  Gulp: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gulp/gulp-plain.svg",

  // Version Control
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  GitHub:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  GitLab:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
  Bitbucket:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bitbucket/bitbucket-original.svg",

  // Other Technologies
  Nginx:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
  Apache:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg",
  Linux:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  Ubuntu:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg",
  Windows:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg",

  // Design Tools
  Figma:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  Adobe:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/adobe/adobe-original.svg",
  Photoshop:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
  Illustrator:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",

  // Common Variations & Abbreviations
  JS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  TS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "Responsive Design":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  Responsive:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "UI/UX":
    "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/figma.svg",
  UI: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/figma.svg",
  UX: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/figma.svg",
  Animations:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg",
  Animation:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg",

  // Additional Technologies
  "Enterprise App":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
  Enterprise:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
  Spring:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  Django:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  Flask:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  Laravel:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg",
  "React Native":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  RN: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
};

// Helper function to get icon URL with multiple matching strategies
const getTechIcon = (tag) => {
  const cleanTag = tag?.trim() || "";
  if (!cleanTag) return null;

  // Exact match
  if (techIcons[cleanTag]) return techIcons[cleanTag];

  // Case-insensitive match
  const caseInsensitiveMatch = Object.keys(techIcons).find(
    (key) => key.toLowerCase() === cleanTag.toLowerCase(),
  );
  if (caseInsensitiveMatch) return techIcons[caseInsensitiveMatch];

  // Try variations
  const variations = [
    cleanTag.replace(/\./g, ""),
    cleanTag.replace(/\s+/g, ""),
    cleanTag.replace(/\s+/g, "-"),
    cleanTag.replace(/\s+/g, "."),
    cleanTag.replace(/\./g, "-"),
  ];

  for (const variant of variations) {
    if (techIcons[variant]) return techIcons[variant];
  }

  return null;
};

// -------------------------------------------
// Utilities
// -------------------------------------------
const extractColorFromGradient = (g) => {
  if (!g) return "#060010";
  const m = g.match(/#([0-9a-f]{6})/i);
  return m ? `#${m[0].slice(1)}` : "#060010";
};

const loadGoogleFontIfNeeded = (family) => {
  if (!family) return;
  const encoded = family.replace(/\s+/g, "+");
  const id = `gf-${encoded}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encoded}:wght@300..800&display=swap`;
  document.head.appendChild(link);
};

// Map backend payload to our in-page model, with fallbacks
const normalizeProject = (src = {}) => {
  const title = src.title || src.name || "Untitled Project";
  const subtitle = src.subtitle || src.overview || "";
  const features = Array.isArray(src.description) ? src.description : [];
  const techStack = Array.isArray(src.tags) ? src.tags : [];
  const screenshots = src.screenshots?.length
    ? src.screenshots
    : src.image
      ? [src.image]
      : [];
  const color = src.color || extractColorFromGradient(src.gradient);

  const typography = {
    headings: src.typography?.headings || "Poppins",
    body: src.typography?.body || "Inter",
    align: src.typography?.align || "left",
    google: "google" in (src.typography || {}) ? !!src.typography.google : true,
  };

  return {
    id: src.id ?? "unknown",
    slug: src.slug || String(src.id || ""),
    name: title,
    overview: subtitle,
    techStack,
    features,
    screenshots,
    palette: src.palette?.length
      ? src.palette
      : ["#060010", "#8400FF", "#00F0FF", "#FFFFFF"],
    typography,
    links: src.links || { demo: src.demo, repo: src.repo },
    role: src.role || "Developer",
    timeline: src.timeline || "",
    color,
    gradient: src.gradient,
  };
};

// -------------------------------------------
// Page Component
// -------------------------------------------
export default function ProjectDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const stateProject = location.state ? normalizeProject(location.state) : null;
  const [serverProject, setServerProject] = useState(null);
  const [loading, setLoading] = useState(!stateProject);

  // Refs for sections (must be declared before any early returns)
  const overviewRef = useRef(null);
  const featuresRef = useRef(null);
  const techStackRef = useRef(null);
  const challengesRef = useRef(null);
  const outcomeRef = useRef(null);

  // Active section state
  const [activeSection, setActiveSection] = useState("overview");

  // Navigation items
  const navItems = [
    { id: "overview", label: "Overview", ref: overviewRef },
    { id: "features", label: "Key Features", ref: featuresRef },
    { id: "tech-stack", label: "Tech Stack", ref: techStackRef },
    {
      id: "challenges",
      label: "Challenges & Learnings",
      ref: challengesRef,
      subItems: [
        { id: "adopting-tech", label: "Adopting the Tech Ecosystem" },
        { id: "real-time", label: "Real-Time Syncing" },
        { id: "authentication", label: "Authentication" },
        { id: "design-composition", label: "Design & Component Composition" },
      ],
    },
    { id: "outcome", label: "Outcome", ref: outcomeRef },
  ];

  const project = useMemo(
    () => serverProject || stateProject,
    [serverProject, stateProject],
  );

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Load fonts when we know families
  useEffect(() => {
    const p = serverProject || stateProject;
    if (!p) return;
    if (p.typography?.google !== false) {
      loadGoogleFontIfNeeded(p.typography?.headings);
      loadGoogleFontIfNeeded(p.typography?.body);
    }
  }, [serverProject, stateProject]);

  // Fetch from backend by id or slug
  useEffect(() => {
    let isMounted = true;

    const tryFetch = async () => {
      try {
        const projectId = Number(id);
        const endpoint = Number.isFinite(projectId)
          ? `${API_BASE}/api/projects/${projectId}`
          : `${API_BASE}/api/projects/slug/${encodeURIComponent(id)}`;

        console.log(`🔍 Fetching project from: ${endpoint}`);
        setLoading(true);
        const res = await fetch(endpoint);

        if (!res.ok) {
          console.error(`❌ API Error: HTTP ${res.status} - ${res.statusText}`);
          throw new Error(`HTTP ${res.status}: ${res.statusText}`);
        }

        const json = await res.json();
        console.log(`✅ Project data received:`, json);

        if (!isMounted) return;
        setServerProject(normalizeProject(json));
      } catch (error) {
        console.error(`❌ Failed to fetch project:`, error);
        if (!isMounted) return;
        setServerProject(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    tryFetch();
    return () => {
      isMounted = false;
    };
  }, [id]);

  // IntersectionObserver to track active section with improved threshold
  useEffect(() => {
    if (!project) return;

    const observers = [];
    const sectionRefs = [
      { id: "overview", ref: overviewRef },
      { id: "features", ref: featuresRef },
      { id: "tech-stack", ref: techStackRef },
      { id: "challenges", ref: challengesRef },
      { id: "outcome", ref: outcomeRef },
    ];

    sectionRefs.forEach(({ id, ref }) => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: "-100px 0px -50% 0px",
          threshold: 0.45,
        },
      );

      observer.observe(ref.current);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [project]);

  // Smooth scroll handler
  const handleNavClick = (sectionId, ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setActiveSection(sectionId);
    }
  };

  if (loading) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        <div className="text-center">
          <div className="spinner-border text-light mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-light-50">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        <div className="text-center px-4">
          <h1
            className="text-white mb-3"
            style={{ fontSize: "2rem", fontWeight: 600 }}
          >
            Project Not Found
          </h1>
          <p className="text-white-50 mb-4" style={{ opacity: 0.8 }}>
            We couldn't find this project. Go back to the list and choose a
            project.
          </p>
          <button
            className="btn btn-outline-light px-4 py-2 rounded-pill"
            onClick={() => navigate(-1)}
            style={{
              borderColor: "rgba(255, 255, 255, 0.2)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.5)";
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.backgroundColor = "transparent";
            }}
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  const mainImage = project?.screenshots?.[0] || project?.image || "";
  const features = project?.features || [];
  const techStack = project?.techStack || [];

  return (
    <div
      style={{
        backgroundColor: "#0A0A0A",
        minHeight: "100vh",
        color: "#EDEDED",
        fontFamily: project?.typography?.body
          ? `"${project.typography.body}", system-ui, sans-serif`
          : "system-ui, sans-serif",
      }}
    >
      <div
        className="container-fluid px-4 px-lg-5"
        style={{ maxWidth: "1400px", margin: "0 auto" }}
      >
        <div className="d-flex justify-content-between gap-5 position-relative">
          {/* Main Content */}
          <main style={{ flex: "1", maxWidth: "900px", width: "100%" }}>
            {/* Hero Section */}
            <section className="pt-20 pb-12">
              <div className="mb-6">
                <h1
                  className="mb-4"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                    fontWeight: 600,
                    lineHeight: 1.2,
                    color: "#EDEDED",
                    fontFamily: project?.typography?.headings
                      ? `"${project.typography.headings}", system-ui, sans-serif`
                      : "system-ui, sans-serif",
                  }}
                >
                  {project.name || "Untitled Project"}
                </h1>
                <p
                  className="mb-5"
                  style={{
                    fontSize: "1.125rem",
                    color: "#A7A7A7",
                    lineHeight: 1.75,
                    maxWidth: "800px",
                  }}
                >
                  {project.overview ||
                    "A modern project built with cutting-edge technologies."}
                </p>

                {/* Tech Stack Badges */}
                {techStack.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {techStack.slice(0, 8).map((tech, idx) => {
                      const iconUrl = getTechIcon(tech);
                      return (
                        <span
                          key={idx}
                          className="badge px-3 py-2 rounded-pill d-flex align-items-center gap-2"
                          style={{
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            color: "#EDEDED",
                            fontSize: "0.875rem",
                            fontWeight: 400,
                          }}
                        >
                          {iconUrl && (
                            <img
                              src={iconUrl}
                              alt={tech}
                              style={{
                                width: "16px",
                                height: "16px",
                                objectFit: "contain",
                              }}
                              loading="lazy"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          )}
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* Role & Timeline */}
                {(project.role || project.timeline) && (
                  <div className="d-flex flex-wrap gap-3">
                    {project.role && (
                      <span
                        className="text-white-50"
                        style={{ fontSize: "0.9rem" }}
                      >
                        <i className="bi bi-person me-2"></i>
                        {project.role}
                      </span>
                    )}
                    {project.timeline && (
                      <span
                        className="text-white-50"
                        style={{ fontSize: "0.9rem" }}
                      >
                        <i className="bi bi-calendar me-2"></i>
                        {project.timeline}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* Banner Preview Image */}
            {mainImage && (
              <section className="mb-12">
                <div
                  className="rounded-4 overflow-hidden position-relative"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow:
                      "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 30px rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(4px)",
                    padding: "2px",
                  }}
                >
                  <div
                    className="rounded-4 overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
                    }}
                  >
                    <OptimizedImage
                      src={mainImage}
                      alt={project.name}
                      className="w-100"
                      style={{
                        display: "block",
                        height: "auto",
                        maxHeight: "600px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Overview Section */}
            <section
              id="overview"
              ref={overviewRef}
              className="pt-20 pb-12"
              style={{ scrollMarginTop: "120px" }}
            >
              <h2
                className="mb-6"
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "#EDEDED",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  paddingBottom: "12px",
                  letterSpacing: "-0.01em",
                }}
              >
                Overview
              </h2>
              <p
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: 1.75,
                  color: "#A7A7A7",
                  maxWidth: "900px",
                }}
              >
                {project.overview ||
                  `${project.name} is a comprehensive project that showcases modern web development practices. 
                  Built with attention to detail and user experience, it demonstrates proficiency in full-stack development 
                  and contemporary design principles.`}
              </p>
            </section>

            {/* Key Features */}
            {features.length > 0 && (
              <section
                id="features"
                ref={featuresRef}
                className="pt-20 pb-12"
                style={{ scrollMarginTop: "120px" }}
              >
                <h2
                  className="mb-6"
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "#EDEDED",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    paddingBottom: "12px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Key Features
                </h2>
                <div
                  className="row g-4"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "24px",
                  }}
                >
                  {features.slice(0, 6).map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-3"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        backdropFilter: "blur(4px)",
                        boxShadow: "inset 0 0 30px rgba(255, 255, 255, 0.03)",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(255, 255, 255, 0.1)";
                        e.currentTarget.style.borderColor =
                          "rgba(255, 255, 255, 0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(255, 255, 255, 0.05)";
                        e.currentTarget.style.borderColor =
                          "rgba(255, 255, 255, 0.08)";
                      }}
                    >
                      <div className="d-flex align-items-start">
                        <i
                          className="bi bi-check-circle-fill me-3 mt-1"
                          style={{
                            color: "#00F0FF",
                            fontSize: "1.25rem",
                            flexShrink: 0,
                          }}
                        ></i>
                        <p
                          className="mb-0"
                          style={{ color: "#EDEDED", lineHeight: 1.6 }}
                        >
                          {feature}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tech Stack */}
            {techStack.length > 0 && (
              <section
                id="tech-stack"
                ref={techStackRef}
                className="pt-20 pb-12"
                style={{ scrollMarginTop: "120px" }}
              >
                <h2
                  className="mb-6"
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "#EDEDED",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    paddingBottom: "12px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Tech Stack
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "24px",
                  }}
                >
                  {techStack.map((tech, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-3"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        backdropFilter: "blur(4px)",
                        boxShadow: "inset 0 0 30px rgba(255, 255, 255, 0.03)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(255, 255, 255, 0.1)";
                        e.currentTarget.style.borderColor =
                          "rgba(255, 255, 255, 0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(255, 255, 255, 0.05)";
                        e.currentTarget.style.borderColor =
                          "rgba(255, 255, 255, 0.08)";
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <div
                          className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                          style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            flexShrink: 0,
                            overflow: "hidden",
                          }}
                        >
                          {(() => {
                            const iconUrl = getTechIcon(tech);
                            return iconUrl ? (
                              <img
                                src={iconUrl}
                                alt={tech}
                                style={{
                                  width: "28px",
                                  height: "28px",
                                  objectFit: "contain",
                                }}
                                loading="lazy"
                                onError={(e) => {
                                  // Fallback to code icon if logo fails to load
                                  e.target.style.display = "none";
                                  const parent = e.target.parentElement;
                                  if (parent) {
                                    parent.innerHTML =
                                      '<i class="bi bi-code-slash" style="color: #00F0FF"></i>';
                                  }
                                }}
                              />
                            ) : (
                              <i
                                className="bi bi-code-slash"
                                style={{ color: "#00F0FF" }}
                              ></i>
                            );
                          })()}
                        </div>
                        <div>
                          <h6
                            className="mb-1"
                            style={{
                              color: "#EDEDED",
                              fontWeight: 600,
                              fontSize: "1rem",
                            }}
                          >
                            {tech}
                          </h6>
                          <p
                            className="mb-0 text-white-50"
                            style={{ fontSize: "0.875rem" }}
                          >
                            Modern technology stack
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Challenges & Learnings */}
            <section
              id="challenges"
              ref={challengesRef}
              className="pt-20 pb-12"
              style={{ scrollMarginTop: "120px" }}
            >
              <h2
                className="mb-6"
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "#EDEDED",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  paddingBottom: "12px",
                  letterSpacing: "-0.01em",
                }}
              >
                Challenges & Learnings
              </h2>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="mb-6">
                    <h3
                      id="adopting-tech"
                      className="mb-3"
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: 600,
                        color: "#EDEDED",
                        scrollMarginTop: "120px",
                      }}
                    >
                      Adopting the Tech Ecosystem
                    </h3>
                    <p style={{ color: "#A7A7A7", lineHeight: 1.75 }}>
                      Implementing modern web technologies required careful
                      consideration of performance, scalability, and user
                      experience. The project involved integrating multiple
                      systems while maintaining clean code architecture.
                    </p>
                  </div>
                  <div className="mb-6">
                    <h3
                      id="real-time"
                      className="mb-3"
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: 600,
                        color: "#EDEDED",
                        scrollMarginTop: "120px",
                      }}
                    >
                      Real-Time Syncing
                    </h3>
                    <p style={{ color: "#A7A7A7", lineHeight: 1.75 }}>
                      Implementing real-time data synchronization required
                      understanding WebSocket connections and state management
                      patterns to ensure seamless user experience.
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-6">
                    <h3
                      id="authentication"
                      className="mb-3"
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: 600,
                        color: "#EDEDED",
                        scrollMarginTop: "120px",
                      }}
                    >
                      Authentication
                    </h3>
                    <p style={{ color: "#A7A7A7", lineHeight: 1.75 }}>
                      Building secure authentication flows required implementing
                      OAuth protocols, session management, and protecting
                      against common security vulnerabilities.
                    </p>
                  </div>
                  <div className="mb-6">
                    <h3
                      id="design-composition"
                      className="mb-3"
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: 600,
                        color: "#EDEDED",
                        scrollMarginTop: "120px",
                      }}
                    >
                      Design & Component Composition
                    </h3>
                    <p style={{ color: "#A7A7A7", lineHeight: 1.75 }}>
                      Creating an intuitive and visually appealing interface
                      required balancing aesthetics with functionality. The
                      design process emphasized user-centered principles and
                      accessibility standards.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Outcome */}
            <section
              id="outcome"
              ref={outcomeRef}
              className="pt-20 pb-12"
              style={{ scrollMarginTop: "120px" }}
            >
              <h2
                className="mb-6"
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "#EDEDED",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  paddingBottom: "12px",
                  letterSpacing: "-0.01em",
                }}
              >
                Outcome
              </h2>
              <p
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: 1.75,
                  color: "#A7A7A7",
                  maxWidth: "900px",
                }}
              >
                {project.name} was successfully developed and deployed,
                demonstrating proficiency in modern web development practices.
                The project showcases clean code architecture, responsive
                design, and attention to detail in both functionality and user
                experience.
              </p>
            </section>

            {/* Action Buttons */}
            {(project.links?.demo || project.links?.repo) && (
              <section className="pt-20 pb-20">
                <div className="d-flex flex-wrap gap-3">
                  {project.links?.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="btn px-4 py-3 rounded-pill d-inline-flex align-items-center"
                      style={{
                        backgroundColor: "transparent",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        color: "#EDEDED",
                        textDecoration: "none",
                        fontWeight: 500,
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(255, 255, 255, 0.4)";
                        e.currentTarget.style.backgroundColor =
                          "rgba(255, 255, 255, 0.05)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 20px rgba(255, 255, 255, 0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(255, 255, 255, 0.2)";
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <i className="bi bi-box-arrow-up-right me-2"></i>
                      Live Demo
                    </a>
                  )}
                  {project.links?.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="btn px-4 py-3 rounded-pill d-inline-flex align-items-center"
                      style={{
                        backgroundColor: "transparent",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        color: "#EDEDED",
                        textDecoration: "none",
                        fontWeight: 500,
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(255, 255, 255, 0.4)";
                        e.currentTarget.style.backgroundColor =
                          "rgba(255, 255, 255, 0.05)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 20px rgba(255, 255, 255, 0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(255, 255, 255, 0.2)";
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <i className="bi bi-github me-2"></i>
                      Source Code
                    </a>
                  )}
                </div>
              </section>
            )}
          </main>

          {/* Right Sidebar Navigation */}
          <aside
            className="d-none d-lg-flex flex-column"
            style={{
              position: "sticky",
              top: "96px",
              alignSelf: "flex-start",
              width: "220px",
              flexShrink: 0,
              paddingLeft: "32px",
              height: "fit-content",
            }}
          >
            <p
              className="mb-4"
              style={{
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#8A8A8A",
              }}
            >
              On this page
            </p>

            <nav
              style={{
                position: "relative",
                paddingLeft: "16px",
              }}
            >
              {/* Vertical connector line */}
              <div
                style={{
                  position: "absolute",
                  left: "0",
                  top: "0",
                  bottom: "0",
                  width: "1px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
              />

              <div className="d-flex flex-column" style={{ gap: "12px" }}>
                {navItems.map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id, item.ref)}
                      className="btn p-0 text-start border-0 bg-transparent"
                      style={{
                        fontSize: "0.875rem",
                        color:
                          activeSection === item.id ? "#FFFFFF" : "#9CA3AF",
                        fontWeight: activeSection === item.id ? 500 : 400,
                        letterSpacing: "0.01em",
                        lineHeight: "1.5",
                        padding: "4px 0 4px 12px",
                        position: "relative",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        textDecoration: "none",
                        background: "transparent",
                        opacity: activeSection === item.id ? 1 : 0.7,
                      }}
                      onMouseEnter={(e) => {
                        if (activeSection !== item.id) {
                          e.currentTarget.style.color = "#D1D5DB";
                          e.currentTarget.style.transform = "translateX(4px)";
                          e.currentTarget.style.opacity = "1";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeSection !== item.id) {
                          e.currentTarget.style.color = "#9CA3AF";
                          e.currentTarget.style.transform = "translateX(0)";
                          e.currentTarget.style.opacity = "0.7";
                        }
                      }}
                    >
                      {/* Active indicator - left border glow */}
                      {activeSection === item.id && (
                        <div
                          style={{
                            position: "absolute",
                            left: "-16px",
                            top: "0",
                            bottom: "0",
                            width: "2px",
                            backgroundColor: "#FFFFFF",
                            boxShadow:
                              "0 0 8px rgba(255, 255, 255, 0.6), 0 0 16px rgba(255, 255, 255, 0.3)",
                            animation: "fadeIn 0.3s ease-in-out",
                          }}
                        />
                      )}
                      {item.label}
                    </button>

                    {/* Sub-items for Challenges section */}
                    {item.subItems && activeSection === item.id && (
                      <div
                        className="d-flex flex-column"
                        style={{
                          marginTop: "8px",
                          paddingLeft: "16px",
                          gap: "8px",
                        }}
                      >
                        {item.subItems.map((subItem) => (
                          <a
                            key={subItem.id}
                            href={`#${subItem.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              const element = document.getElementById(
                                subItem.id,
                              );
                              if (element) {
                                element.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                });
                              }
                            }}
                            style={{
                              fontSize: "0.8125rem",
                              color: "#9CA3AF",
                              fontWeight: 400,
                              letterSpacing: "0.01em",
                              lineHeight: "1.5",
                              padding: "2px 0",
                              textDecoration: "none",
                              transition: "all 0.3s ease",
                              opacity: 0.7,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = "#D1D5DB";
                              e.currentTarget.style.transform =
                                "translateX(4px)";
                              e.currentTarget.style.opacity = "1";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = "#9CA3AF";
                              e.currentTarget.style.transform = "translateX(0)";
                              e.currentTarget.style.opacity = "0.7";
                            }}
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </nav>
          </aside>
        </div>
      </div>

      {/* Add animations */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scaleY(0.8);
            }
            to {
              opacity: 1;
              transform: scaleY(1);
            }
          }
        `}
      </style>
    </div>
  );
}
