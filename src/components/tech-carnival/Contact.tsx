
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ContactProps = {
  contactRef: React.RefObject<HTMLDivElement>;
};

const Contact = ({ contactRef }: ContactProps) => {
  return (
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
  );
};

export default Contact;
