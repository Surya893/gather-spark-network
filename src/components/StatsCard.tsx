import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { haptics } from "@/lib/haptics";

interface StatsCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export const StatsCard = ({ title, value, description, icon: Icon, trend }: StatsCardProps) => {
  return (
    <Card 
      className="p-6 border-border/50 bg-card hover:shadow-lg hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group cursor-default"
      onMouseEnter={() => haptics.light()}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
            <Icon className="w-4.5 h-4.5 text-foreground group-hover:text-primary transition-colors duration-300" />
          </div>
          <p className="text-[13px] font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">{title}</p>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-semibold text-foreground tracking-tight group-hover:text-primary group-hover:scale-105 transition-all duration-300">{value}</h3>
          {trend && (
            <span className={`text-[12px] font-medium ${trend.positive ? "text-accent" : "text-destructive"}`}>
              {trend.value}
            </span>
          )}
        </div>
        <p className="text-[12px] text-muted-foreground/80 group-hover:text-muted-foreground transition-colors duration-300">{description}</p>
      </div>
    </Card>
  );
};
