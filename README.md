# LinguaScribe

A comprehensive text editing and note-taking application built with React, TypeScript, and Capacitor.

## 📚 Documentation

This project includes comprehensive documentation to help you understand and work with the codebase:

- **[API Documentation](API_DOCUMENTATION.md)** - Complete API reference for all components, hooks, and utilities
- **[UI Components Documentation](UI_COMPONENTS_DOCUMENTATION.md)** - Detailed documentation for all UI components
- **[Quick Reference Guide](QUICK_REFERENCE.md)** - Fast access to commonly used patterns and APIs

## 🚀 Features

- **Text Editor**: Rich text editing with formatting tools and search/replace functionality
- **History Management**: Track and manage text history with filtering and export capabilities
- **Note Taking**: Create, edit, and organize notes with rich editing features
- **Suno Lyrics Editor**: Specialized editor for creating Suno-compatible lyrics with tags
- **Settings Management**: Customize the application with themes, font sizes, and data backup
- **Mobile Optimized**: Responsive design with mobile-specific optimizations
- **Local Storage**: All data is stored locally using browser storage APIs

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **UI Components**: Radix UI primitives with Tailwind CSS
- **Mobile**: Capacitor for cross-platform mobile development
- **State Management**: React hooks and local storage
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── Editor.tsx      # Text editor component
│   ├── History.tsx     # History management
│   ├── Notes.tsx       # Note-taking component
│   ├── SunoEditor.tsx  # Suno lyrics editor
│   ├── Settings.tsx    # Settings management
│   └── Navigation.tsx  # Navigation component
├── hooks/              # Custom React hooks
│   ├── use-toast.ts    # Toast notification hook
│   └── use-mobile-optimization.ts  # Mobile optimization hook
├── lib/                # Utility libraries
│   ├── storage.ts      # Local storage API
│   └── utils.ts        # Utility functions
├── pages/              # Page components
└── App.tsx             # Main application component
```

## 🎯 Core Components

### Navigation
Tab-based navigation between different sections of the application.

### Editor
Comprehensive text editor with:
- Undo/redo functionality
- Text formatting tools
- Search and replace
- Statistics tracking
- Special character management

### History
Manage text history with:
- Filtering by language and type
- Export functionality
- Individual record management

### Notes
Note-taking with:
- Rich editing capabilities
- Import/export functionality
- Search and organization
- Voice input support

### SunoEditor
Specialized lyrics editor with:
- Predefined Suno tags
- Structure validation
- Preview mode
- Export capabilities

### Settings
Application configuration with:
- Theme control (light/dark/auto)
- Font size adjustment
- Data backup and restore
- Mobile optimization settings

## 🔧 Development

### Adding New Components

1. Create the component in the appropriate directory
2. Add TypeScript interfaces for props
3. Include proper accessibility features
4. Add to the documentation
5. Test on mobile and desktop

### Styling Guidelines

- Use Tailwind CSS for styling
- Follow the established design system
- Ensure responsive design
- Maintain accessibility standards

### State Management

- Use React hooks for local state
- Use the storage API for persistence
- Implement proper error handling
- Use toast notifications for user feedback

## 📱 Mobile Development

The application is optimized for mobile devices with:

- Responsive design patterns
- Touch-friendly interfaces
- Mobile-specific optimizations
- Capacitor integration for native features

## 🧪 Testing

```bash
# Run linting
npm run lint

# Run tests (when implemented)
npm test
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Update documentation
6. Submit a pull request

## 📖 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Capacitor Documentation](https://capacitorjs.com/docs)

## 🆘 Support

If you encounter any issues or have questions:

1. Check the documentation files
2. Review the quick reference guide
3. Search existing issues
4. Create a new issue with detailed information

---

**LinguaScribe** - Empowering text creation and management across all devices.
