
import React from "react";

type HeroProps = {
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
  competitionRef: React.RefObject<HTMLDivElement>;
  timelineRef: React.RefObject<HTMLDivElement>;
};

const Hero = ({ scrollToSection, competitionRef, timelineRef }: HeroProps) => {
  return (
    <div className="pt-24 pb-12 min-h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-6">Tech Carnival 2024</h1>
      <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">Unleash your creativity and technical skills at the biggest tech event of the year.</p>
      <div className="flex flex-col md:flex-row gap-4">
        <button 
          onClick={() => scrollToSection(competitionRef)} 
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium hover:opacity-90 transition-opacity"
        >
          Join the Hackathon
        </button>
        <button 
          onClick={() => scrollToSection(timelineRef)}
          className="px-8 py-3 bg-transparent border border-purple-500 rounded-full text-white font-medium hover:bg-purple-900/30 transition-colors"
        >
          View Schedule
        </button>
      </div>
    </div>
  );
};

export default Hero;
