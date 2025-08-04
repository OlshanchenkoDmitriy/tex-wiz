import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FileEdit, History, StickyNote, Music, Settings } from "lucide-react";

const navItems = [
  { id: "editor", label: "Editor", icon: FileEdit },
  { id: "history", label: "History", icon: History },
  { id: "notes", label: "Notes", icon: StickyNote },
  { id: "suno", label: "Suno", icon: Music },
  { id: "settings", label: "Settings", icon: Settings },
];

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">
              LS
            </span>
          </div>
          <h1 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
            LinguaScribe
          </h1>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-4 py-2">
        <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "flex items-center space-x-2 whitespace-nowrap transition-all duration-200",
                  "min-w-fit px-3 py-2 text-sm",
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "hover:bg-secondary text-muted-foreground"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">{item.label.charAt(0)}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
