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
    <Card className="group relative p-6 hover:shadow-sm transition-shadow border-border bg-card">
      <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="flex items-start gap-4">
        <Avatar className="w-11 h-11 mt-0.5">
          <AvatarFallback className="bg-muted text-foreground text-sm font-medium">
            {initials}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-4">
            <h4 className="text-base font-semibold text-foreground">{meeting.withName}</h4>
            <Badge 
              variant={meeting.status === "upcoming" ? "default" : "secondary"}
              className={`text-xs font-medium ${
                meeting.status === "upcoming" 
                  ? "bg-foreground text-background" 
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {meeting.status}
            </Badge>
          </div>
          
          <div className="space-y-2.5 mb-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{meeting.date}</span>
              <span className="text-border">•</span>
              <Clock className="w-4 h-4" />
              <span>{meeting.time}</span>
            </div>
            {meeting.location && (
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{meeting.location}</span>
              </div>
            )}
          </div>
          
          {meeting.notes && (
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {meeting.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
