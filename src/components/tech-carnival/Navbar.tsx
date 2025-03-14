
import { useRef } from "react";

type NavbarProps = {
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
  topRef: React.RefObject<HTMLDivElement>;
  aboutRef: React.RefObject<HTMLDivElement>;
  teamRef: React.RefObject<HTMLDivElement>;
  timelineRef: React.RefObject<HTMLDivElement>;
  competitionRef: React.RefObject<HTMLDivElement>;
  contactRef: React.RefObject<HTMLDivElement>;
};

const Navbar = ({
  scrollToSection,
  topRef,
  aboutRef,
  teamRef,
  timelineRef,
  competitionRef,
  contactRef
}: NavbarProps) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/70 backdrop-blur-md border-b border-purple-900/50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div 
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent cursor-pointer"
            onClick={() => scrollToSection(topRef)}
          >
            Tech Carnival
          </div>
        </div>
        <div className="hidden md:flex space-x-8">
          <button onClick={() => scrollToSection(aboutRef)} className="hover:text-purple-400 transition-colors">About</button>
          <button onClick={() => scrollToSection(teamRef)} className="hover:text-purple-400 transition-colors">Team</button>
          <button onClick={() => scrollToSection(timelineRef)} className="hover:text-purple-400 transition-colors">Timeline</button>
          <button onClick={() => scrollToSection(competitionRef)} className="hover:text-purple-400 transition-colors">Competition</button>
          <button onClick={() => scrollToSection(contactRef)} className="hover:text-purple-400 transition-colors">Contact</button>
        </div>
        <div className="md:hidden">
          <button className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
