import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2 } from "lucide-react";
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
    <Card className="p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border">
      <div className="flex items-start gap-4">
        <Avatar className="w-12 h-12 border-2 border-primary/20">
          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{member.name}</h3>
          <p className="text-sm text-muted-foreground">{member.role}</p>
          
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>{member.meetingsCount} meetings</span>
            </div>
            {member.lastMet && (
              <span>Last met: {member.lastMet}</span>
            )}
          </div>
        </div>
        
        <Button 
          size="sm" 
          onClick={onSchedule}
          className="bg-primary hover:bg-primary/90"
        >
          <Calendar className="w-4 h-4 mr-1" />
          Schedule
        </Button>
      </div>
    </Card>
  );
};
