import nexlumeVideo from "../../../assets/Video/nexlume_video.mp4"
import React from 'react';
import './VideoDescription.css';

export default function VideoDescription() {
  return (
    <section className="video-description">
      <div className="main-desc animate__animated animate__fadeInUp" id="animatedContent">
        <p>Empowering brands with cutting-edge web development, design, and digital solutions Nexlume transforms ideas into reality with innovation, precision, and expertise.</p>
      </div>

      <div className="video-container">
        <video className="background-video" autoPlay loop muted playsInline>
          <source src={nexlumeVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}
