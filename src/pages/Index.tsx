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
      <section className="relative bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-6 pt-20 pb-16 lg:pt-28 lg:pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <span className="text-sm font-medium text-primary">Now available</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Scheduling infrastructure
              <br />
              for meaningful connections
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Build stronger relationships through structured one-on-ones. Track meetings, manage your network, and never miss an opportunity to connect.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-12 px-8 text-base font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow">
                Get started free
                <ArrowUpRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold border-2">
                Book a demo
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-8 flex items-center justify-center gap-6">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                No credit card required
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Free forever
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="border-y border-border bg-card">
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">{totalMembers}</div>
              <div className="text-sm font-medium text-muted-foreground">Active members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">{totalMeetings}</div>
              <div className="text-sm font-medium text-muted-foreground">Total meetings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">{networkCoverage}%</div>
              <div className="text-sm font-medium text-muted-foreground">Network coverage</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">{upcomingMeetings}</div>
              <div className="text-sm font-medium text-muted-foreground">This week</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 py-20">
        <Tabs defaultValue="directory" className="space-y-10">
          <div className="border-b border-border">
            <TabsList className="h-auto p-0 bg-transparent border-0">
              <TabsTrigger 
                value="directory" 
                className="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-6 py-4 text-base font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                Member Directory
              </TabsTrigger>
              <TabsTrigger 
                value="meetings" 
                className="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary px-6 py-4 text-base font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                My Meetings
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="directory" className="space-y-8 mt-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Connect with your cohort</h2>
                <p className="text-base text-muted-foreground">
                  {totalMembers} members ready to connect
                </p>
              </div>
              
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial sm:w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search by name or role..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-base border-2 focus:border-primary focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onSchedule={() => handleScheduleMeeting(member.name)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="meetings" className="space-y-8 mt-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">Your meetings</h2>
                <p className="text-base text-muted-foreground">
                  {meetings.length} total meetings • {upcomingMeetings} upcoming
                </p>
              </div>
              
              <Button className="h-12 px-6 text-base font-semibold shadow-md hover:shadow-lg transition-shadow">
                + Log meeting
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
