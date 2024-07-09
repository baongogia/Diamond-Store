import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const IntroVideo = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 2000,
    });
  }, []);

  return (
    <div
      data-aos="fade-up"
      className="w-screen flex justify-center items-center -mt-12 2xl:-mt-16"
    >
      <video
        className="object-cover" // Ensures the video covers the container while maintaining aspect ratio
        autoPlay
        loop
        muted
        style={{
          width: "94.5vw",
          height: "34.9rem",
        }}
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default IntroVideo;
