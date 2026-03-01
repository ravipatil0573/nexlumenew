import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OptimizedImage } from "../../components/OptimizedImage";
import "./ProjectDetailsNew.css";

const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5000";

const normalizeProject = (data) => {
  if (!data) return null;

  return {
    ...data,
    name: data.name || data.title || "Project Name",
    overview:
      data.overview ||
      data.subtitle ||
      "A modern developer-focused product built for speed, scale, and business impact.",
    tags: Array.isArray(data.tags) ? data.tags : [],
    description: Array.isArray(data.description) ? data.description : [],
    screenshots: data.screenshots?.length
      ? data.screenshots
      : data.image
        ? [data.image]
        : [],
    image: data.screenshots?.[0] || data.image || "",
    problem:
      data.problem ||
      "Users needed a robust digital workflow without performance trade-offs, requiring careful architecture and consistent UX standards.",
    solution:
      data.solution ||
      "Built with a modular stack and optimization-first implementation, delivering maintainable code quality with a faster and cleaner experience.",
    links: {
      demo: data.links?.demo || data.demo || null,
      repo: data.links?.repo || data.repo || null,
    },
  };
};

const DEFAULT_USER_JOURNEY = [
  {
    id: 1,
    title: "Discovery",
    detail:
      "Potential users discover the product through social proof and targeted content.",
  },
  {
    id: 2,
    title: "Engage",
    detail:
      "Clear value communication encourages users to explore key capabilities.",
  },
  {
    id: 3,
    title: "Interact",
    detail:
      "Users navigate core workflows with intuitive controls and fast feedback.",
  },
  {
    id: 4,
    title: "Convert",
    detail:
      "Focused journeys reduce friction and move users toward high-value actions.",
  },
];

const DEFAULT_DECISIONS = [
  {
    id: "decision-1",
    title: "Architecture & Scalability",
    body: "Adopted a component-driven React architecture with reusable feature blocks to reduce coupling and support independent deployment. This supports maintainability and parallel team velocity.",
  },
  {
    id: "decision-2",
    title: "Performance Optimization",
    body: "Used lazy loading, optimized media delivery, and production bundle strategies to improve runtime responsiveness and keep interaction latency low.",
  },
  {
    id: "decision-3",
    title: "Data Management",
    body: "Implemented a predictable API shape and normalized project payloads to avoid client inconsistency, resulting in cleaner state and better reliability.",
  },
  {
    id: "decision-4",
    title: "Security & Authentication",
    body: "Applied secure request patterns and protected route handling to maintain a safe baseline for user and project data operations.",
  },
];

const IMPACT_STATS = [
  { metric: "100%", label: "Performance Boost" },
  { metric: "95%", label: "Faster Load Time" },
  { metric: "Zero", label: "Critical Bugs at Launch" },
  { metric: "2x", label: "Faster Delivery Time" },
];

const TAB_KEYS = {
  FRONTEND: "frontend",
  BACKEND: "backend",
  DATABASE: "database",
};

const FRONTEND_MATCH = [
  "react",
  "vue",
  "angular",
  "javascript",
  "typescript",
  "bootstrap",
  "tailwind",
  "next",
  "vite",
  "html",
  "css",
];

const BACKEND_MATCH = [
  "node",
  "express",
  "nestjs",
  "django",
  "flask",
  "rest",
  "graphql",
  "api",
  "jwt",
  "auth",
];

const DATABASE_MATCH = [
  "mongo",
  "postgres",
  "mysql",
  "firebase",
  "redis",
  "supabase",
  "database",
];

const fallbackByTab = {
  [TAB_KEYS.FRONTEND]: ["React", "Bootstrap", "HTML5", "JavaScript"],
  [TAB_KEYS.BACKEND]: ["Node.js", "Express.js", "REST API", "JWT Auth"],
  [TAB_KEYS.DATABASE]: ["MongoDB", "Mongoose", "Redis", "PostgreSQL"],
};

const includeByKeyword = (source, keywords) =>
  source.filter((item) => {
    const lower = item.toLowerCase();
    return keywords.some((keyword) => lower.includes(keyword));
  });

