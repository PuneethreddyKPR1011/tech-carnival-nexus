
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type RegistrationDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  formData: {
    name: string;
    college: string;
    studentId: string;
    email: string;
    phone: string;
    year: string;
    branch: string;
    degree: string;
    collegeIdFile: File | null;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
};

const RegistrationDialog = ({
  isOpen,
  onOpenChange,
  formData,
  handleInputChange,
  handleFileChange,
  handleSubmit,
  isSubmitting
}: RegistrationDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-purple-950 border border-purple-500/50 text-white max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Hackathon Registration</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
  );
};

export default RegistrationDialog;
