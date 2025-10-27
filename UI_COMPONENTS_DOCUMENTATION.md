# UI Components Documentation

## Overview

This document provides comprehensive documentation for all UI components used in the LinguaScribe application. These components are built on top of Radix UI primitives and styled with Tailwind CSS.

## Component Categories

1. [Layout Components](#layout-components)
2. [Form Components](#form-components)
3. [Feedback Components](#feedback-components)
4. [Navigation Components](#navigation-components)
5. [Data Display Components](#data-display-components)
6. [Overlay Components](#overlay-components)

## Layout Components

### Card

**File:** `src/components/ui/card.tsx`

A flexible container for organizing content.

#### Components

- `Card` - Main card container
- `CardHeader` - Card header section
- `CardTitle` - Card title
- `CardDescription` - Card description
- `CardContent` - Card content area
- `CardFooter` - Card footer section

#### Usage

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
  <CardFooter>
    <p>Card footer</p>
  </CardFooter>
</Card>
```

### Separator

**File:** `src/components/ui/separator.tsx`

A visual separator between content sections.

#### Props

```typescript
interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}
```

#### Usage

```tsx
import { Separator } from "@/components/ui/separator";

<Separator className="my-4" />
<Separator orientation="vertical" className="h-4" />
```

### Aspect Ratio

**File:** `src/components/ui/aspect-ratio.tsx`

Maintains a specific aspect ratio for content.

#### Props

```typescript
interface AspectRatioProps extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  ratio?: number;
}
```

#### Usage

```tsx
import { AspectRatio } from "@/components/ui/aspect-ratio";

<AspectRatio ratio={16 / 9} className="bg-muted">
  <img
    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
    alt="Photo"
    className="rounded-md object-cover"
  />
</AspectRatio>
```

## Form Components

### Button

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

#### Variants

- `default` - Primary button with solid background
- `destructive` - Red button for destructive actions
- `outline` - Button with border and transparent background
- `secondary` - Secondary button with muted background
- `ghost` - Transparent button that shows background on hover
- `link` - Button that looks like a link

#### Sizes

- `default` - Standard button size
- `sm` - Small button
- `lg` - Large button
- `icon` - Square button for icons

#### Usage

```tsx
import { Button } from "@/components/ui/button";

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// Icon button
<Button size="icon">
  <Plus className="h-4 w-4" />
</Button>

// As child (for composition)
<Button asChild>
  <Link href="/dashboard">Dashboard</Link>
</Button>
```

### Input

**File:** `src/components/ui/input.tsx`

A basic input component for text entry.

#### Props

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
```

#### Usage

```tsx
import { Input } from "@/components/ui/input";

<Input type="text" placeholder="Enter your name" />
<Input type="email" placeholder="Enter your email" />
<Input type="password" placeholder="Enter your password" />
<Input type="number" placeholder="Enter a number" />
```

### Textarea

**File:** `src/components/ui/textarea.tsx`

A multi-line text input component.

#### Props

```typescript
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
```

#### Usage

```tsx
import { Textarea } from "@/components/ui/textarea";

<Textarea placeholder="Enter your message" />
<Textarea 
  placeholder="Enter your message" 
  className="min-h-[100px]" 
/>
```

### Label

**File:** `src/components/ui/label.tsx`

A label component for form inputs.

#### Props

```typescript
interface LabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {}
```

#### Usage

```tsx
import { Label } from "@/components/ui/label";

<Label htmlFor="email">Email</Label>
<Input id="email" type="email" />
```

### Switch

**File:** `src/components/ui/switch.tsx`

A toggle switch component.

#### Props

```typescript
interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {}
```

#### Usage

```tsx
import { Switch } from "@/components/ui/switch";

<Switch />
<Switch defaultChecked />
<Switch disabled />
```

### Checkbox

**File:** `src/components/ui/checkbox.tsx`

A checkbox component.

#### Props

```typescript
interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {}
```

#### Usage

```tsx
import { Checkbox } from "@/components/ui/checkbox";

<Checkbox />
<Checkbox defaultChecked />
<Checkbox disabled />
```

### Radio Group

**File:** `src/components/ui/radio-group.tsx`

A group of radio buttons.

#### Components

- `RadioGroup` - Main radio group container
- `RadioGroupItem` - Individual radio button

#### Usage

```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

<RadioGroup defaultValue="option-one">
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-one" id="option-one" />
    <Label htmlFor="option-one">Option One</Label>
  </div>
  <div className="flex items-center space-x-2">
    <RadioGroupItem value="option-two" id="option-two" />
    <Label htmlFor="option-two">Option Two</Label>
  </div>
</RadioGroup>
```

### Select

**File:** `src/components/ui/select.tsx`

A select dropdown component.

#### Components

- `Select` - Main select container
- `SelectTrigger` - Select trigger button
- `SelectValue` - Display selected value
- `SelectContent` - Dropdown content
- `SelectItem` - Individual option
- `SelectLabel` - Option group label
- `SelectSeparator` - Visual separator
- `SelectGroup` - Group of options

#### Usage

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>
```

### Slider

**File:** `src/components/ui/slider.tsx`

A range slider component.

#### Props

```typescript
interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {}
```

#### Usage

```tsx
import { Slider } from "@/components/ui/slider";

<Slider defaultValue={[33]} max={100} step={1} />
<Slider defaultValue={[20, 80]} max={100} step={1} />
```

### Form

**File:** `src/components/ui/form.tsx`

Form components with validation support using React Hook Form.

#### Components

- `Form` - Main form container
- `FormField` - Form field wrapper
- `FormItem` - Form item container
- `FormLabel` - Form label
- `FormControl` - Form control wrapper
- `FormDescription` - Form description
- `FormMessage` - Form error message

#### Usage

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

## Feedback Components

### Toast

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
import {
  Toast,
  ToastAction,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

<ToastProvider>
  <Toast>
    <ToastTitle>Scheduled: Catch up</ToastTitle>
    <ToastDescription>
      Friday, February 10, 2023 at 3:00 PM
    </ToastDescription>
    <ToastAction altText="Try again">Try again</ToastAction>
  </Toast>
  <ToastViewport />
</ToastProvider>
```

### Alert

**File:** `src/components/ui/alert.tsx`

Alert component for important messages.

#### Components

- `Alert` - Main alert container
- `AlertTitle` - Alert title
- `AlertDescription` - Alert description

#### Usage

```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the cli.
  </AlertDescription>
</Alert>
```

### Progress

**File:** `src/components/ui/progress.tsx`

A progress bar component.

#### Props

```typescript
interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {}
```

#### Usage

```tsx
import { Progress } from "@/components/ui/progress";

<Progress value={33} />
```

### Skeleton

**File:** `src/components/ui/skeleton.tsx`

A skeleton loading component.

#### Props

```typescript
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}
```

#### Usage

```tsx
import { Skeleton } from "@/components/ui/skeleton";

<Skeleton className="w-[100px] h-[20px]" />
```

## Navigation Components

### Navigation Menu

**File:** `src/components/ui/navigation-menu.tsx`

A navigation menu component.

#### Components

- `NavigationMenu` - Main navigation menu container
- `NavigationMenuList` - Navigation menu list
- `NavigationMenuItem` - Navigation menu item
- `NavigationMenuTrigger` - Navigation menu trigger
- `NavigationMenuContent` - Navigation menu content
- `NavigationMenuLink` - Navigation menu link
- `NavigationMenuIndicator` - Navigation menu indicator
- `NavigationMenuViewport` - Navigation menu viewport

#### Usage

```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          <li className="row-span-3">
            <NavigationMenuLink asChild>
              <a
                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                href="/"
              >
                <div className="mb-2 mt-4 text-lg font-medium">
                  shadcn/ui
                </div>
                <p className="text-sm leading-tight text-muted-foreground">
                  Beautifully designed components built with Radix UI and Tailwind CSS.
                </p>
              </a>
            </NavigationMenuLink>
          </li>
          <ListItem href="/docs" title="Introduction">
            Re-usable components built using Radix UI and Tailwind CSS.
          </ListItem>
          <ListItem href="/docs/installation" title="Installation">
            How to install dependencies and structure your app.
          </ListItem>
          <ListItem href="/docs/primitives/typography" title="Typography">
            Styles for headings, paragraphs, lists...etc
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

### Breadcrumb

**File:** `src/components/ui/breadcrumb.tsx`

A breadcrumb navigation component.

#### Components

- `Breadcrumb` - Main breadcrumb container
- `BreadcrumbList` - Breadcrumb list
- `BreadcrumbItem` - Breadcrumb item
- `BreadcrumbLink` - Breadcrumb link
- `BreadcrumbPage` - Current page indicator
- `BreadcrumbSeparator` - Breadcrumb separator

#### Usage

```tsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### Tabs

**File:** `src/components/ui/tabs.tsx`

A tabs component for organizing content.

#### Components

- `Tabs` - Main tabs container
- `TabsList` - Tabs list
- `TabsTrigger` - Tab trigger
- `TabsContent` - Tab content

#### Usage

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    Make changes to your account here.
  </TabsContent>
  <TabsContent value="password">
    Change your password here.
  </TabsContent>
</Tabs>
```

### Menubar

**File:** `src/components/ui/menubar.tsx`

A menubar component for application menus.

#### Components

- `Menubar` - Main menubar container
- `MenubarTrigger` - Menubar trigger
- `MenubarContent` - Menubar content
- `MenubarItem` - Menubar item
- `MenubarCheckboxItem` - Menubar checkbox item
- `MenubarRadioItem` - Menubar radio item
- `MenubarLabel` - Menubar label
- `MenubarSeparator` - Menubar separator
- `MenubarShortcut` - Menubar shortcut
- `MenubarGroup` - Menubar group
- `MenubarPortal` - Menubar portal
- `MenubarSub` - Menubar submenu
- `MenubarSubContent` - Menubar submenu content
- `MenubarSubTrigger` - Menubar submenu trigger

#### Usage

```tsx
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

<Menubar>
  <MenubarMenu>
    <MenubarTrigger>File</MenubarTrigger>
    <MenubarContent>
      <MenubarItem>
        New Tab <MenubarShortcut>⌘T</MenubarShortcut>
      </MenubarItem>
      <MenubarItem>New Window</MenubarItem>
      <MenubarSeparator />
      <MenubarItem>Share</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

## Data Display Components

### Badge

**File:** `src/components/ui/badge.tsx`

A badge component for displaying status or labels.

#### Props

```typescript
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}
```

#### Usage

```tsx
import { Badge } from "@/components/ui/badge";

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
```

### Avatar

**File:** `src/components/ui/avatar.tsx`

An avatar component for user profile pictures.

#### Components

- `Avatar` - Main avatar container
- `AvatarImage` - Avatar image
- `AvatarFallback` - Avatar fallback

#### Usage

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
```

### Calendar

**File:** `src/components/ui/calendar.tsx`

A calendar component for date selection.

#### Props

```typescript
interface CalendarProps extends React.ComponentPropsWithoutRef<typeof CalendarPrimitive.Root> {
  mode?: "single" | "multiple" | "range";
  selected?: Date | Date[] | DateRange;
  onSelect?: (date: Date | Date[] | DateRange | undefined) => void;
  disabled?: Date[] | ((date: Date) => boolean);
  initialFocus?: boolean;
}
```

#### Usage

```tsx
import { Calendar } from "@/components/ui/calendar";

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>
```

### Table

**File:** `src/components/ui/table.tsx`

A table component for displaying data.

#### Components

- `Table` - Main table container
- `TableHeader` - Table header
- `TableBody` - Table body
- `TableFooter` - Table footer
- `TableHead` - Table head cell
- `TableRow` - Table row
- `TableCell` - Table cell
- `TableCaption` - Table caption

#### Usage

```tsx
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

<Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Pagination

**File:** `src/components/ui/pagination.tsx`

A pagination component for navigating through pages.

#### Components

- `Pagination` - Main pagination container
- `PaginationContent` - Pagination content
- `PaginationEllipsis` - Pagination ellipsis
- `PaginationItem` - Pagination item
- `PaginationLink` - Pagination link
- `PaginationNext` - Next page button
- `PaginationPrevious` - Previous page button

#### Usage

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

## Overlay Components

### Dialog

**File:** `src/components/ui/dialog.tsx`

A modal dialog component.

#### Components

- `Dialog` - Main dialog container
- `DialogTrigger` - Dialog trigger button
- `DialogContent` - Dialog content
- `DialogHeader` - Dialog header
- `DialogFooter` - Dialog footer
- `DialogTitle` - Dialog title
- `DialogDescription` - Dialog description

#### Usage

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Edit Profile</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input
          id="name"
          value="Pedro Duarte"
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Username
        </Label>
        <Input
          id="username"
          value="@peduarte"
          className="col-span-3"
        />
      </div>
    </div>
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Popover

**File:** `src/components/ui/popover.tsx`

A popover component for floating content.

#### Components

- `Popover` - Main popover container
- `PopoverTrigger` - Popover trigger
- `PopoverContent` - Popover content

#### Usage

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Dimensions</h4>
        <p className="text-sm text-muted-foreground">
          Set the dimensions for the layer.
        </p>
      </div>
      <div className="grid gap-2">
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="width">Width</Label>
          <Input
            id="width"
            defaultValue="100%"
            className="col-span-2 h-8"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="maxWidth">Max. width</Label>
          <Input
            id="maxWidth"
            defaultValue="300px"
            className="col-span-2 h-8"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="height">Height</Label>
          <Input
            id="height"
            defaultValue="25px"
            className="col-span-2 h-8"
          />
        </div>
        <div className="grid grid-cols-3 items-center gap-4">
          <Label htmlFor="maxHeight">Max. height</Label>
          <Input
            id="maxHeight"
            defaultValue="none"
            className="col-span-2 h-8"
          />
        </div>
      </div>
    </div>
  </PopoverContent>
</Popover>
```

### Hover Card

**File:** `src/components/ui/hover-card.tsx`

A hover card component for showing additional information on hover.

#### Components

- `HoverCard` - Main hover card container
- `HoverCardTrigger` - Hover card trigger
- `HoverCardContent` - Hover card content

#### Usage

```tsx
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

<HoverCard>
  <HoverCardTrigger asChild>
    <Button variant="link">@nextjs</Button>
  </HoverCardTrigger>
  <HoverCardContent className="w-80">
    <div className="flex justify-between space-x-4">
      <Avatar>
        <AvatarImage src="https://github.com/vercel.png" />
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h4 className="text-sm font-semibold">@nextjs</h4>
        <p className="text-sm">
          The React Framework – created and maintained by @vercel.
        </p>
        <div className="flex items-center pt-2">
          <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
          <span className="text-xs text-muted-foreground">
            Joined December 2021
          </span>
        </div>
      </div>
    </div>
  </HoverCardContent>
</HoverCard>
```

### Tooltip

**File:** `src/components/ui/tooltip.tsx`

A tooltip component for showing additional information.

#### Components

- `Tooltip` - Main tooltip container
- `TooltipTrigger` - Tooltip trigger
- `TooltipContent` - Tooltip content
- `TooltipProvider` - Tooltip provider

#### Usage

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Add to library</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Sheet

**File:** `src/components/ui/sheet.tsx`

A sheet component for slide-out panels.

#### Components

- `Sheet` - Main sheet container
- `SheetTrigger` - Sheet trigger
- `SheetContent` - Sheet content
- `SheetHeader` - Sheet header
- `SheetFooter` - Sheet footer
- `SheetTitle` - Sheet title
- `SheetDescription` - Sheet description

#### Usage

```tsx
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input
          id="name"
          value="Pedro Duarte"
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Username
        </Label>
        <Input
          id="username"
          value="@peduarte"
          className="col-span-3"
        />
      </div>
    </div>
    <SheetFooter>
      <Button type="submit">Save changes</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

### Drawer

**File:** `src/components/ui/drawer.tsx`

A drawer component for slide-out panels (mobile optimized).

#### Components

- `Drawer` - Main drawer container
- `DrawerTrigger` - Drawer trigger
- `DrawerContent` - Drawer content
- `DrawerHeader` - Drawer header
- `DrawerFooter` - Drawer footer
- `DrawerTitle` - Drawer title
- `DrawerDescription` - Drawer description

#### Usage

```tsx
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <div className="mx-auto w-full max-w-sm">
      <DrawerHeader>
        <DrawerTitle>Move Goal</DrawerTitle>
        <DrawerDescription>
          Set your daily activity goal.
        </DrawerDescription>
      </DrawerHeader>
      <div className="p-4 pb-0">
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => setGoal(Math.max(2000, goal - 100))}
          >
            <Minus className="h-4 w-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <div className="flex-1 text-center">
            <div className="text-7xl font-bold tracking-tighter">
              {goal}
            </div>
            <div className="text-xs text-muted-foreground">
              CALORIES/DAY
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-full"
            onClick={() => setGoal(Math.min(4000, goal + 100))}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Increase</span>
          </Button>
        </div>
        <div className="mt-3 h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Bar
                dataKey="goal"
                fill="hsl(var(--chart-1))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <DrawerFooter>
        <Button>Submit</Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </div>
  </DrawerContent>
</Drawer>
```

## Best Practices

1. **Accessibility**: All components are built with accessibility in mind using Radix UI primitives
2. **Responsive Design**: Components are designed to work across all screen sizes
3. **TypeScript**: All components are fully typed with TypeScript
4. **Customization**: Components can be customized using Tailwind CSS classes
5. **Composition**: Use composition patterns for complex component interactions
6. **Performance**: Components are optimized for performance with proper memoization
7. **Consistency**: Follow the established design patterns and naming conventions

## Styling

All components use Tailwind CSS for styling and can be customized using:

- CSS custom properties for theming
- Tailwind CSS classes for layout and spacing
- Component variants for different visual states
- Responsive design utilities for mobile optimization

## Contributing

When adding new UI components:

1. Follow the established patterns and naming conventions
2. Include proper TypeScript types
3. Add accessibility features (ARIA labels, keyboard navigation)
4. Include comprehensive examples in the documentation
5. Test across different screen sizes and devices
6. Ensure proper focus management and keyboard interactions