const PROJECT_ID_CONTENT_MAP = {
  1: {
    journey: [
      {
        id: 1,
        title: "Discovery",
        detail:
          "Founders discover startup opportunities and investor-focused listings.",
      },
      {
        id: 2,
        title: "Engage",
        detail:
          "Pitch submissions and feedback loops increase user involvement.",
      },
      {
        id: 3,
        title: "Interact",
        detail: "Real-time dashboards guide founders through idea validation.",
      },
      {
        id: 4,
        title: "Convert",
        detail: "Qualified opportunities convert to investor conversations.",
      },
    ],
  },
  2: {
    journey: [
      {
        id: 1,
        title: "Discovery",
        detail:
          "Developers discover coding rooms and collaborative challenges.",
      },
      {
        id: 2,
        title: "Engage",
        detail: "Users join sessions and connect to team-based challenges.",
      },
      {
        id: 3,
        title: "Interact",
        detail: "Live code sharing and WebSocket sync keep teams aligned.",
      },
      {
        id: 4,
        title: "Convert",
        detail: "Consistent participation drives repeat session retention.",
      },
    ],
  },
};

const toImpactStats = (project) => {
  const metrics = project?.cards?.find(
    (card) => card?.type === "metrics",
  )?.metrics;
  if (Array.isArray(metrics) && metrics.length > 0) {
    return metrics.slice(0, 4).map((metric) => ({
      metric: metric.value || "0",
      label: metric.label || "Metric",
    }));
  }
  return IMPACT_STATS;
};

const buildProjectContent = (project, routeId) => {
  const numericId = Number(project?.id ?? routeId);
  const mapped = PROJECT_ID_CONTENT_MAP[numericId] || {};
  const words = String(project?.name || "Project Details")
    .toUpperCase()
    .split(/\s+/)
    .filter(Boolean);
  const titleTop = words.slice(0, 1).join(" ") || "PROJECT";
  const titleBottom = words.slice(1).join(" ") || "DETAILS";

  const firstDescription = project?.description?.[0];
  const secondDescription = project?.description?.[1];
  const overviewCard = project?.cards?.find(
    (card) => card?.type === "overview",
  );
  const featureCard = project?.cards?.find((card) => card?.type === "list");

  const problemText =
    project?.problem ||
    overviewCard?.description ||
    firstDescription ||
    "Users needed a robust digital workflow without performance trade-offs, requiring careful architecture and consistent UX standards.";

  const solutionText =
    project?.solution ||
    featureCard?.items?.[0] ||
    secondDescription ||
    "Built with a modular stack and optimization-first implementation, delivering maintainable code quality with a faster and cleaner experience.";

  const decisions = [
    {
      id: "decision-1",
      title: "Architecture & Scalability",
      body: `Implemented a reusable component architecture for ${project?.name || "the project"}, enabling cleaner extension and easier feature rollout.`,
    },
    {
      id: "decision-2",
      title: "Performance Optimization",
      body:
        project?.description?.[0] ||
        "Optimized rendering, media, and page load strategy to keep interaction flow responsive.",
    },
    {
      id: "decision-3",
      title: "Data Management",
      body:
        project?.description?.[1] ||
        "Standardized payload structure and API mapping to keep the UI predictable across states.",
    },
    {
      id: "decision-4",
      title: "Security & Authentication",
      body:
        project?.description?.[2] ||
        "Applied secure request and deployment patterns suitable for production usage.",
    },
  ];

  return {
    titleTop,
    titleBottom,
    problemText,
    solutionText,
    journey: mapped.journey || DEFAULT_USER_JOURNEY,
    decisions,
    impactStats: toImpactStats(project),
  };
};

const SectionHeading = ({
  sectionNo,
  sectionLabel,
  topWord,
  accentWord,
  bottomWord,
}) => (
  <header className="pdx-head-block">
    <div className="pdx-head-meta">
      <span className="pdx-head-line" />
      <span className="pdx-head-number">{sectionNo}</span>
      <span className="pdx-head-label">{sectionLabel}</span>
    </div>
    <h2 className="pdx-section-title">
      <span>{topWord}</span>
      <span className="pdx-title-accent">{accentWord}</span>
      {bottomWord && (
        <span className="pdx-white pdx-title-bottom">{bottomWord}</span>
      )}
    </h2>
  </header>
);

