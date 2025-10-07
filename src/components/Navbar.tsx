import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <nav className="border-b border-border/40 backdrop-blur-xl bg-background/80 sticky top-0 z-50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-foreground" />
            <span className="text-[15px] font-semibold tracking-tight text-foreground">
              meetwise
            </span>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
            <a href="#dashboard" className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </a>
            <a href="#directory" className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors">
              Directory
            </a>
            <a href="#analytics" className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors">
              Analytics
            </a>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden lg:flex text-[13px] font-medium">
            Sign in
          </Button>
          <Button size="sm" className="bg-foreground text-background hover:bg-foreground/90 text-[13px] font-medium">
            Get started
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};
