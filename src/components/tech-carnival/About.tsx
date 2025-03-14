
import React from "react";

type AboutProps = {
  aboutRef: React.RefObject<HTMLDivElement>;
};

const About = ({ aboutRef }: AboutProps) => {
  return (
    <div ref={aboutRef} className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">About Tech Carnival</h2>
        <div className="max-w-3xl mx-auto bg-purple-900/20 p-6 rounded-lg border border-purple-500/30 backdrop-blur-sm">
          <p className="text-lg mb-4">
            Tech Carnival is an annual technology event that brings together students, developers, designers, and tech enthusiasts from across the country to collaborate, learn, and build innovative solutions.
          </p>
          <p className="text-lg mb-4">
            This year's event features a 48-hour hackathon, workshops on cutting-edge technologies, networking opportunities with industry professionals, and exciting tech competitions with attractive prizes.
          </p>
          <p className="text-lg">
            Whether you're a coding expert or just starting your tech journey, Tech Carnival offers something for everyone. Join us and be part of the tech revolution!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
