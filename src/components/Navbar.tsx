import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { Menu, LogOut, Users as UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { haptics } from "@/lib/haptics";

export const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error signing out");
    } else {
      toast.success("Signed out successfully");
      navigate("/");
    }
  };

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div 
            className="flex items-center gap-2.5 cursor-pointer group" 
            onClick={() => {
              haptics.medium();
              navigate(user ? "/dashboard" : "/");
            }}
          >
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center group-hover:bg-primary/90 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/25">
              <UsersIcon className="w-5 h-5 text-primary-foreground group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              MeetWise
            </span>
          </div>
          
          {user && (
            <div className="hidden lg:flex items-center gap-8">
              <a 
                href="/dashboard" 
                className="text-base font-medium text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105"
                onMouseEnter={() => haptics.light()}
              >
                Dashboard
              </a>
              <a 
                href="/dashboard" 
                className="text-base font-medium text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105"
                onMouseEnter={() => haptics.light()}
              >
                Analytics
              </a>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden lg:block text-sm font-medium text-muted-foreground px-4 py-2 rounded-lg bg-muted">
                {user.user_metadata?.full_name || user.email}
              </span>
              <Button 
                onClick={handleSignOut} 
                variant="outline"
                size="default"
                className="font-semibold border-2"
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="default"
                className="hidden lg:flex font-semibold"
                onClick={() => navigate("/auth")}
              >
                Sign in
              </Button>
              <Button 
                size="default"
                className="font-semibold shadow-lg shadow-primary/25"
                onClick={() => navigate("/auth")}
              >
                Get started free
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
