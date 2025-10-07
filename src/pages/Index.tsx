import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { MemberCard } from "@/components/MemberCard";
import { MeetingCard } from "@/components/MeetingCard";
import { StatsCard } from "@/components/StatsCard";
import { ScheduleMeetingDialog } from "@/components/ScheduleMeetingDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, TrendingUp, Network, Search, Plus } from "lucide-react";

// Mock data - in production this would come from your backend
const mockMembers = [
  { id: "1", name: "Sarah Johnson", role: "Product Designer", meetingsCount: 3, lastMet: "2 days ago" },
  { id: "2", name: "Michael Chen", role: "Software Engineer", meetingsCount: 5, lastMet: "1 week ago" },
  { id: "3", name: "Emma Williams", role: "Marketing Manager", meetingsCount: 2, lastMet: "3 days ago" },
  { id: "4", name: "James Brown", role: "Data Analyst", meetingsCount: 4, lastMet: "5 days ago" },
  { id: "5", name: "Olivia Davis", role: "UX Researcher", meetingsCount: 1 },
  { id: "6", name: "Daniel Martinez", role: "Product Manager", meetingsCount: 6, lastMet: "1 day ago" },
];

const mockMeetings = [
  {
    id: "1",
    withName: "Sarah Johnson",
    date: "2025-01-15",
    time: "14:00",
    location: "Zoom",
    status: "upcoming" as const,
    notes: "Discuss design system updates",
  },
  {
    id: "2",
    withName: "Michael Chen",
    date: "2025-01-10",
    time: "10:30",
    location: "Coffee Lab",
    status: "completed" as const,
    notes: "Great conversation about technical architecture",
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [meetings, setMeetings] = useState(mockMeetings);

  const handleScheduleMeeting = (memberName: string) => {
    setSelectedMember(memberName);
    setScheduleDialogOpen(true);
  };

  const handleMeetingScheduled = (meetingData: any) => {
    const newMeeting = {
      id: String(meetings.length + 1),
      ...meetingData,
      status: "upcoming" as const,
    };
    setMeetings([newMeeting, ...meetings]);
  };

  const filteredMembers = mockMembers.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalMembers = mockMembers.length;
  const totalMeetings = meetings.length;
  const upcomingMeetings = meetings.filter((m) => m.status === "upcoming").length;
  const completedMeetings = meetings.filter((m) => m.status === "completed").length;
  const networkCoverage = Math.round((completedMeetings / (totalMembers - 1)) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight">
            Track Your Cohort Connections
          </h1>
          <p className="text-xl text-muted-foreground">
            Schedule, log, and track meetings with your classmates. Build meaningful connections across your entire cohort.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-base">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Meeting
            </Button>
            <Button size="lg" variant="outline" className="text-base">
              View Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Members"
            value={totalMembers}
            description="Active cohort members"
            icon={Users}
          />
          <StatsCard
            title="Total Meetings"
            value={totalMeetings}
            description="Scheduled & completed"
            icon={Calendar}
            trend={{ value: "+12%", positive: true }}
          />
          <StatsCard
            title="Network Coverage"
            value={`${networkCoverage}%`}
            description="Of possible connections"
            icon={Network}
          />
          <StatsCard
            title="Upcoming"
            value={upcomingMeetings}
            description="Meetings this week"
            icon={TrendingUp}
          />
        </div>
      </section>

      {/* Main Dashboard */}
      <section id="dashboard" className="container mx-auto px-4 py-12">
        <Tabs defaultValue="members" className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
          </TabsList>

          <TabsContent value="members" className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMembers.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onSchedule={() => handleScheduleMeeting(member.name)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="meetings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Your Meetings</h2>
              <Button className="bg-gradient-to-r from-primary to-accent hover:opacity-90">
                <Plus className="w-4 h-4 mr-2" />
                Log Meeting
              </Button>
            </div>

            <div className="space-y-4">
              {meetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <ScheduleMeetingDialog
        open={scheduleDialogOpen}
        onOpenChange={setScheduleDialogOpen}
        memberName={selectedMember}
        onSchedule={handleMeetingScheduled}
      />
    </div>
  );
};

export default Index;
