
import React from "react";

type TimelineEvent = {
  date: string;
  title: string;
  description: string;
};

type TimelineProps = {
  timelineRef: React.RefObject<HTMLDivElement>;
  timelineEvents: TimelineEvent[];
};

const Timeline = ({ timelineRef, timelineEvents }: TimelineProps) => {
  return (
    <div ref={timelineRef} className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Event Timeline</h2>
        <div className="max-w-4xl mx-auto">
          {timelineEvents.map((event, index) => (
            <div key={index} className="relative pl-8 pb-8 ml-8">
              {/* Timeline line */}
              {index < timelineEvents.length - 1 && (
                <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-purple-500 to-pink-500"></div>
              )}
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 transform -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
              {/* Content */}
              <div className="bg-purple-900/20 p-5 rounded-lg border border-purple-500/30 backdrop-blur-sm">
                <div className="text-purple-300 mb-1">{event.date}</div>
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                <p>{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
