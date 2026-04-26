# Testing Checklist for Nexlume Project

This document outlines a comprehensive testing checklist for the Nexlume project, a React-based portfolio website with a Node.js/Express backend. The checklist covers unit, integration, end-to-end, manual, and performance tests to ensure all features function correctly, including 3D scenes, email sending, project data fetching, and responsive design.

## Unit Tests

Unit tests focus on individual components, functions, and utilities in isolation.

- [ ] Test Hero component ([Hero.jsx](src/Component/Body/Hero/Hero.jsx)) renders with stars animation and profile image
- [ ] Test InfiniteScrolling component ([InfiniteScrolling.jsx](src/Component/Body/InfiniteScrolling/InfiniteScrolling.jsx)) displays items correctly
- [ ] Test VideoDescription component ([VideoDescription.jsx](src/Component/Body/VideoDescription/VideoDescription.jsx)) plays video on load
- [ ] Test ProjectsSection component ([ProjectsSection.jsx](src/Component/Body/ProjectsSection/ProjectsSection.jsx)) fetches and displays projects with videos
- [ ] Test ServicesSection component ([ServicesSection.jsx](src/Component/Body/ServicesSection/ServicesSection.jsx)) renders service offerings
- [ ] Test Contact form ([Contact.jsx](src/Component/Contacts/Contact.jsx)) validates required fields (name, email, phone, message)
- [ ] Test Navbar component ([Navbar.jsx](src/Component/Navbar/Navbar.jsx)) navigation links work
- [ ] Test Footer component ([Footer.jsx](src/Component/Footer/Footer.jsx)) displays correctly with CircularText
- [ ] Test Loader component ([Loader.jsx](src/Component/Loader/Loader.jsx)) shows RingLoader for 3 seconds on app start
- [ ] Test Projects page ([Project.jsx](src/Component/Projects/Project.jsx)) lists projects with pagination
- [ ] Test ProjectDetails page ([ProjectDetails.jsx](src/Component/Projects/ProjectDetails.jsx)) displays individual project details
- [ ] Test Services page ([Service.jsx](src/Component/Service/Service.jsx)) with FlowingMenu interaction
- [ ] Test Team page ([Team.jsx](src/Component/Team/Team.jsx)) shows team members
- [ ] Test SplineScene component ([SplineScene.jsx](components/ui/SplineScene.jsx)) loads 3D scene
- [ ] Test MagicBento component ([MagicBento.jsx](components/MagicBento.jsx)) for project grid layout
- [ ] Test Spotlight component ([Spotlight.jsx](components/ui/Spotlight.jsx)) UI effects
- [ ] Test Lanyard component ([Lanyard.jsx](components/Lanyard.jsx)) social links
- [ ] Test API utility functions in [lib/api.js](src/lib/api.js) (e.g., fetch projects, send email)
- [ ] Test utility functions in [lib/utils.js](src/lib/utils.js) and [lib/utils.jsx](src/lib/utils.jsx)
- [ ] Test backend Project model ([models/Project.js](projects-api/models/Project.js)) schema validation
- [ ] Test email route ([routes/email.js](projects-api/routes/email.js)) sends emails via Nodemailer
- [ ] Test projects route ([routes/projects.js](projects-api/routes/projects.js)) returns paginated data
- [ ] Test health check endpoint (/api/health) returns {ok: true}

## Integration Tests

Integration tests verify interactions between components, modules, and systems.

- [ ] Test frontend-backend connection: ProjectsSection fetches data from /api/projects
- [ ] Test contact form submission: Form data sent to /api/email/send-enrollment triggers emails
- [ ] Test project pagination: Frontend handles limit/page query params correctly
- [ ] Test fallback data: ProjectsSection displays hardcoded projects when API fails
- [ ] Test MongoDB integration: Seeding via [seed/seed.js](projects-api/seed/seed.js) populates database
- [ ] Test email sending: User receives welcome email, admin gets notification
- [ ] Test CORS and security: Requests from frontend to backend work with Helmet/Morgan
- [ ] Test routing: React Router navigates between Home, Projects, Services, Team, Contact pages
- [ ] Test animations: Framer Motion and GSAP effects trigger on scroll/interaction
- [ ] Test smooth scrolling: Lenis integration with navbar links and Hero "Connect" button
- [ ] Test 3D elements: Three.js and Spline scenes render without errors
- [ ] Test video playback: Projects and VideoDescription videos load and play
- [ ] Test form auto-detection: Phone field detects country code via ipapi.co
- [ ] Test IntersectionObserver: Fade-in animations on Home sections

