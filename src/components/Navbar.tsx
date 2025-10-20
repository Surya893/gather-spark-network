import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { Menu, LogOut, Users as UsersIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
    <nav className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => navigate(user ? "/dashboard" : "/")}
          >
            <div className="w-6 h-6 rounded bg-foreground flex items-center justify-center">
              <UsersIcon className="w-3.5 h-3.5 text-background" />
            </div>
            <span className="text-base font-semibold text-foreground">
              MeetWise
            </span>
          </div>
          
          {user && (
            <div className="hidden lg:flex items-center gap-6">
              <a href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Dashboard
              </a>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden lg:block text-sm text-muted-foreground">
                {user.user_metadata?.full_name || user.email}
              </span>
              <Button 
                onClick={handleSignOut} 
                variant="ghost" 
                size="sm"
              >
                Sign out
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="ghost" 
                size="sm" 
                className="hidden lg:flex"
                onClick={() => navigate("/auth")}
              >
                Sign in
              </Button>
              <Button 
                size="sm"
                onClick={() => navigate("/auth")}
              >
                Get started
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
