import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
    <Card className="p-4 hover:shadow-md transition-shadow border-border">
      <div className="flex items-start gap-4">
        <Avatar className="w-10 h-10 border-2 border-primary/20">
          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-sm font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-foreground">{meeting.withName}</h4>
            <Badge 
              variant={meeting.status === "upcoming" ? "default" : "secondary"}
              className={meeting.status === "upcoming" ? "bg-primary" : ""}
            >
              {meeting.status}
            </Badge>
          </div>
          
          <div className="space-y-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{meeting.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{meeting.time}</span>
            </div>
            {meeting.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{meeting.location}</span>
              </div>
            )}
          </div>
          
          {meeting.notes && (
            <p className="mt-3 text-sm text-muted-foreground italic">
              "{meeting.notes}"
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};