## End-to-End Tests

E2E tests simulate real user journeys through the application.

- [ ] User loads Home page: Loader shows, then Hero, InfiniteScrolling, VideoDescription, ProjectsSection, ServicesSection render
- [ ] User navigates to Projects page: Lists projects, clicks on one to view ProjectDetails
- [ ] User navigates to Services page: Views services, interacts with FlowingMenu
- [ ] User navigates to Team page: Views team profiles
- [ ] User navigates to Contact page: Fills and submits form, receives success feedback
- [ ] User scrolls on Home: Smooth scrolling and animations trigger
- [ ] User interacts with 3D scenes: SplineScene loads and is interactive
- [ ] User views on mobile: Responsive design adjusts layouts
- [ ] User submits invalid contact form: Validation errors display
- [ ] User experiences API failure: Fallback data shows in ProjectsSection
- [ ] User receives emails: After form submission, check inbox for welcome and admin emails

## Manual Tests

Manual tests for user experience, accessibility, and edge cases not easily automated.

- [ ] Test responsiveness: Check layouts on desktop, tablet, mobile (Tailwind breakpoints)
- [ ] Test accessibility: ARIA attributes, keyboard navigation, screen reader compatibility
- [ ] Test browser compatibility: Chrome, Firefox, Safari, Edge
- [ ] Test loading states: Spinners and loaders appear during API calls
- [ ] Test error handling: Invalid routes, 404 pages, API errors
- [ ] Test animations: Smooth transitions, no jank on low-end devices
- [ ] Test videos: Autoplay, controls, fallback for unsupported formats
- [ ] Test forms: Input validation, country code detection, submission feedback
- [ ] Test email functionality: Verify Gmail transporter sends correctly (check spam)
- [ ] Test database: MongoDB queries return correct data, seeding works
- [ ] Test environment variables: API_BASE, EMAIL_USER, etc., configured correctly
- [ ] Test concurrent users: Multiple form submissions don't conflict
- [ ] Test offline mode: Graceful degradation when network fails
- [ ] Test security: No sensitive data exposed, Helmet headers set

## Performance Tests

Performance tests ensure the application is fast and efficient.

- [ ] Test initial load time: App loads within 3 seconds (including 3s loader)
- [ ] Test API response times: /api/projects and /api/email respond under 500ms
- [ ] Test bundle size: Vite build optimized, no large unused assets
- [ ] Test memory usage: 3D scenes don't cause memory leaks
- [ ] Test scrolling performance: Lenis smooth scrolling at 60fps
- [ ] Test video loading: Projects videos load quickly without blocking
- [ ] Test Lighthouse scores: Aim for 90+ on performance, accessibility, SEO
- [ ] Test on slow networks: Fallbacks and loading states work
- [ ] Test CPU usage: Animations don't spike CPU on mobile
- [ ] Test database queries: Efficient MongoDB queries for projects

## Setup and Execution Notes

- **Testing Framework Suggestions**: Use Jest + React Testing Library for unit/integration, Cypress for E2E, Lighthouse for performance.
- **Environment**: Run frontend with `npm run dev`, backend with `npm run dev` in projects-api/, use `npm run dev:all` for both.
- **Data Setup**: Seed database with [seed/seed.js](projects-api/seed/seed.js) before tests.
- **Priorities**: High - Core features (Hero, Projects, Contact); Medium - Animations, 3D; Low - Edge cases.
- **Tracking**: Mark checkboxes as completed, note any failures with details.

This checklist is based on the project's features as of January 19, 2026. Update as new features are added.
