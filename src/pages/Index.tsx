
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4ID_Be8z_6FpzhS2nZf2PA2R7Yj2qW20",
  authDomain: "abc-club-85f6f.firebaseapp.com",
  projectId: "abc-club-85f6f",
  storageBucket: "abc-club-85f6f.appspot.com",
  messagingSenderId: "809947302634",
  appId: "1:809947302634:web:4665b5e126971a17202593",
  measurementId: "G-SP7P816TV5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const Index = () => {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isProblemStatementOpen, setIsProblemStatementOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    studentId: "",
    email: "",
    phone: "",
    year: "",
    branch: "",
    degree: "",
    collegeIdFile: null as File | null,
    selectedProblem: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Refs for section scrolling
  const aboutRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const competitionRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  // Problem statements
  const problemStatements = [
    {
      id: "web-dev",
      domain: "Web Development",
      title: "Smart Campus Solution",
      description: "Create a comprehensive web platform that enhances campus life through digital solutions.",
      requirements: "The platform should include features for course registration, campus navigation, event management, and community engagement."
    },
    {
      id: "ai-ml",
      domain: "AI/ML",
      title: "Predictive Analysis for Student Success",
      description: "Develop an AI model that can predict student performance and suggest interventions.",
      requirements: "The solution should analyze academic patterns, engagement metrics, and provide actionable insights for educators."
    },
    {
      id: "blockchain",
      domain: "Blockchain",
      title: "Decentralized Academic Credential System",
      description: "Build a blockchain-based system for secure verification of academic credentials.",
      requirements: "The system should allow educational institutions to issue tamper-proof credentials and enable employers to verify them easily."
    }
  ];

  // Team members
  const teamMembers = [
    {
      name: "Alex Johnson",
      position: "Event Coordinator",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      linkedin: "https://linkedin.com/in/alexjohnson",
      email: "alex@techcarnival.com"
    },
    {
      name: "Sarah Chen",
      position: "Technical Lead",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      linkedin: "https://linkedin.com/in/sarahchen",
      email: "sarah@techcarnival.com"
    },
    {
      name: "Michael Rodriguez",
      position: "Marketing Director",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      linkedin: "https://linkedin.com/in/michaelrodriguez",
      email: "michael@techcarnival.com"
    },
    {
      name: "Priya Patel",
      position: "Sponsorship Manager",
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
      linkedin: "https://linkedin.com/in/priyapatel",
      email: "priya@techcarnival.com"
    }
  ];

  // Timeline events
  const timelineEvents = [
    {
      date: "January 15, 2024",
      title: "Registrations Open",
      description: "Official opening of participant registrations for all events."
    },
    {
      date: "February 10, 2024",
      title: "Workshop Series Begins",
      description: "Pre-event workshops on emerging technologies and skill development."
    },
    {
      date: "March 1-3, 2024",
      title: "Main Event",
      description: "Three days of hackathons, tech talks, and networking opportunities."
    },
    {
      date: "March 5, 2024",
      title: "Awards Ceremony",
      description: "Recognition and prizes for outstanding projects and contributions."
    }
  ];

  // Scroll to section function
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handle form input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle file upload change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, collegeIdFile: e.target.files![0] }));
    }
  };

  // Handle registration form submission
  const handleRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let fileUrl = "";
      
      // Upload file if present
      if (formData.collegeIdFile) {
        const fileRef = ref(storage, `college-ids/${formData.name}-${Date.now()}`);
        await uploadBytes(fileRef, formData.collegeIdFile);
        fileUrl = await getDownloadURL(fileRef);
      }
      
      // Add registration to database
      await addDoc(collection(db, "hackathon-registrations"), {
        name: formData.name,
        college: formData.college,
        studentId: formData.studentId,
        email: formData.email,
        phone: formData.phone,
        year: formData.year,
        branch: formData.branch,
        degree: formData.degree,
        collegeIdUrl: fileUrl,
        timestamp: new Date()
      });
      
      toast({
        title: "Registration successful!",
        description: "Please proceed to select a problem statement.",
      });
      
      setIsRegistrationOpen(false);
      setIsProblemStatementOpen(true);
    } catch (error) {
      console.error("Error during registration:", error);
      toast({
        title: "Registration failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle problem statement selection
  const handleProblemSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "problem-selections"), {
        participantName: formData.name,
        participantEmail: formData.email,
        selectedProblem: formData.selectedProblem,
        timestamp: new Date()
      });
      
      toast({
        title: "Problem statement selected!",
        description: "Your hackathon registration is complete.",
      });
      
      setIsProblemStatementOpen(false);
      setFormData({
        name: "", college: "", studentId: "", email: "", phone: "", 
        year: "", branch: "", degree: "", collegeIdFile: null, selectedProblem: ""
      });
    } catch (error) {
      console.error("Error during problem selection:", error);
      toast({
        title: "Selection failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-white" ref={topRef}>
      {/* Navigation */}
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

      {/* Hero Section */}
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

      {/* About Section */}
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

      {/* Team Section */}
      <div ref={teamRef} className="py-16 px-4 bg-black/30">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-purple-900/20 rounded-lg overflow-hidden border border-purple-500/30 backdrop-blur-sm transition-transform hover:scale-105">
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-purple-300 mb-3">{member.position}</p>
                  <div className="flex space-x-3">
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    <a 
                      href={`mailto:${member.email}`}
                      className="text-purple-400 hover:text-purple-300"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
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

      {/* Competition Section */}
      <div ref={competitionRef} className="py-16 px-4 bg-black/30">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Competitions</h2>
          
          {/* Hackathon */}
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
                    onClick={() => setIsRegistrationOpen(true)} 
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
          
          {/* Tech Events */}
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
        </div>
      </div>

      {/* Contact Section */}
      <div ref={contactRef} className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Contact Us</h2>
          <div className="max-w-4xl mx-auto bg-purple-900/20 p-6 rounded-lg border border-purple-500/30 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-purple-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-purple-300">+91 9876543210</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-purple-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-purple-300">info@techcarnival.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-purple-400 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-purple-300">
                        Tech Carnival Venue,<br />
                        Innovation Center, Tech Park,<br />
                        Bangalore - 560001
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Send us a Message</h3>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-white">Name</Label>
                    <Input id="name" type="text" className="bg-purple-900/40 border-purple-500/30 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input id="email" type="email" className="bg-purple-900/40 border-purple-500/30 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-white">Message</Label>
                    <textarea 
                      id="message" 
                      rows={4}
                      className="w-full rounded-md border border-purple-500/30 bg-purple-900/40 p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    ></textarea>
                  </div>
                  <button 
                    type="submit"
                    className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md text-white font-medium hover:opacity-90 transition-opacity"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-8 px-4 border-t border-purple-900/50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent mb-2">
                Tech Carnival
              </div>
              <p className="text-purple-300 max-w-md">
                Bringing together the brightest minds to innovate, create, and celebrate technology.
              </p>
            </div>
            <div className="text-center md:text-right">
              <h3 className="text-lg font-semibold mb-3">Follow us for updates</h3>
              <div className="flex space-x-4 justify-center md:justify-end">
                <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-purple-900/30 text-center text-sm text-purple-300">
            <p>© 2024 Tech Carnival. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Registration Dialog */}
      <Dialog open={isRegistrationOpen} onOpenChange={setIsRegistrationOpen}>
        <DialogContent className="bg-purple-950 border border-purple-500/50 text-white max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Hackathon Registration</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRegistrationSubmit} className="space-y-4">
            <div>
              <Label htmlFor="reg-name" className="text-white">Full Name</Label>
              <Input 
                id="reg-name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                required 
                className="bg-purple-900/40 border-purple-500/30 text-white"
              />
            </div>
            <div>
              <Label htmlFor="reg-college" className="text-white">College Name</Label>
              <Input 
                id="reg-college" 
                name="college" 
                value={formData.college} 
                onChange={handleInputChange} 
                required 
                className="bg-purple-900/40 border-purple-500/30 text-white"
              />
            </div>
            <div>
              <Label htmlFor="reg-studentId" className="text-white">Student ID</Label>
              <Input 
                id="reg-studentId" 
                name="studentId" 
                value={formData.studentId} 
                onChange={handleInputChange} 
                required 
                className="bg-purple-900/40 border-purple-500/30 text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reg-email" className="text-white">Email ID</Label>
                <Input 
                  id="reg-email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                  className="bg-purple-900/40 border-purple-500/30 text-white"
                />
              </div>
              <div>
                <Label htmlFor="reg-phone" className="text-white">Phone Number</Label>
                <Input 
                  id="reg-phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleInputChange} 
                  required 
                  className="bg-purple-900/40 border-purple-500/30 text-white"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="reg-year" className="text-white">Year</Label>
                <select 
                  id="reg-year" 
                  name="year" 
                  value={formData.year} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full rounded-md border border-purple-500/30 bg-purple-900/40 p-2 text-white"
                >
                  <option value="">Select</option>
                  <option value="1">1st Year</option>
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
              </div>
              <div>
                <Label htmlFor="reg-branch" className="text-white">Branch</Label>
                <Input 
                  id="reg-branch" 
                  name="branch" 
                  value={formData.branch} 
                  onChange={handleInputChange} 
                  required 
                  className="bg-purple-900/40 border-purple-500/30 text-white"
                />
              </div>
              <div>
                <Label htmlFor="reg-degree" className="text-white">Degree</Label>
                <Input 
                  id="reg-degree" 
                  name="degree" 
                  value={formData.degree} 
                  onChange={handleInputChange} 
                  required 
                  className="bg-purple-900/40 border-purple-500/30 text-white"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="reg-idCard" className="text-white">College ID Card (Upload)</Label>
              <Input 
                id="reg-idCard" 
                name="collegeIdFile" 
                type="file" 
                accept="image/*,.pdf" 
                onChange={handleFileChange} 
                required 
                className="bg-purple-900/40 border-purple-500/30 text-white"
              />
            </div>
            <button 
              type="submit" 
              className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md text-white font-medium hover:opacity-90 transition-opacity"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Registration"}
            </button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Problem Statement Dialog */}
      <Dialog open={isProblemStatementOpen} onOpenChange={setIsProblemStatementOpen}>
        <DialogContent className="bg-purple-950 border border-purple-500/50 text-white max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Select Problem Statement</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleProblemSubmit} className="space-y-4">
            <div className="space-y-4">
              {problemStatements.map((problem) => (
                <div 
                  key={problem.id}
                  className={`p-4 rounded-lg border transition-all ${
                    formData.selectedProblem === problem.id 
                      ? "bg-purple-800/50 border-purple-400" 
                      : "bg-purple-900/20 border-purple-600/30 hover:bg-purple-900/40"
                  }`}
                >
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id={problem.id}
                      name="selectedProblem"
                      value={problem.id}
                      checked={formData.selectedProblem === problem.id}
                      onChange={handleInputChange}
                      className="mt-1 mr-3"
                      required
                    />
                    <div>
                      <label htmlFor={problem.id} className="font-semibold text-lg block mb-1 cursor-pointer">
                        {problem.domain}: {problem.title}
                      </label>
                      <p className="text-purple-200 mb-2">{problem.description}</p>
                      <div className="bg-purple-900/40 p-3 rounded-md border border-purple-500/30 text-sm">
                        <strong className="text-purple-300">Requirements:</strong> {problem.requirements}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              type="submit" 
              className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-md text-white font-medium hover:opacity-90 transition-opacity"
              disabled={isSubmitting || !formData.selectedProblem}
            >
              {isSubmitting ? "Submitting..." : "Confirm Selection"}
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
