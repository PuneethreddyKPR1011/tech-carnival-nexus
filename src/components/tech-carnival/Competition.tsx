
import React from "react";
import Hackathon from "./Hackathon";
import TechEvents from "./TechEvents";

type CompetitionProps = {
  competitionRef: React.RefObject<HTMLDivElement>;
  openRegistration: () => void;
};

const Competition = ({ competitionRef, openRegistration }: CompetitionProps) => {
  return (
    <div ref={competitionRef} className="py-16 px-4 bg-black/30">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Competitions</h2>
        <Hackathon openRegistration={openRegistration} />
        <TechEvents />
      </div>
    </div>
  );
};

export default Competition;
