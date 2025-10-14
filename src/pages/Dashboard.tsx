import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { Navbar } from "@/components/Navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from "@/components/StatsCard";
import { MemberCard } from "@/components/MemberCard";
import { MeetingCard } from "@/components/MeetingCard";
import { Input } from "@/components/ui/input";
import { Search, Users, Calendar, Network, Star, TrendingUp } from "lucide-react";

// TODO: Replace with real data from Lovable Cloud
const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-mesh p-12 shadow-elegant">
            <div className="relative z-10">
              <h1 className="text-5xl font-display font-bold mb-4 text-foreground">
                Welcome back, {user?.user_metadata?.full_name || 'there'}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Track your cohort connections, schedule meetings, and build meaningful relationships
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatsCard
            title="Total Members"
            value="100"
            description="In your cohort"
            icon={Users}
            trend={{ value: "+12 this month", positive: true }}
          />
          <StatsCard
            title="Total Meetings"
            value="247"
            description="Scheduled & completed"
            icon={Calendar}
            trend={{ value: "+23 this week", positive: true }}
          />
          <StatsCard
            title="Network Coverage"
            value="42%"
            description="2,090 / 4,950 connections"
            icon={Network}
            trend={{ value: "+5%", positive: true }}
          />
          <StatsCard
            title="Avg Rating"
            value="4.8"
            description="From 156 reviews"
            icon={Star}
            trend={{ value: "↑ 0.2", positive: true }}
          />
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="directory" className="space-y-6">
          <TabsList className="bg-card/50 border border-border/50">
            <TabsTrigger value="directory" className="data-[state=active]:bg-background">
              <Users className="w-4 h-4 mr-2" />
              Directory
            </TabsTrigger>
            <TabsTrigger value="meetings" className="data-[state=active]:bg-background">
              <Calendar className="w-4 h-4 mr-2" />
              Meetings
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-background">
              <TrendingUp className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="feedback" className="data-[state=active]:bg-background">
              <Star className="w-4 h-4 mr-2" />
              Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="directory" className="space-y-6">
            <div className="flex items-center gap-4 bg-card/50 border border-border/50 rounded-xl p-4">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search members by name, role, department, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* TODO: Map real member data */}
              <div className="text-center p-12 border-2 border-dashed border-border/50 rounded-xl">
                <Users className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Member directory will populate here
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Add members or import from CSV
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="meetings" className="space-y-6">
            <div className="text-center p-12 border-2 border-dashed border-border/50 rounded-xl">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                Your meetings will appear here
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Schedule your first meeting
              </p>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center p-12 border-2 border-dashed border-border/50 rounded-xl">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                Analytics dashboard coming soon
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Network graphs, heatmaps, and insights
              </p>
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-6">
            <div className="text-center p-12 border-2 border-dashed border-border/50 rounded-xl">
              <Star className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">
                Private feedback system
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Rate meetings and add encrypted notes
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;