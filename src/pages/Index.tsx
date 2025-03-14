
import { useState, useRef, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Import components
import Navbar from "@/components/tech-carnival/Navbar";
import Hero from "@/components/tech-carnival/Hero";
import About from "@/components/tech-carnival/About";
import Team from "@/components/tech-carnival/Team";
import Timeline from "@/components/tech-carnival/Timeline";
import Competition from "@/components/tech-carnival/Competition";
import Contact from "@/components/tech-carnival/Contact";
import Footer from "@/components/tech-carnival/Footer";
import RegistrationDialog from "@/components/tech-carnival/RegistrationDialog";
import ProblemStatementDialog from "@/components/tech-carnival/ProblemStatementDialog";

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

// Check Firebase connection
console.log("Firebase initialized with project:", firebaseConfig.projectId);

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
    console.log("Starting registration submission:", formData.name);

    try {
      let fileUrl = "";
      
      // Upload file if present
      if (formData.collegeIdFile) {
        console.log("Uploading file for:", formData.name);
        const fileRef = ref(storage, `college-ids/${formData.name}-${Date.now()}`);
        const uploadResult = await uploadBytes(fileRef, formData.collegeIdFile);
        console.log("File uploaded successfully:", uploadResult.metadata.name);
        
        fileUrl = await getDownloadURL(fileRef);
        console.log("File URL generated:", fileUrl.substring(0, 20) + "...");
      }
      
      // Prepare registration data
      const registrationData = {
        name: formData.name,
        college: formData.college,
        studentId: formData.studentId,
        email: formData.email,
        phone: formData.phone,
        year: formData.year,
        branch: formData.branch,
        degree: formData.degree,
        collegeIdUrl: fileUrl,
        timestamp: serverTimestamp()
      };
      
      console.log("Saving registration data to Firestore...");
      
      // Add registration to database
      const docRef = await addDoc(collection(db, "hackathon-registrations"), registrationData);
      
      console.log("Registration document saved with ID:", docRef.id);
      
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
        description: "Please check your connection and try again.",
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
    console.log("Submitting problem selection:", formData.selectedProblem);

    try {
      const problemData = {
        participantName: formData.name,
        participantEmail: formData.email,
        selectedProblem: formData.selectedProblem,
        timestamp: serverTimestamp()
      };
      
      console.log("Saving problem selection to Firestore...");
      
      const docRef = await addDoc(collection(db, "problem-selections"), problemData);
      
      console.log("Problem selection document saved with ID:", docRef.id);
      
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
        description: "Please check your connection and try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check Firebase connectivity on component mount
  useEffect(() => {
    const checkFirebase = async () => {
      try {
        const testCollection = collection(db, "test-connectivity");
        console.log("Firebase connectivity test: collection accessed");
      } catch (error) {
        console.error("Firebase connectivity test failed:", error);
      }
    };
    
    checkFirebase();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 text-white" ref={topRef}>
      {/* Navigation */}
      <Navbar 
        scrollToSection={scrollToSection}
        topRef={topRef}
        aboutRef={aboutRef}
        teamRef={teamRef}
        timelineRef={timelineRef}
        competitionRef={competitionRef}
        contactRef={contactRef}
      />

      {/* Hero Section */}
      <Hero 
        scrollToSection={scrollToSection}
        competitionRef={competitionRef}
        timelineRef={timelineRef}
      />

      {/* About Section */}
      <About aboutRef={aboutRef} />

      {/* Team Section */}
      <Team teamRef={teamRef} teamMembers={teamMembers} />

      {/* Timeline Section */}
      <Timeline timelineRef={timelineRef} timelineEvents={timelineEvents} />

      {/* Competition Section */}
      <Competition 
        competitionRef={competitionRef} 
        openRegistration={() => setIsRegistrationOpen(true)}
        isSubmitting={isSubmitting}
      />

      {/* Contact Section */}
      <Contact contactRef={contactRef} />

      {/* Footer */}
      <Footer />

      {/* Registration Dialog */}
      <RegistrationDialog 
        isOpen={isRegistrationOpen}
        onOpenChange={setIsRegistrationOpen}
        formData={formData}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleRegistrationSubmit}
        isSubmitting={isSubmitting}
      />

      {/* Problem Statement Dialog */}
      <ProblemStatementDialog
        isOpen={isProblemStatementOpen}
        onOpenChange={setIsProblemStatementOpen}
        problemStatements={problemStatements}
        selectedProblem={formData.selectedProblem}
        handleInputChange={handleInputChange}
        handleSubmit={handleProblemSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default Index;
