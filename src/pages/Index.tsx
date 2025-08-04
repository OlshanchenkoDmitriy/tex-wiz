import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Editor } from "@/components/Editor";
import { History } from "@/components/History";
import { Notes } from "@/components/Notes";
import { SunoEditor } from "@/components/SunoEditor";
import { Settings } from "@/components/Settings";

const Index = () => {
  const [activeTab, setActiveTab] = useState("editor");

  const renderContent = () => {
    switch (activeTab) {
      case "editor":
        return <Editor />;
      case "history":
        return <History />;
      case "notes":
        return <Notes />;
      case "suno":
        return <SunoEditor />;
      case "settings":
        return <Settings />;
      default:
        return <Editor />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
