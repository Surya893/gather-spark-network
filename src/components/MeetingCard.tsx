import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface MeetingCardProps {
  meeting: {
    id: string;
    withName: string;
    date: string;
    time: string;
    location?: string;
    status: "upcoming" | "completed";
    notes?: string;
  };
}

export const MeetingCard = ({ meeting }: MeetingCardProps) => {
  const initials = meeting.withName
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
      
      <div className="flex items-start gap-4">
        <Avatar className="w-10 h-10 ring-1 ring-border/50 mt-0.5">
          <AvatarFallback className="bg-muted text-foreground text-xs font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <h4 className="text-[15px] font-semibold text-foreground">{meeting.withName}</h4>
            <Badge 
              variant={meeting.status === "upcoming" ? "default" : "secondary"}
              className={`text-[11px] font-medium px-2.5 py-0.5 ${
                meeting.status === "upcoming" 
                  ? "bg-accent/10 text-accent border-accent/20" 
                  : "bg-muted text-muted-foreground border-border/50"
              }`}
            >
              {meeting.status}
            </Badge>
          </div>
          
          <div className="space-y-2 mb-3">
            <div className="flex items-center gap-2.5 text-[13px] text-muted-foreground">
              <Calendar className="w-3.5 h-3.5" />
              <span>{meeting.date}</span>
              <span className="text-border">•</span>
              <Clock className="w-3.5 h-3.5" />
              <span>{meeting.time}</span>
            </div>
            {meeting.location && (
              <div className="flex items-center gap-2.5 text-[13px] text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                <span>{meeting.location}</span>
              </div>
            )}
          </div>
          
          {meeting.notes && (
            <div className="pt-3 border-t border-border/40">
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                {meeting.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
