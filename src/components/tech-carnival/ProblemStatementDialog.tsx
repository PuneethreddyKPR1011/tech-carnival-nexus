
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type ProblemStatement = {
  id: string;
  domain: string;
  title: string;
  description: string;
  requirements: string;
};

type ProblemStatementDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  problemStatements: ProblemStatement[];
  selectedProblem: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
};

const ProblemStatementDialog = ({
  isOpen,
  onOpenChange,
  problemStatements,
  selectedProblem,
  handleInputChange,
  handleSubmit,
  isSubmitting
}: ProblemStatementDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-purple-950 border border-purple-500/50 text-white max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Select Problem Statement</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            {problemStatements.map((problem) => (
              <div 
                key={problem.id}
                className={`p-4 rounded-lg border transition-all ${
                  selectedProblem === problem.id 
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
                    checked={selectedProblem === problem.id}
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
            disabled={isSubmitting || !selectedProblem}
          >
            {isSubmitting ? "Submitting..." : "Confirm Selection"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProblemStatementDialog;
