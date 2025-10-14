import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Navbar } from "@/components/Navbar";
import { MemberCard } from "@/components/MemberCard";
import { MeetingCard } from "@/components/MeetingCard";
import { StatsCard } from "@/components/StatsCard";
import { ScheduleMeetingDialog } from "@/components/ScheduleMeetingDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Calendar, TrendingUp, Network, Search, ArrowUpRight } from "lucide-react";

// Mock data
const mockMembers = [
  { id: "1", name: "Sarah Johnson", role: "Product Designer", meetingsCount: 3, lastMet: "2 days ago" },
  { id: "2", name: "Michael Chen", role: "Software Engineer", meetingsCount: 5, lastMet: "1 week ago" },
  { id: "3", name: "Emma Williams", role: "Marketing Manager", meetingsCount: 2, lastMet: "3 days ago" },
  { id: "4", name: "James Brown", role: "Data Analyst", meetingsCount: 4, lastMet: "5 days ago" },
  { id: "5", name: "Olivia Davis", role: "UX Researcher", meetingsCount: 1 },
  { id: "6", name: "Daniel Martinez", role: "Product Manager", meetingsCount: 6, lastMet: "1 day ago" },
  { id: "7", name: "Sophie Anderson", role: "Frontend Developer", meetingsCount: 2, lastMet: "4 days ago" },
  { id: "8", name: "Marcus Lee", role: "Business Analyst", meetingsCount: 3, lastMet: "6 days ago" },
];

const mockMeetings = [
  {
    id: "1",
    withName: "Sarah Johnson",
    date: "2025-01-15",
    time: "14:00",
    location: "Zoom",
    status: "upcoming" as const,
    notes: "Discuss design system updates and component library structure",
  },
  {
    id: "2",
    withName: "Michael Chen",
    date: "2025-01-10",
    time: "10:30",
    location: "Coffee Lab",
    status: "completed" as const,
    notes: "Great conversation about technical architecture and scalability considerations",
  },
  {
    id: "3",
    withName: "Emma Williams",
    date: "2025-01-16",
    time: "15:30",
    location: "Office - Room 301",
    status: "upcoming" as const,
    notes: "Review marketing strategy for Q2 product launch",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string>("");
  const [meetings, setMeetings] = useState(mockMeetings);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (session) {
        navigate("/dashboard");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--gradient-mesh)] opacity-40" />
        
        <div className="relative container mx-auto px-6 pt-20 pb-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border/50 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[12px] font-medium text-foreground">Now in beta</span>
            </div>
            
            <h1 className="text-[56px] leading-[1.1] font-semibold text-foreground tracking-tight mb-5">
              Network intelligence<br />for your cohort
            </h1>
            
            <p className="text-[17px] text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              Track meetings, analyze connections, and build meaningful relationships across your entire cohort. 
              A sophisticated platform designed for professional networking.
            </p>
            
            <div className="flex items-center gap-3">
              <Button size="lg" className="h-11 px-6 text-[14px] font-medium bg-foreground hover:bg-foreground/90 text-background">
                Get started
                <ArrowUpRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button size="lg" variant="outline" className="h-11 px-6 text-[14px] font-medium">
                View demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Active members"
            value={totalMembers}
            description="In your cohort"
            icon={Users}
          />
          <StatsCard
            title="Total meetings"
            value={totalMeetings}
            description="Scheduled & completed"
            icon={Calendar}
            trend={{ value: "+12%", positive: true }}
          />
          <StatsCard
            title="Network coverage"
            value={`${networkCoverage}%`}
            description="Of possible connections"
            icon={Network}
          />
          <StatsCard
            title="This week"
            value={upcomingMeetings}
            description="Upcoming meetings"
            icon={TrendingUp}
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 pb-24">
        <Tabs defaultValue="directory" className="space-y-8">
          <div className="flex items-center justify-between">
            <TabsList className="h-10 p-1 bg-muted/50 border border-border/50">
              <TabsTrigger value="directory" className="text-[13px] font-medium px-4 data-[state=active]:bg-background">
                Directory
              </TabsTrigger>
              <TabsTrigger value="meetings" className="text-[13px] font-medium px-4 data-[state=active]:bg-background">
                Meetings
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="directory" className="space-y-6 mt-8">
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 text-[13px] bg-background border-border/50"
                />
              </div>
              
              <Button variant="outline" className="h-10 px-4 text-[13px] font-medium">
                Filters
              </Button>
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

          <TabsContent value="meetings" className="space-y-6 mt-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[24px] font-semibold text-foreground mb-1">Your meetings</h2>
                <p className="text-[13px] text-muted-foreground">
                  {meetings.length} total · {upcomingMeetings} upcoming
                </p>
              </div>
              
              <Button className="h-10 px-4 text-[13px] font-medium bg-foreground hover:bg-foreground/90 text-background">
                Log meeting
              </Button>
            </div>

            <div className="space-y-3">
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