export default function ProjectDetailsNew() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(TAB_KEYS.FRONTEND);
  const [activeDecision, setActiveDecision] = useState(DEFAULT_DECISIONS[0].id);

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
        setProject(normalizeProject(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const techGroups = useMemo(() => {
    const source = Array.isArray(project?.tags) ? project.tags : [];

    return {
      [TAB_KEYS.FRONTEND]:
        includeByKeyword(source, FRONTEND_MATCH).length > 0
          ? includeByKeyword(source, FRONTEND_MATCH)
          : fallbackByTab[TAB_KEYS.FRONTEND],
      [TAB_KEYS.BACKEND]:
        includeByKeyword(source, BACKEND_MATCH).length > 0
          ? includeByKeyword(source, BACKEND_MATCH)
          : fallbackByTab[TAB_KEYS.BACKEND],
      [TAB_KEYS.DATABASE]:
        includeByKeyword(source, DATABASE_MATCH).length > 0
          ? includeByKeyword(source, DATABASE_MATCH)
          : fallbackByTab[TAB_KEYS.DATABASE],
    };
  }, [project?.tags]);

  const mappedContent = useMemo(
    () => buildProjectContent(project, id),
    [project, id],
  );

  useEffect(() => {
    if (mappedContent.decisions?.length) {
      setActiveDecision(mappedContent.decisions[0].id);
    }
  }, [mappedContent.decisions]);

  if (loading) {
    return (
      <div className="pdx-loading">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="pdx-error">
        <h2>PROJECT NOT FOUND</h2>
        <button
          className="pdx-btn pdx-btn-outline"
          onClick={() => navigate("/")}
        >
          BACK HOME
        </button>
      </div>
    );
  }

  const previewImage = project.image || project.screenshots?.[0] || "";

  return (
    <div className="pdx-page">
      <section className="pdx-section pdx-hero">
        <div className="container-lg">
          <div className="pdx-hero-grid">
            <div className="pdx-hero-left pdx-reveal">
              <p className="pdx-eyebrow">01 / 07</p>
              <h1 className="pdx-hero-title">
                <span className="pdx-hero-main">{mappedContent.titleTop}</span>
                <span className="pdx-hero-accent">{mappedContent.titleBottom}</span>
              </h1>
              <p className="pdx-hero-subtitle">{project.overview}</p>

              <div className="pdx-chip-row">
                {(project.tags.length
                  ? project.tags
                  : techGroups[TAB_KEYS.FRONTEND]
                )
                  .slice(0, 6)
                  .map((tag) => (
                    <span key={tag} className="pdx-chip">
                      {tag}
                    </span>
                  ))}
              </div>
            </div>

            <div className="pdx-hero-right pdx-reveal">
              <article className="pdx-preview-card">
                <div className="pdx-preview-head">
                  <span className="pdx-preview-dot" />
                  <span className="pdx-preview-title">LIVE PREVIEW</span>
                </div>

                <div className="pdx-preview-media">
                  {previewImage ? (
                    <OptimizedImage
                      src={previewImage}
                      alt={`${project.name} preview`}
                      className="pdx-preview-image"
                    />
                  ) : (
                    <div className="pdx-preview-placeholder">
                      NO PREVIEW IMAGE
                    </div>
                  )}
                </div>

                <div className="pdx-preview-actions">
                  {project.links?.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="pdx-btn pdx-btn-solid"
                    >
                      LIVE PREVIEW
                    </a>
                  )}
                  {project.links?.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="pdx-btn pdx-btn-outline"
                    >
                      SOURCE CODE
                    </a>
                  )}
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="pdx-section">
        <div className="container-lg pdx-reveal">
          <SectionHeading
            sectionNo="02"
            sectionLabel="THE CHALLENGE"
            topWord="THE"
            accentWord="PROBLEM"
            bottomWord="& SOLUTION"
          />

          <div className="pdx-two-card-grid">
            <article className="pdx-dark-card">
              <div className="pdx-card-top">
                <span className="pdx-red-icon">•</span>
                <span className="pdx-card-number">01</span>
              </div>
              <h3 className="pdx-card-title">THE PROBLEM</h3>
              <p className="pdx-card-text">{mappedContent.problemText}</p>
            </article>

            <article className="pdx-dark-card">
              <div className="pdx-card-top">
                <span className="pdx-red-icon">•</span>
                <span className="pdx-card-number">02</span>
              </div>
              <h3 className="pdx-card-title">THE SOLUTION</h3>
              <p className="pdx-card-text">{mappedContent.solutionText}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="pdx-section">
        <div className="container-lg pdx-reveal">
          <SectionHeading
            sectionNo="03"
            sectionLabel="USER FLOW"
            topWord="USER"
            accentWord="JOURNEY"
          />

          <div className="pdx-journey-stack">
            {mappedContent.journey.map((item) => (
              <article key={item.id} className="pdx-journey-item">
                <div className="pdx-step-circle">{item.id}</div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="pdx-journey-mini-grid">
            {mappedContent.journey.map((item) => (
              <article key={`mini-${item.id}`} className="pdx-mini-card">
                <span>{item.id}</span>
                <h4>{item.title}</h4>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pdx-section">
        <div className="container-lg pdx-reveal">
          <SectionHeading
            sectionNo="04"
            sectionLabel="BUILT WITH"
            topWord="TECHNOLOGY"
            accentWord="STACK"
          />

          <div className="pdx-tabs" role="tablist" aria-label="Technology tabs">
            <button
              type="button"
              className={`pdx-tab ${activeTab === TAB_KEYS.FRONTEND ? "active" : ""}`}
              onClick={() => setActiveTab(TAB_KEYS.FRONTEND)}
            >
              FRONTEND
            </button>
            <button
              type="button"
              className={`pdx-tab ${activeTab === TAB_KEYS.BACKEND ? "active" : ""}`}
              onClick={() => setActiveTab(TAB_KEYS.BACKEND)}
            >
              BACKEND
            </button>
            <button
              type="button"
              className={`pdx-tab ${activeTab === TAB_KEYS.DATABASE ? "active" : ""}`}
              onClick={() => setActiveTab(TAB_KEYS.DATABASE)}
            >
              DATABASE
            </button>
          </div>

          <div className="pdx-tech-list-card">
            {techGroups[activeTab].map((tech) => (
              <div key={`${activeTab}-${tech}`} className="pdx-tech-row">
                <span className="pdx-tech-dot" />
                <span className="pdx-tech-name">{tech}</span>
                <span className="pdx-tech-tag">Framework</span>
              </div>
            ))}
          </div>

          <div className="pdx-tech-mini-grid">
            {techGroups[activeTab].slice(0, 6).map((tech) => (
              <article key={`mini-tech-${tech}`} className="pdx-mini-tech-card">
                <span className="pdx-mini-tech-dot" />
                <h4>{tech}</h4>
                <p>Production-ready implementation</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pdx-section">
        <div className="container-lg pdx-reveal">
          <SectionHeading
            sectionNo="05"
            sectionLabel="ARCHITECTURE"
            topWord="KEY"
            accentWord="DECISIONS"
          />

          <div className="pdx-accordion">
            {mappedContent.decisions.map((item, index) => {
              const expanded = activeDecision === item.id;
              return (
                <article
                  key={item.id}
                  className={`pdx-accordion-item ${expanded ? "active" : ""}`}
                >
                  <button
                    type="button"
                    className="pdx-accordion-trigger"
                    onClick={() =>
                      setActiveDecision((previous) =>
                        previous === item.id ? "" : item.id,
                      )
                    }
                    aria-expanded={expanded}
                  >
                    <span className="pdx-accordion-index">{`0${index + 1}`}</span>
                    <span className="pdx-accordion-title">{item.title}</span>
                    <span className="pdx-accordion-sign">
                      {expanded ? "−" : "+"}
                    </span>
                  </button>

                  {expanded && (
                    <p className="pdx-accordion-body">{item.body}</p>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pdx-section">
        <div className="container-lg pdx-reveal">
          <SectionHeading
            sectionNo="06"
            sectionLabel="RESULTS"
            topWord="THE"
            accentWord="IMPACT"
          />

          <div className="pdx-impact-grid">
            {mappedContent.impactStats.map((item) => (
              <article key={item.label} className="pdx-impact-card">
                <h3>{item.metric}</h3>
                <p>{item.label}</p>
              </article>
            ))}
          </div>

          <p className="pdx-impact-summary">
            {project.name} demonstrates production-grade architecture,
            measurable performance gains, and consistent delivery quality from
            planning to launch.
          </p>
        </div>
      </section>

      <section className="pdx-section pdx-cta-section">
        <div className="container-lg pdx-reveal">
          <article className="pdx-cta-banner">
            <p>READY TO EXPLORE?</p>
            <h2>
              EXPLORE FULL <span>PROJECT</span>
            </h2>

            <div className="pdx-cta-actions">
              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="pdx-btn pdx-btn-solid"
                >
                  VIEW LIVE PROJECT
                </a>
              )}
              {project.links?.repo && (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noreferrer"
                  className="pdx-btn pdx-btn-outline"
                >
                  SOURCE CODE
                </a>
              )}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
