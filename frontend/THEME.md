# MUI Theme Configuration

## Overview
The application now uses a centralized Material-UI (MUI) theme that matches the design of the landing page and login page. This provides consistency across the entire application and makes it easy to update colors, typography, and component styles from a single location.

## Theme Location
The theme is defined in `/src/theme/index.ts`

## Color Palette
The primary color scheme is based on green tones:

- **Primary**: `#16a34a` (green-600)
- **Primary Dark**: `#15803d` (green-700) - used for hover states
- **Primary Light**: `#22c55e` (green-500)

### Full Green Palette
```
50:  #f0fdf4
100: #dcfce7
200: #bbf7d0
300: #86efac
400: #4ade80
500: #22c55e
600: #16a34a (Primary)
700: #15803d (Hover)
800: #166534
900: #14532d
```

## Usage

### Basic Component Usage
All MUI components automatically use the theme:

```tsx
import { Button, TextField } from '@mui/material';

// This button will automatically be green
<Button variant="contained">Click Me</Button>

// This text field will have green focus color
<TextField label="Name" />
```

### Accessing Theme in Components
```tsx
import { useTheme } from '@mui/material/styles';

const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <div style={{ color: theme.palette.primary.main }}>
      Styled with theme color
    </div>
  );
};
```

## Customized Components

### Buttons
- Border radius: 12px (rounded corners)
- No elevation/shadows by default
- Primary buttons use green color scheme
- Text is not uppercase (textTransform: 'none')

### Text Fields
- Border radius: 12px
- Green focus color
- Gray border by default

### Cards
- Border radius: 16px
- Subtle shadows

### Dialogs
- Border radius: 16px

### List Items (Navigation)
- Border radius: 8px
- Selected state has green background

## Modifying the Theme

### Changing the Primary Color
Edit `/src/theme/index.ts`:

```typescript
const greenColors = {
  // Update these values
  600: "#16a34a", // Primary
  700: "#15803d", // Hover
};
```

### Adding New Component Overrides
Edit `/src/theme/index.ts`:

```typescript
components: {
  MuiButton: {
    styleOverrides: {
      root: {
        // Your custom styles
      },
    },
  },
  // Add more components...
}
```

### Changing Typography
```typescript
typography: {
  fontFamily: 'Your Font Family',
  h1: {
    fontWeight: 700,
  },
  // ...
}
```

## Benefits of This Approach

1. **Consistency**: All components across the app use the same color scheme
2. **Maintainability**: Change colors in one place, updates everywhere
3. **Scalability**: Easy to add new theme variants (light/dark mode)
4. **Developer Experience**: No need to remember color codes or styles
5. **Type Safety**: Full TypeScript support with theme types

## Before vs After

### Before (Hardcoded)
```tsx
<Button 
  sx={{ 
    bgcolor: "#16a34a", 
    "&:hover": { bgcolor: "#15803d" } 
  }}
>
  Click Me
</Button>
```

### After (Theme-based)
```tsx
<Button variant="contained">
  Click Me
</Button>
```

## Migration Guide

When updating existing components:

1. Remove inline `sx` props that define colors
2. Use MUI variants instead (`contained`, `outlined`, etc.)
3. For custom styling, use theme values:
   ```tsx
   sx={{ color: 'primary.main' }}
   // instead of
   sx={{ color: '#16a34a' }}
   ```

## Future Enhancements

- Dark mode support
- Multiple theme presets
- User-customizable themes
- Per-customer branding
