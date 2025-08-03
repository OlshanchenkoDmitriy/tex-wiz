import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  FileEdit, 
  History, 
  StickyNote, 
  Music, 
  Menu,
  X
} from "lucide-react";

const navItems = [
  { id: 'editor', label: 'Editor', icon: FileEdit },
  { id: 'history', label: 'History', icon: History },
  { id: 'notes', label: 'Notes', icon: StickyNote },
  { id: 'suno', label: 'SunoEditor', icon: Music },
];

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navigation = ({ activeTab, onTabChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex bg-card border-b border-border">
        <div className="flex items-center justify-between w-full px-6 py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">LS</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              LinguaScribe
            </h1>
          </div>
          
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  onClick={() => onTabChange(item.id)}
                  className={cn(
                    "flex items-center space-x-2 transition-all duration-300",
                    activeTab === item.id 
                      ? "bg-primary text-primary-foreground shadow-primary" 
                      : "hover:bg-secondary"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-card border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">LS</span>
            </div>
            <h1 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
              LinguaScribe
            </h1>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-border bg-card/95 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-2 p-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={activeTab === item.id ? "default" : "outline"}
                    onClick={() => {
                      onTabChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "flex items-center space-x-2 justify-start",
                      activeTab === item.id && "bg-primary text-primary-foreground"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};