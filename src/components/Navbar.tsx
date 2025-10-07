import { Calendar, Users, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            MeetTrack
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <a href="#dashboard" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Dashboard
          </a>
          <a href="#members" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Members
          </a>
          <a href="#meetings" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Meetings
          </a>
          <a href="#stats" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            Statistics
          </a>
        </div>
        
        <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
          Get Started
        </Button>
      </div>
    </nav>
  );
};
