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
    <Card className="group relative p-5 hover:shadow-[0_4px_6px_-1px_rgb(0_0_0_/0.05),0_2px_4px_-2px_rgb(0_0_0_/0.03)] transition-all duration-300 border-border/50 bg-card">
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <Avatar className="w-11 h-11 ring-1 ring-border/50">
            <AvatarFallback className="bg-muted text-foreground text-sm font-medium">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-[15px] font-semibold text-foreground truncate mb-0.5">{member.name}</h3>
            <p className="text-[13px] text-muted-foreground">{member.role}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-border/40">
          <div className="flex items-center gap-4 text-[12px] text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-accent/60" />
              <span>{member.meetingsCount} meetings</span>
            </div>
            {member.lastMet && (
              <span className="text-muted-foreground/70">{member.lastMet}</span>
            )}
          </div>
          
          <Button 
            size="sm" 
            onClick={onSchedule}
            className="h-7 px-3 text-[12px] font-medium bg-foreground hover:bg-foreground/90 text-background"
          >
            <Calendar className="w-3 h-3 mr-1.5" />
            Schedule
          </Button>
        </div>
      </div>
    </Card>
  );
};
