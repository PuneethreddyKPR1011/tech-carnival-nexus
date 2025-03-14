
import React from "react";

type HackathonProps = {
  openRegistration: () => void;
};

const Hackathon = ({ openRegistration }: HackathonProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-8 mb-16">
      <div className="md:w-1/2">
        <div className="p-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
          <div className="bg-black/90 backdrop-blur-md p-6 rounded-lg h-full">
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Hackathon</h3>
            <p className="mb-4">
              Our flagship 48-hour hackathon challenges teams to develop innovative solutions to real-world problems. 
              With mentorship from industry experts and access to cutting-edge technologies, this is your chance to 
              showcase your technical skills and creativity.
            </p>
            <p className="mb-6">
              Prize pool worth ₹1,00,000 with opportunities for internships and special recognitions from our sponsors.
            </p>
            <button 
              onClick={openRegistration} 
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-medium hover:opacity-90 transition-opacity"
            >
              Participate Now
            </button>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 flex items-center">
        <div className="bg-purple-900/20 p-6 rounded-lg border border-purple-500/30 backdrop-blur-sm">
          <h4 className="text-xl font-semibold mb-3">Hackathon Highlights</h4>
          <ul className="space-y-2">
            <li className="flex items-start">
              <svg className="w-5 h-5 text-purple-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>48-hour coding sprint with challenging problem statements</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-purple-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Mentorship from industry professionals</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-purple-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Free access to developer tools and APIs</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-purple-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Networking opportunities with tech leaders</span>
            </li>
            <li className="flex items-start">
              <svg className="w-5 h-5 text-purple-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>Attractive prizes and potential job opportunities</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Hackathon;
