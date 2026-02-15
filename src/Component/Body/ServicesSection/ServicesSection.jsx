import React from "react";
import { Link } from "react-router-dom";

const ServicesSection = () => {
  const services = [
    {
      id: "logo",
      icon: "fa-pen-nib",
      name: "Logo Systems",
      description:
        "Identity suites, motion logos, and adaptive marks for every surface.",
      link: "/services",
      tags: ["Brand Kits", "Guidelines", "Motion Idents"],
    },
    {
      id: "video",
      icon: "fa-video",
      name: "Cinematic Edits",
      description:
        "Narrative-led edits, sound design, and social-first exports that convert.",
      link: "/services",
      tags: ["Storyboards", "Color Grade", "Shortform"],
    },
    {
      id: "webdev",
      icon: "fa-code",
      name: "Full-Stack Web",
      description:
        "Robust builds with React, secure APIs, and tuned Lighthouse scores.",
      link: "/services",
      tags: ["Performance", "SEO", "Scalable"],
    },
    {
      id: "graphic",
      icon: "fa-paint-brush",
      name: "Graphic Systems",
      description:
        "Campaign visuals, pitch decks, and launch kits that stay on-brand.",
      link: "/services",
      tags: ["Campaigns", "Decks", "Social Kits"],
    },
    {
      id: "webdesign",
      icon: "fa-laptop",
      name: "Interface Craft",
      description:
        "Intentional UX, microcopy, and component libraries ready for devs.",
      link: "/services",
      tags: ["Design Systems", "UX", "Handoff"],
    },
    {
      id: "app",
      icon: "fa-mobile-alt",
      name: "App Experiences",
      description:
        "Cross-platform apps with smooth motion and reliable offline states.",
      link: "/services",
      tags: ["iOS / Android", "PWA", "Animations"],
    },
  ];

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      <section className="relative min-h-screen py-20 overflow-hidden bg-black font-primary">
        {/* Gradient Glow Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-[#C80000] opacity-10 blur-[120px] rounded-full" />
          <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-blue-500 opacity-5 blur-[100px] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-[#C80000]/5 to-transparent blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between mb-20 text-left">
            <div className="w-full md:w-auto mb-8 md:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <p className="text-xs tracking-[0.3em] text-gray-500 uppercase font-medium">
                  WHAT WE DO
                </p>
                <div className="w-4 h-4 flex items-center justify-center rounded-full bg-white/5">
                  <i className="fa-solid fa-arrow-down text-[8px] text-gray-500"></i>
                </div>
              </div>
              <h1 className="mb-4 text-5xl sm:text-6xl md:text-7xl font-bold font-heading bg-gradient-to-r from-[#C80000] via-[#ff3d3d] to-[#C80000] bg-clip-text text-transparent leading-tight">
                Built-for-impact services
              </h1>
              <p className="text-lg text-gray-400 max-w-xl">
                Dark, cinematic, and unapologetically Nexlume.
              </p>
            </div>
            <Link
              to="/services"
              className="group inline-flex items-center justify-center w-full md:w-auto px-6 py-3.5 text-sm font-medium text-white bg-transparent border border-white/20 rounded-full transition-all duration-300 hover:bg-white/5 hover:border-white/40 hover:shadow-[0_0_30px_rgba(200,0,0,0.2)] no-underline"
            >
              View all Services
              <i className="fa-solid fa-arrow-right ml-2 text-xs transition-transform duration-300 group-hover:translate-x-1"></i>
            </Link>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {services.map((service, idx) => (
              <Link
                key={service.id}
                to={service.link}
                className="group relative block overflow-hidden p-9 text-left no-underline transition-all duration-500 bg-gradient-to-br from-[#1a1a1a]/70 via-[#0d0d0d]/80 to-black/90 backdrop-blur-xl border border-white/10 rounded-lg hover:border-[#C80000]/40 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.7),0_0_80px_rgba(200,0,0,0.15)]"
                style={{
                  boxShadow:
                    "0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                }}
              >
                {/* Gradient Glow on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#C80000]/20 to-transparent blur-3xl" />
                </div>

                {/* Header Section */}
                <div className="flex items-start justify-between mb-6 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <i
                        className={`fa-solid ${service.icon} text-2xl text-white`}
                      ></i>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase tracking-[0.3em] text-gray-500 mb-2.5 font-semibold">
                        SERVICE {idx + 1}
                      </p>
                      <h3 className="text-[26px] font-bold text-[#C80000] leading-tight group-hover:text-[#ff3d3d] transition-colors">
                        {service.name}
                      </h3>
                    </div>
                  </div>
                  <span className="px-3.5 py-2 text-[10px] font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
                    Ready to build
                  </span>
                </div>

                {/* Description */}
                <p className="text-[15px] text-gray-300/90 leading-[1.7] mb-6 relative z-10">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2.5 mb-6 relative z-10">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3.5 py-2 text-xs font-medium text-gray-400 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20 group-hover:text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-5 border-t border-white/5 relative z-10">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 bg-[#C80000] rounded-full animate-pulse"></span>
                    <span className="text-xs font-medium text-gray-400">
                      Crafted for velocity
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-400 transition-colors group-hover:text-white">
                    <span>View details</span>
                    <i className="fa-solid fa-arrow-right transition-transform group-hover:translate-x-1"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
