import React from "react";
import "./InfiniteScrolling.css";

// Eagerly import all logo assets so Vite resolves hashed URLs at build time
// NOTE: this path is relative to src/Component/Body/InfiniteScrolling/
const logoMap = import.meta.glob("../../../assets/Logo/*.png", {
  eager: true,
  import: "default",
});

const resolveLogo = (fileName) => {
  const key = `../../../assets/Logo/${fileName}.png`;
  return logoMap[key] || "";
};

const InfiniteScrolling = () => {
  // Logo data arrays
  const firstRowLogos = [
    { name: "adobe-after-effects", alt: "Adobe After Effects" },
    { name: "adobe-illustrator", alt: "Adobe Illustrator" },
    { name: "adobe-media-encoder", alt: "Adobe Media Encoder" },
    { name: "android", alt: "Android" },
    { name: "angular", alt: "Angular" },
    { name: "ASP", alt: "ASP.NET" },
    { name: "blender", alt: "Blender" },
    { name: "Bootstrap", alt: "Bootstrap" },
    { name: "Csharp", alt: "C#" },
    { name: "c++", alt: "C++" },
    { name: "C", alt: "C" },
    { name: "CSS", alt: "CSS" },
    { name: "dart", alt: "Dart" },
    { name: "django", alt: "Django" },
    { name: "express", alt: "Express.js" },
    { name: "figma", alt: "Figma" },
    { name: "firebases", alt: "Firebase" },
    { name: "flask", alt: "Flask" },
    { name: "flutter", alt: "Flutter" },
    { name: "git", alt: "Git" },
  ];

  const secondRowLogos = [
    { name: "HTML", alt: "HTML" },
    { name: "JAVA", alt: "Java" },
    { name: "JS", alt: "JavaScript" },
    { name: "JSP", alt: "JSP" },
    { name: "linux", alt: "Linux" },
    { name: "MongoDB", alt: "MongoDB" },
    { name: "Mysql", alt: "MySQL" },
    { name: "Netlify", alt: "Netlify" },
    { name: "NodeJS", alt: "Node.js" },
    { name: "photoshop", alt: "Photoshop" },
    { name: "PHP", alt: "PHP" },
    { name: "Premiere PRo", alt: "Premiere Pro" },
    { name: "python", alt: "Python" },
    { name: "React", alt: "React" },
    { name: "vs", alt: "Visual Studio" },
    { name: "Selenium", alt: "Selenium" },
    { name: "SQL", alt: "SQL" },
    { name: "Typescript", alt: "TypeScript" },
    { name: "wordpress", alt: "WordPress" },
    { name: "XML", alt: "XML" },
  ];

  return (
    <section id="infinite-scrolling" className="py-5">
      <div className="container-fluid">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h2 className="section-title">Technologies We Work With</h2>
          </div>
        </div>

        <div className="wrapper">
          {/* First row (scrolling left) */}
          <div className="logos-slide">
            {firstRowLogos.map((logo, index) => (
              <div className="logo-item" key={`first-${index}`}>
                <img
                  src={resolveLogo(logo.name)}
                  alt={logo.alt}
                  className="img-fluid logo-image"
                />
              </div>
            ))}
            {/* Duplicate logos for seamless looping */}
            {firstRowLogos.map((logo, index) => (
              <div className="logo-item" key={`first-dup-${index}`}>
                <img
                  src={resolveLogo(logo.name)}
                  alt={logo.alt}
                  className="img-fluid logo-image"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="wrapper reverse">
          {/* Second row (scrolling right) */}
          <div className="logos-slide">
            {secondRowLogos.map((logo, index) => (
              <div className="logo-item" key={`second-${index}`}>
                <img
                  src={resolveLogo(logo.name)}
                  alt={logo.alt}
                  className="img-fluid logo-image"
                />
              </div>
            ))}
            {/* Duplicate logos for seamless looping */}
            {secondRowLogos.map((logo, index) => (
              <div className="logo-item" key={`second-dup-${index}`}>
                <img
                  src={resolveLogo(logo.name)}
                  alt={logo.alt}
                  className="img-fluid logo-image"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfiniteScrolling;
