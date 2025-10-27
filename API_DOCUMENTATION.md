# LinguaScribe API Documentation

## Table of Contents

1. [Overview](#overview)
2. [Core Components](#core-components)
3. [Custom Hooks](#custom-hooks)
4. [Storage API](#storage-api)
5. [Utility Functions](#utility-functions)
6. [UI Components](#ui-components)
7. [Types and Interfaces](#types-and-interfaces)

## Overview

LinguaScribe is a comprehensive text editing and note-taking application built with React, TypeScript, and Capacitor. The application provides text editing, history management, note-taking, Suno lyrics editing, and settings management capabilities.

## Core Components

### Navigation Component

**File:** `src/components/Navigation.tsx`

A navigation component that provides tab-based navigation between different sections of the application.

#### Props

```typescript
interface NavigationProps {
  activeTab: string;           // Currently active tab identifier
  onTabChange: (tab: string) => void;  // Callback when tab changes
}
```

#### Usage

```tsx
import { Navigation } from "@/components/Navigation";

const [activeTab, setActiveTab] = useState("editor");

<Navigation 
  activeTab={activeTab} 
  onTabChange={setActiveTab} 
/>
```

#### Available Tabs

- `"editor"` - Text editor
- `"history"` - History management
- `"notes"` - Note-taking
- `"suno"` - Suno lyrics editor
- `"settings"` - Application settings

### Editor Component

**File:** `src/components/Editor.tsx`

A comprehensive text editor with formatting tools, search/replace functionality, and text statistics.

#### Features

- **Text Editing**: Rich text editing with undo/redo functionality
- **Clipboard Operations**: Copy/paste support
- **Text Formatting**: Case transformation, special character removal
- **Search & Replace**: Find and replace text functionality
- **Statistics**: Character, word, and line count
- **History Integration**: Save text to history

#### Usage

```tsx
import { Editor } from "@/components/Editor";

<Editor />
```

#### Key Functions

```typescript
// Text manipulation functions
handleTextChange(newText: string): void
handleUndo(): void
handleRedo(): void
copyToClipboard(): void
pasteFromClipboard(): Promise<void>
clearText(): void

// Text formatting functions
transformCase(type: "upper" | "lower" | "title"): void
removeSpecialChars(): void
cleanSpaces(): void
removeEmptyLines(): void
removeNumbers(): void
removeEmojis(): void
findAndReplace(): void

// Statistics
getStats(): { chars: number; words: number; lines: number }
```

### History Component

**File:** `src/components/History.tsx`

Manages and displays text history with filtering and export capabilities.

#### Features

- **History Display**: Show all saved text entries
- **Filtering**: Filter by language, type, and search terms
- **Export**: Export history to JSON file
- **Copy/Delete**: Individual record management

#### Usage

```tsx
import { History } from "@/components/History";

<History />
```

#### Key Functions

```typescript
// History management
loadHistory(): void
filteredRecords: HistoryRecord[]
copyToClipboard(text: string): void
deleteRecord(id: string): void
exportHistory(): void
```

### Notes Component

**File:** `src/components/Notes.tsx`

A note-taking component with rich editing capabilities and file management.

#### Features

- **Note Management**: Create, edit, delete notes
- **Rich Editing**: Undo/redo, voice input support
- **Search**: Search through notes
- **Import/Export**: Backup and restore notes
- **Font Size Control**: Adjustable text size

#### Props

```typescript
// Internal state management
notes: Note[]
selectedNote: Note | null
isEditing: boolean
searchTerm: string
fontSize: number
```

#### Usage

```tsx
import { Notes } from "@/components/Notes";

<Notes />
```

#### Key Functions

```typescript
// Note operations
createNewNote(): void
startEditing(): void
saveNote(): void
deleteNote(noteId: string): void
copyToClipboard(): void
clearContent(): void

// File operations
exportNotes(): void
importNotes(event: React.ChangeEvent<HTMLInputElement>): void

// Voice input
startVoiceInput(): void
```

### SunoEditor Component

**File:** `src/components/SunoEditor.tsx`

A specialized editor for creating Suno-compatible lyrics with tags and structure validation.

#### Features

- **Lyrics Editing**: Structured lyrics creation
- **Tag System**: Predefined Suno tags for sections, styles, and effects
- **Validation**: Structure validation with error reporting
- **Preview Mode**: Preview formatted lyrics
- **Export**: Export lyrics in various formats

#### Usage

```tsx
import { SunoEditor } from "@/components/SunoEditor";

<SunoEditor />
```

#### Available Tags

**Sections:**
- `[Verse]` - Куплет
- `[Chorus]` - Припев
- `[Bridge]` - Переход
- `[Outro]` - Концовка
- `[Intro]` - Вступление

**Styles:**
- `[Rock]` - Рок стиль
- `[Pop]` - Поп стиль
- `[Jazz]` - Джаз стиль
- `[Electronic]` - Электронный стиль
- `[Acoustic]` - Акустический стиль

**Effects:**
- `[Fade In]` - Плавное появление
- `[Fade Out]` - Плавное затухание
- `[Instrumental]` - Инструментальная часть
- `[Vocal Only]` - Только вокал
- `[Repeat]` - Повтор

#### Key Functions

```typescript
insertTag(tag: string): void
validateStructure(): string[]
exportSuno(): void
copyToClipboard(): void
startVoiceInput(): void
previewLyrics(): void
```

### Settings Component

**File:** `src/components/Settings.tsx`

Application settings management with theme control and data backup.

#### Features

- **Theme Control**: Light, dark, and auto themes
- **Font Size**: Adjustable base font size
- **Auto Save**: Toggle automatic saving
- **Data Management**: Import/export all application data
- **Mobile Optimization**: Device-specific settings

#### Usage

```tsx
import { Settings } from "@/components/Settings";

<Settings />
```

#### Key Functions

```typescript
updateSetting(key: keyof AppSettings, value: any): void
applyTheme(theme: string): void
exportData(): void
importBackup(event: React.ChangeEvent<HTMLInputElement>): void
clearAllData(): void
```

### SpecialCharsManager Component

**File:** `src/components/SpecialCharsManager.tsx`

A utility component for managing special characters in text.

#### Props

```typescript
interface SpecialCharsManagerProps {
  text: string;                                    // Current text content
  onTextChange: (newText: string) => void;        // Text change callback
}
```

#### Usage

```tsx
import { SpecialCharsManager } from "@/components/SpecialCharsManager";

<SpecialCharsManager 
  text={text} 
  onTextChange={handleTextChange} 
/>
```

#### Features

- **Character Detection**: Automatically detects special characters
- **Individual Removal**: Remove specific characters
- **Visual Display**: Shows all special characters found
- **Character Count**: Displays count of special characters

## Custom Hooks

### useToast Hook

**File:** `src/hooks/use-toast.ts`

A custom hook for managing toast notifications throughout the application.

#### Usage

```tsx
import { useToast } from "@/hooks/use-toast";

const { toast } = useToast();

// Show a toast notification
toast({
  title: "Success",
  description: "Operation completed successfully",
});
```

#### API

```typescript
interface Toast {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
  duration?: number;
}

// Toast functions
toast(props: Toast): { id: string; dismiss: () => void; update: (props: Toast) => void }
dismiss(toastId?: string): void
```

### useMobileOptimization Hook

**File:** `src/hooks/use-mobile-optimization.ts`

A hook that provides mobile-specific optimizations and responsive design utilities.

#### Usage

```tsx
import { useMobileOptimization } from "@/hooks/use-mobile-optimization";

const { isMobile, isTablet, orientation, mobileOptimizations } = useMobileOptimization();
```

#### Return Values

```typescript
interface MobileOptimizationReturn {
  isMobile: boolean;           // True if device width < 768px
  isTablet: boolean;           // True if device width 768px-1024px
  orientation: "portrait" | "landscape";
  mobileOptimizations: {
    buttonSize: "lg" | "default";
    touchPadding: string;
    fontSize: string;
    textareaHeight: string;
    gridCols: string;
    iconSize: string;
    spacing: string;
    cardPadding: string;
  };
}
```

## Storage API

**File:** `src/lib/storage.ts`

A comprehensive local storage API for managing application data.

### Data Types

```typescript
interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

interface HistoryRecord {
  id: string;
  text: string;
  language: "ru" | "en";
  timestamp: Date;
  type: "speech" | "manual";
}

interface SunoSong {
  id: string;
  title: string;
  artist: string;
  lyrics: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AppSettings {
  fontSize: number;
  theme: 'light' | 'dark' | 'auto';
  autoSave: boolean;
  maxHistoryItems: number;
}
```

### Notes API

```typescript
const notesAPI = {
  getAll(): Note[];                                    // Get all notes
  create(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Note;
  update(id: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>): Note | null;
  delete(id: string): boolean;                         // Delete note by ID
};
```

### History API

```typescript
const historyAPI = {
  getAll(): HistoryRecord[];                           // Get all history records
  add(record: Omit<HistoryRecord, 'id' | 'timestamp'>): HistoryRecord;
  delete(id: string): boolean;                         // Delete record by ID
  clear(): void;                                       // Clear all history
};
```

### Songs API

```typescript
const songsAPI = {
  getAll(): SunoSong[];                                // Get all songs
  create(song: Omit<SunoSong, 'id' | 'createdAt' | 'updatedAt'>): SunoSong;
  update(id: string, updates: Partial<Omit<SunoSong, 'id' | 'createdAt'>>): SunoSong | null;
  delete(id: string): boolean;                         // Delete song by ID
};
```

### Settings API

```typescript
const settingsAPI = {
  get(): AppSettings;                                  // Get current settings
  update(updates: Partial<AppSettings>): void;         // Update settings
  reset(): void;                                       // Reset to defaults
};
```

### Data Export/Import

```typescript
// Export all application data
exportAllData(): string;

// Import data from JSON string
importData(jsonData: string): boolean;
```

## Utility Functions

### cn Function

**File:** `src/lib/utils.ts`

A utility function for combining CSS classes with Tailwind CSS optimization.

#### Usage

```tsx
import { cn } from "@/lib/utils";

const className = cn(
  "base-class",
  condition && "conditional-class",
  "another-class"
);
```

#### Implementation

```typescript
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
```

## UI Components

The application uses a comprehensive set of UI components based on Radix UI and styled with Tailwind CSS. All components are located in `src/components/ui/`.

### Button Component

**File:** `src/components/ui/button.tsx`

A versatile button component with multiple variants and sizes.

#### Props

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}
```

#### Usage

```tsx
import { Button } from "@/components/ui/button";

<Button variant="default" size="lg">
  Click me
</Button>

<Button variant="outline" size="icon">
  <Icon />
</Button>
```

### Card Components

**File:** `src/components/ui/card.tsx`

Card components for content organization.

#### Components

- `Card` - Main card container
- `CardHeader` - Card header section
- `CardTitle` - Card title
- `CardContent` - Card content area

#### Usage

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

### Form Components

**File:** `src/components/ui/form.tsx`

Form components with validation support.

#### Usage

```tsx
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </form>
</Form>
```

### Input Components

**File:** `src/components/ui/input.tsx`

Basic input component.

#### Usage

```tsx
import { Input } from "@/components/ui/input";

<Input 
  type="text" 
  placeholder="Enter text..." 
  className="w-full" 
/>
```

### Textarea Component

**File:** `src/components/ui/textarea.tsx`

Multi-line text input component.

#### Usage

```tsx
import { Textarea } from "@/components/ui/textarea";

<Textarea 
  placeholder="Enter multi-line text..." 
  className="min-h-[100px]" 
/>
```

### Dialog Components

**File:** `src/components/ui/dialog.tsx`

Modal dialog components.

#### Components

- `Dialog` - Main dialog container
- `DialogTrigger` - Dialog trigger button
- `DialogContent` - Dialog content
- `DialogHeader` - Dialog header
- `DialogTitle` - Dialog title
- `DialogDescription` - Dialog description
- `DialogFooter` - Dialog footer

#### Usage

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger>Open Dialog</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
    </DialogHeader>
    Dialog content
  </DialogContent>
</Dialog>
```

### Toast Components

**File:** `src/components/ui/toast.tsx`

Toast notification components.

#### Components

- `Toast` - Individual toast component
- `ToastAction` - Toast action button
- `ToastClose` - Toast close button
- `ToastDescription` - Toast description
- `ToastProvider` - Toast provider
- `ToastTitle` - Toast title
- `ToastViewport` - Toast viewport

#### Usage

```tsx
import { Toast, ToastAction, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast";

<ToastProvider>
  <Toast>
    <ToastTitle>Title</ToastTitle>
    <ToastDescription>Description</ToastDescription>
    <ToastAction altText="Action">Action</ToastAction>
  </Toast>
  <ToastViewport />
</ToastProvider>
```

## Types and Interfaces

### Core Types

```typescript
// Navigation
type TabId = "editor" | "history" | "notes" | "suno" | "settings";

// Text formatting
type CaseType = "upper" | "lower" | "title";

// Language support
type Language = "ru" | "en";

// Record types
type RecordType = "speech" | "manual";

// Theme options
type Theme = "light" | "dark" | "auto";

// Device orientation
type Orientation = "portrait" | "landscape";
```

### Component Props Interfaces

```typescript
// Navigation props
interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

// Special characters manager props
interface SpecialCharsManagerProps {
  text: string;
  onTextChange: (newText: string) => void;
}

// Toast props
interface ToastProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
  duration?: number;
}
```

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Basic Usage

```tsx
import { Navigation } from "@/components/Navigation";
import { Editor } from "@/components/Editor";
import { History } from "@/components/History";
import { Notes } from "@/components/Notes";
import { SunoEditor } from "@/components/SunoEditor";
import { Settings } from "@/components/Settings";

function App() {
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
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="p-4">
        {renderContent()}
      </main>
    </div>
  );
}
```

## Best Practices

1. **Component Composition**: Use composition over inheritance for component design
2. **Type Safety**: Always use TypeScript interfaces for props and state
3. **Error Handling**: Implement proper error handling in async operations
4. **Performance**: Use React.memo and useMemo for expensive operations
5. **Accessibility**: Ensure all components are accessible with proper ARIA labels
6. **Mobile First**: Design with mobile devices in mind using the mobile optimization hook
7. **Data Persistence**: Use the storage API for data persistence
8. **Toast Notifications**: Use the toast system for user feedback

## Contributing

When contributing to the codebase:

1. Follow the existing code style and patterns
2. Add proper TypeScript types for all new functions and components
3. Include JSDoc comments for complex functions
4. Test components on both desktop and mobile devices
5. Update this documentation when adding new APIs or components