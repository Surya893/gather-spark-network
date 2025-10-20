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
    <Card className="group relative p-7 hover:shadow-lg hover:border-primary/50 transition-all duration-200 border-2 bg-card">
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-muted">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-14 h-14 border-2 border-border">
            <AvatarFallback className="bg-primary/10 text-primary text-base font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-foreground truncate mb-1.5">{member.name}</h3>
            <p className="text-base text-muted-foreground">{member.role}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-5 border-t-2 border-border/50">
          <div className="flex flex-col gap-1">
            <div className="text-sm font-medium text-muted-foreground">
              {member.meetingsCount} meetings
            </div>
            {member.lastMet && (
              <div className="text-xs text-muted-foreground/70">Last: {member.lastMet}</div>
            )}
          </div>
          
          <Button 
            size="default" 
            onClick={onSchedule}
            className="h-10 px-5 text-sm font-semibold shadow-md hover:shadow-lg transition-shadow"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule
          </Button>
        </div>
      </div>
    </Card>
  );
};
