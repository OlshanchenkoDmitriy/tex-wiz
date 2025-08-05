# LinguaScribe Quick Reference Guide

## Quick Start

```tsx
import { Navigation } from "@/components/Navigation";
import { Editor } from "@/components/Editor";
import { History } from "@/components/History";
import { Notes } from "@/components/Notes";
import { SunoEditor } from "@/components/SunoEditor";
import { Settings } from "@/components/Settings";

// Basic app structure
const [activeTab, setActiveTab] = useState("editor");

<Navigation activeTab={activeTab} onTabChange={setActiveTab} />
{activeTab === "editor" && <Editor />}
{activeTab === "history" && <History />}
{activeTab === "notes" && <Notes />}
{activeTab === "suno" && <SunoEditor />}
{activeTab === "settings" && <Settings />}
```

## Core APIs

### Storage API

```tsx
import { notesAPI, historyAPI, songsAPI, settingsAPI } from "@/lib/storage";

// Notes
const notes = notesAPI.getAll();
const newNote = notesAPI.create({ title: "Title", content: "Content" });
const updatedNote = notesAPI.update(id, { title: "New Title" });
notesAPI.delete(id);

// History
const history = historyAPI.getAll();
const newRecord = historyAPI.add({ text: "Text", language: "ru", type: "manual" });
historyAPI.delete(id);
historyAPI.clear();

// Settings
const settings = settingsAPI.get();
settingsAPI.update({ fontSize: 16, theme: "dark" });
settingsAPI.reset();
```

### Toast Notifications

```tsx
import { useToast } from "@/hooks/use-toast";

const { toast } = useToast();

toast({
  title: "Success",
  description: "Operation completed",
  variant: "default", // or "destructive"
});
```

### Mobile Optimization

```tsx
import { useMobileOptimization } from "@/hooks/use-mobile-optimization";

const { isMobile, isTablet, orientation, mobileOptimizations } = useMobileOptimization();

// Use optimizations
<Button size={mobileOptimizations.buttonSize}>
  Click me
</Button>
```

## Common UI Patterns

### Card Layout

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

### Form with Validation

```tsx
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const form = useForm();

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="fieldName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Label</FormLabel>
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

### Dialog/Modal

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    Content here
  </DialogContent>
</Dialog>
```

## Component Props Quick Reference

### Navigation

```tsx
interface NavigationProps {
  activeTab: string;           // "editor" | "history" | "notes" | "suno" | "settings"
  onTabChange: (tab: string) => void;
}
```

### SpecialCharsManager

```tsx
interface SpecialCharsManagerProps {
  text: string;
  onTextChange: (newText: string) => void;
}
```

### Button Variants

```tsx
variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
size?: "default" | "sm" | "lg" | "icon"
```

### Badge Variants

```tsx
variant?: "default" | "secondary" | "destructive" | "outline"
```

## Data Types

### Note

```tsx
interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### HistoryRecord

```tsx
interface HistoryRecord {
  id: string;
  text: string;
  language: "ru" | "en";
  timestamp: Date;
  type: "speech" | "manual";
}
```

### AppSettings

```tsx
interface AppSettings {
  fontSize: number;
  theme: 'light' | 'dark' | 'auto';
  autoSave: boolean;
  maxHistoryItems: number;
}
```

## Utility Functions

### Class Name Utility

```tsx
import { cn } from "@/lib/utils";

const className = cn(
  "base-class",
  condition && "conditional-class",
  "another-class"
);
```

## Common Patterns

### State Management

```tsx
// Local state
const [data, setData] = useState<DataType[]>([]);

// Load data on mount
useEffect(() => {
  const loadData = () => {
    const allData = api.getAll();
    setData(allData);
  };
  loadData();
}, []);

// Update data
const updateItem = (id: string, updates: Partial<DataType>) => {
  const updated = api.update(id, updates);
  if (updated) {
    setData(data.map(item => item.id === id ? updated : item));
  }
};
```

### Error Handling

```tsx
try {
  const result = await someAsyncOperation();
  toast({ title: "Success", description: "Operation completed" });
} catch (error) {
  toast({ 
    title: "Error", 
    description: "Operation failed", 
    variant: "destructive" 
  });
}
```

### Clipboard Operations

```tsx
// Copy to clipboard
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast({ title: "Copied", description: "Text copied to clipboard" });
};

// Paste from clipboard
const pasteFromClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText();
    // Use the text
  } catch (error) {
    toast({ title: "Error", description: "Failed to read clipboard" });
  }
};
```

### File Operations

```tsx
// Export data
const exportData = (data: any, filename: string) => {
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  
  URL.revokeObjectURL(url);
};

// Import data
const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target?.result as string);
      // Use the data
    } catch (error) {
      toast({ title: "Error", description: "Invalid file format" });
    }
  };
  reader.readAsText(file);
};
```

## Mobile Optimization Quick Reference

```tsx
const { mobileOptimizations } = useMobileOptimization();

// Common patterns
<div className={`grid ${mobileOptimizations.gridCols} gap-4`}>
  <Card className={mobileOptimizations.cardPadding}>
    <Button size={mobileOptimizations.buttonSize}>
      Action
    </Button>
  </Card>
</div>

<Textarea className={mobileOptimizations.textareaHeight} />
<div className={mobileOptimizations.spacing}>
  Content with mobile-optimized spacing
</div>
```

## Theme and Styling

### CSS Custom Properties

```css
/* Available theme variables */
--background
--foreground
--card
--card-foreground
--popover
--popover-foreground
--primary
--primary-foreground
--secondary
--secondary-foreground
--muted
--muted-foreground
--accent
--accent-foreground
--destructive
--destructive-foreground
--border
--input
--ring
--radius
```

### Common Tailwind Classes

```tsx
// Layout
"flex items-center justify-between"
"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
"space-y-4 md:space-y-6"

// Spacing
"p-4 md:p-6"
"gap-2 md:gap-4"
"mx-auto max-w-7xl"

// Typography
"text-sm md:text-base"
"font-medium"
"text-muted-foreground"

// Colors
"bg-background"
"text-foreground"
"border-border"
"bg-primary text-primary-foreground"

// Responsive
"hidden md:block"
"md:hidden"
"w-full md:w-auto"
```

## Performance Tips

1. **Memoization**: Use `useMemo` for expensive calculations
2. **Callback Optimization**: Use `useCallback` for event handlers passed to children
3. **Lazy Loading**: Use `React.lazy` for route-based code splitting
4. **Virtual Scrolling**: For large lists, consider virtual scrolling libraries
5. **Debouncing**: Debounce search inputs and other frequent events

## Accessibility Checklist

- [ ] All interactive elements have proper ARIA labels
- [ ] Keyboard navigation works for all components
- [ ] Focus management is handled properly in modals
- [ ] Color contrast meets WCAG guidelines
- [ ] Screen reader announcements are implemented
- [ ] Touch targets are at least 44px on mobile

## Testing Patterns

```tsx
// Component testing
import { render, screen, fireEvent } from '@testing-library/react';

test('component renders correctly', () => {
  render(<Component />);
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});

// User interaction testing
test('user can interact with component', () => {
  render(<Component />);
  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByText('Result')).toBeInTheDocument();
});
```

## Deployment Checklist

- [ ] Build passes without errors
- [ ] All TypeScript types are correct
- [ ] Mobile responsiveness tested
- [ ] Accessibility audit completed
- [ ] Performance metrics meet targets
- [ ] Error boundaries implemented
- [ ] Loading states handled
- [ ] Offline functionality tested (if applicable)