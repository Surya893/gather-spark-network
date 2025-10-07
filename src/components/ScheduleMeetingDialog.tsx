import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { toast } from "sonner";

interface ScheduleMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberName: string;
  onSchedule: (meetingData: any) => void;
}

export const ScheduleMeetingDialog = ({ 
  open, 
  onOpenChange, 
  memberName,
  onSchedule 
}: ScheduleMeetingDialogProps) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time) {
      toast.error("Please fill in date and time");
      return;
    }

    onSchedule({
      date,
      time,
      location,
      notes,
      withName: memberName,
    });

    toast.success(`Meeting scheduled with ${memberName}`);
    onOpenChange(false);
    
    // Reset form
    setDate("");
    setTime("");
    setLocation("");
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 gap-0 border-border/50">
        <DialogHeader className="p-6 pb-4 space-y-2">
          <div className="flex items-start justify-between">
            <div className="space-y-1.5">
              <DialogTitle className="text-[17px] font-semibold text-foreground">
                Schedule meeting
              </DialogTitle>
              <DialogDescription className="text-[13px] text-muted-foreground">
                Set up a meeting with {memberName}
              </DialogDescription>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 -mr-2 -mt-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="px-6 pb-6">
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-[13px] font-medium text-foreground">
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="h-9 text-[13px] border-border/50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time" className="text-[13px] font-medium text-foreground">
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="h-9 text-[13px] border-border/50"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location" className="text-[13px] font-medium text-foreground">
                Location
              </Label>
              <Input
                id="location"
                placeholder="Zoom, Coffee shop, Room 101..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="h-9 text-[13px] border-border/50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-[13px] font-medium text-foreground">
                Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Add context or agenda for the meeting..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="text-[13px] resize-none border-border/50"
              />
            </div>
          </div>
          
          <div className="flex gap-3 pt-6 mt-6 border-t border-border/40">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-9 text-[13px] font-medium"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="flex-1 h-9 text-[13px] font-medium bg-foreground hover:bg-foreground/90 text-background"
            >
              Schedule meeting
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
