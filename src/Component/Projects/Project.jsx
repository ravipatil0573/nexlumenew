import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Project.css";
import API from "../../lib/api";
import { OptimizedImage } from "../../components/OptimizedImage";

// ============================================
// PROJECTS SECTION - START
// ============================================

// Tech icon mapping for project tags - Comprehensive technology logos
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

// 👉 Backend base URL (set VITE_API_BASE in your frontend .env to override)

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

const preloadProjectImages = async (list = []) => {
  const sources = list
    .map((project) => project?.image || project?.screenshots?.[0] || "")
    .filter(Boolean);

  if (!sources.length) return true;

  const results = await Promise.all(
    sources.map((src) => waitForImageLoad(src)),
  );
  return results.every(Boolean);
};

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [, setActiveId] = useState(null); // keep setter only (fix)
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(Number(entry.target.dataset.id));
          }
        });
      },
      { threshold: 0.6 },
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="project-card mb-5"
      data-id={project.id}
      ref={(el) => (refs.current[project.id] = el)}
    >
      <div className="project-shell">
        <div className="row g-4 align-items-center">
          <div
            className={`col-12 col-lg-6 order-2 ${
              index % 2 ? "order-lg-2" : "order-lg-1"
            }`}
          >
            <div className="project-meta d-flex flex-column gap-3">
              <div className="project-eyebrow d-flex align-items-center gap-2">
                <span className="project-index">
                  {String((index || 0) + 1).padStart(2, "0")}
                </span>
                <span className="project-pill">Case Study</span>
              </div>

              <h2 className="project-title">{project.title}</h2>
              <p className="project-subtitle">{project.subtitle}</p>
              <div className="project-mobile-divider d-lg-none" />

              <p className="project-mobile-summary d-lg-none mb-0">
                {Array.isArray(project.description) &&
                project.description.length
                  ? project.description[0]
                  : project?.subtitle?.split(".")[0]}
              </p>

              <ul className="project-features list-unstyled d-none d-md-grid gap-2">
                {(project.description || []).map((point, idx) => (
                  <li key={idx} className="feature-item">
                    <span className="feature-icon">✦</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="d-none d-md-flex flex-wrap gap-2">
                {(project.tags || []).map((tag, i) => {
                  const cleanTag = tag.trim();
                  let iconUrl = techIcons[cleanTag];

                  if (!iconUrl) {
                    const caseInsensitiveMatch = Object.keys(techIcons).find(
                      (key) => key.toLowerCase() === cleanTag.toLowerCase(),
                    );
                    iconUrl = caseInsensitiveMatch
                      ? techIcons[caseInsensitiveMatch]
                      : null;
                  }

                  if (!iconUrl) {
                    const variations = [
                      cleanTag.replace(/\./g, ""),
                      cleanTag.replace(/\s+/g, ""),
                      cleanTag.replace(/\s+/g, "-"),
                      cleanTag.replace(/\s+/g, "."),
                      cleanTag.replace(/\./g, "-"),
                    ];

                    for (const variant of variations) {
                      if (techIcons[variant]) {
                        iconUrl = techIcons[variant];
                        break;
                      }
                    }
                  }

                  return (
                    <span
                      key={i}
                      className="project-tag badge rounded-pill d-inline-flex align-items-center gap-2"
                    >
                      {iconUrl ? (
                        <img
                          src={iconUrl}
                          alt={tag}
                          className="tech-icon"
                          loading="lazy"
                          onError={(e) => {
                            console.warn(
                              `Icon failed to load for: ${tag}`,
                              iconUrl,
                            );
                            e.target.style.display = "none";
                          }}
                        />
                      ) : null}
                      {tag}
                    </span>
                  );
                })}
              </div>

              <div className="project-tags-mobile d-flex d-lg-none flex-wrap gap-2">
                {(project.tags || []).slice(0, 6).map((tag, i) => (
                  <span
                    key={`${tag}-${i}`}
                    className="project-tag project-tag--mobile badge rounded-pill"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="project-actions d-flex flex-wrap align-items-center gap-3">
                <Link
                  to={`/projects/${project.id}`}
                  state={project}
                  className="project-link btn btn-danger rounded-pill px-4 py-2 d-inline-flex align-items-center justify-content-center gap-2"
                >
                  <span>View project</span>
                  <span className="project-link-arrow">↗</span>
                </Link>
                <span className="project-blurb d-none d-md-inline">
                  {project?.subtitle?.split(".")[0]}
                </span>
              </div>

              <span className="project-mobile-footnote d-lg-none">
                Explore Case Study →
              </span>
            </div>
          </div>

          <div
            className={`col-12 col-lg-6 order-1 ${
              index % 2 ? "order-lg-1" : "order-lg-2"
            }`}
          >
            <div
              className={`project-media ${isHovered ? "hovered" : ""}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="project-media-frame ratio ratio-16x9">
                <Link
                  to={`/projects/${project.id}`}
                  state={project}
                  className="d-block w-100 h-100"
                >
                  <OptimizedImage
                    src={project.image}
                    alt={project.title}
                    className="project-image w-100 h-100"
                  />
                </Link>
              </div>
              <div className="project-media-caption">
                <span className="caption-dot"></span>
                <span>{project?.subtitle?.split(".")[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectSkeletonCard = ({ index }) => {
  return (
    <div className="project-card mb-5" aria-hidden="true">
      <div className="project-shell project-shell-skeleton">
        <div className="row g-4 align-items-center">
          <div
            className={`col-12 col-lg-6 order-2 ${
              index % 2 ? "order-lg-2" : "order-lg-1"
            }`}
          >
            <div className="project-meta d-flex flex-column gap-3">
              <div className="d-flex align-items-center gap-2">
                <span className="skeleton-line skeleton-chip"></span>
                <span className="skeleton-line skeleton-chip"></span>
              </div>

              <span className="skeleton-line skeleton-title"></span>
              <span className="skeleton-line skeleton-subtitle"></span>

              <div className="d-none d-md-grid gap-2">
                <span className="skeleton-line skeleton-feature"></span>
                <span className="skeleton-line skeleton-feature w-75"></span>
                <span className="skeleton-line skeleton-feature w-50"></span>
              </div>

              <div className="d-none d-md-flex flex-wrap gap-2">
                <span className="skeleton-line skeleton-tag"></span>
                <span className="skeleton-line skeleton-tag"></span>
                <span className="skeleton-line skeleton-tag"></span>
              </div>

              <div className="d-flex align-items-center gap-3">
                <span className="skeleton-line skeleton-button"></span>
                <span className="skeleton-line skeleton-blurb d-none d-md-inline"></span>
              </div>
            </div>
          </div>

          <div
            className={`col-12 col-lg-6 order-1 ${
              index % 2 ? "order-lg-1" : "order-lg-2"
            }`}
          >
            <div className="project-media">
              <div className="project-media-frame ratio ratio-16x9">
                <span className="skeleton-line skeleton-media w-100 h-100"></span>
              </div>
              <div className="project-media-caption">
                <span className="caption-dot"></span>
                <span className="skeleton-line skeleton-caption"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadProjects = async () => {
      try {
        const res = await fetch(`${API.main}/api/projects`);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const json = await res.json();
        const list = Array.isArray(json) ? json : json.data || [];
        if (!isMounted) return;

        setProjects(list);

        const imagesLoaded = await preloadProjectImages(list.slice(0, 6));
        if (!isMounted) return;

        if (!imagesLoaded) {
          console.warn("Some project images are not loaded yet.");
        }
      } catch (e) {
        console.error("❌ Failed to load projects:", e.message);
        if (isMounted) setProjects([]);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadProjects();

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <section className="projects-section py-5">
      <div className="container">
        <div className="projects-heading mb-5">
          <div className="projects-heading-meta d-flex align-items-center gap-3">
            <span className="projects-heading-line"></span>
            <span className="projects-heading-index">02</span>
            <span className="projects-heading-label">The Showcase</span>
          </div>

          <h1 className="projects-heading-title mb-0">
            <span className="text-white">Curated </span>
            <span className="projects-heading-accent">Work</span>
          </h1>
        </div>

        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <ProjectSkeletonCard key={`skeleton-${index}`} index={index} />
            ))
          : projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
      </div>
    </section>
  );
}
