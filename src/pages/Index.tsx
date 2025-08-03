import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Editor } from "@/components/Editor";
import { Speech } from "@/components/Speech";
import { History } from "@/components/History";
import { Notes } from "@/components/Notes";
import { SunoEditor } from "@/components/SunoEditor";

const Index = () => {
  const [activeTab, setActiveTab] = useState("editor");

  const renderContent = () => {
    switch (activeTab) {
      case "editor":
        return <Editor />;
      case "speech":
        return <Speech />;
      case "history":
        return <History />;
      case "notes":
        return <Notes />;
      case "suno":
        return <SunoEditor />;
      default:
        return <Editor />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="container mx-auto p-4 md:p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
