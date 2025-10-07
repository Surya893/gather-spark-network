import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

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
    <Card className="p-6 border-border/50 bg-card hover:shadow-[0_4px_6px_-1px_rgb(0_0_0_/0.05),0_2px_4px_-2px_rgb(0_0_0_/0.03)] transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center">
            <Icon className="w-4.5 h-4.5 text-foreground" />
          </div>
          <p className="text-[13px] font-medium text-muted-foreground">{title}</p>
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-semibold text-foreground tracking-tight">{value}</h3>
          {trend && (
            <span className={`text-[12px] font-medium ${trend.positive ? "text-accent" : "text-destructive"}`}>
              {trend.value}
            </span>
          )}
        </div>
        <p className="text-[12px] text-muted-foreground/80">{description}</p>
      </div>
    </Card>
  );
};
