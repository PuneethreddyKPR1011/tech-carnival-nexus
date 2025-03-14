
import React from "react";

const TechEvents = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/2 md:order-2">
        <div className="p-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <div className="bg-black/90 backdrop-blur-md p-6 rounded-lg h-full">
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Tech Events</h3>
            <p className="mb-4">
              Beyond the hackathon, Tech Carnival features a series of engaging tech events including coding 
              competitions, tech quizzes, workshops, and panel discussions on emerging technologies.
            </p>
            <p className="mb-6">
              These events are designed to cater to participants of all skill levels, from beginners 
              to experienced professionals.
            </p>
            <button 
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium hover:opacity-90 transition-opacity"
            >
              View Events
            </button>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 md:order-1 flex items-center">
        <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-500/30 backdrop-blur-sm">
          <h4 className="text-xl font-semibold mb-3">Featured Events</h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-purple-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>AI/ML Workshop: Hands-on experience with the latest AI technologies</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-purple-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Tech Debate: Engaging discussions on controversial tech topics</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-purple-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Code Sprint: Fast-paced coding competition with time constraints</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-purple-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Design Jam: UI/UX design challenges with industry mentors</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TechEvents;
