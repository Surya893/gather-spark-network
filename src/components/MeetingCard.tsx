import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { haptics } from "@/lib/haptics";

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
    <Card 
      className="group relative p-7 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 border-2 bg-card"
      onMouseEnter={() => haptics.light()}
    >
      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" className="h-9 w-9 hover:bg-muted">
          <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="flex items-start gap-5">
        <Avatar className="w-14 h-14 mt-1 border-2 border-border">
          <AvatarFallback className="bg-primary/10 text-primary text-base font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h4 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">{meeting.withName}</h4>
              <Badge 
                variant={meeting.status === "upcoming" ? "default" : "secondary"}
                className={`text-xs font-semibold px-3 py-1 ${
                  meeting.status === "upcoming" 
                    ? "bg-primary text-primary-foreground shadow-sm" 
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {meeting.status === "upcoming" ? "Upcoming" : "Completed"}
              </Badge>
            </div>
          </div>
          
          <div className="space-y-3 mb-5">
            <div className="flex items-center gap-4 text-base text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="font-medium">{meeting.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="font-medium">{meeting.time}</span>
              </div>
            </div>
            {meeting.location && (
              <div className="flex items-center gap-2 text-base text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="font-medium">{meeting.location}</span>
              </div>
            )}
          </div>
          
          {meeting.notes && (
            <div className="pt-5 border-t-2 border-border/50">
              <p className="text-base text-foreground leading-relaxed">
                {meeting.notes}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
