import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface MemberCardProps {
  member: {
    id: string;
    name: string;
    role: string;
    meetingsCount: number;
    lastMet?: string;
  };
  onSchedule: () => void;
}

export const MemberCard = ({ member, onSchedule }: MemberCardProps) => {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="group relative p-6 hover:shadow-sm transition-shadow border-border bg-card">
      <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex flex-col gap-5">
        <div className="flex items-start gap-4">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-muted text-foreground text-sm font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-foreground truncate mb-1">{member.name}</h3>
            <p className="text-sm text-muted-foreground">{member.role}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{member.meetingsCount} meetings</span>
            {member.lastMet && (
              <span className="text-muted-foreground/70">• {member.lastMet}</span>
            )}
          </div>
          
          <Button 
            size="sm" 
            onClick={onSchedule}
            className="h-9 px-4 text-sm font-medium"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
        </div>
      </div>
    </Card>
  );
};
