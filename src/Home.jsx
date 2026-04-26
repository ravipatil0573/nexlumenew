import React, { useEffect } from "react";

import Hero from "./Component/Body/Hero/Hero";
import InfiniteScroll from "./Component/Body/InfiniteScrolling/InfiniteScrolling";
import VideoDescription from "./Component/Body/VideoDescription/VideoDescription";
import ProjectsSection from "./Component/Body/ProjectsSection/ProjectsSection";
import ServicesSection from "./Component/Body/ServicesSection/ServicesSection";
// import ScrollVelocity from "./Component/Body/ScrollVelocity/ScrollVelocity";
import "./Home.css";

const Home = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".home-container > *");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.2 },
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="home-container">
      <Hero />
      <InfiniteScroll />
      <VideoDescription />
      {/* <ScrollVelocity
        texts={["Creative Websites", "Digital Experiences"]}
        velocity={100}
        className="custom-scroll-text"
      /> */}
      <ProjectsSection />
      <ServicesSection />
    </div>
  );
};

export default Home;
