# Mascot Feature

## Overview
The mascot feature allows users to select between cat and dog mascots with different mood states (sad, low, okay, good, great). The selected mascot appears in the bottom right corner of the app, above the navigation bar.

## Components

### MascotSelector (`components/MascotSelector.tsx`)
- Allows users to choose between cat and dog mascots
- Provides mood selection (sad, low, okay, good, great)
- Shows preview images for each selection
- Used in the Settings screen

### MascotDisplay (`components/MascotDisplay.tsx`)
- Displays the selected mascot in the bottom right corner
- Positioned above the navigation bar
- Automatically updates when mascot or mood changes

### MascotContext (`contexts/MascotContext.tsx`)
- Manages mascot state across the entire app
- Provides `useMascot` hook for accessing mascot state
- Handles mascot type and mood selection

## Usage

### For Users
1. Navigate to the Settings tab (gear icon in bottom navigation)
2. Choose your preferred mascot type (Cat or Dog)
3. Select the mood you want your mascot to display
4. The mascot will appear in the bottom right corner of all screens

### For Developers
```typescript
import { useMascot } from '@/contexts/MascotContext';

function MyComponent() {
  const { mascot, mood, setMascotAndMood } = useMascot();
  
  // Access current mascot state
  console.log(`Current mascot: ${mascot}, mood: ${mood}`);
  
  // Update mascot and mood
  setMascotAndMood('dog', 'great');
}
```

## Image Assets
The mascot images are located in:
- `assets/images/cat/` - Cat mascot images (CatSad.png, CatLow.png, etc.)
- `assets/images/dog/` - Dog mascot images (DogSad.png, DogLow.png, etc.)

## File Structure
```
components/
├── MascotSelector.tsx    # Mascot selection UI
└── MascotDisplay.tsx     # Mascot display component

contexts/
└── MascotContext.tsx     # Mascot state management

app/
├── _layout.tsx           # App layout with MascotProvider
└── (tabs)/
    ├── _layout.tsx       # Tab layout with settings tab
    └── settings.tsx      # Settings screen with mascot selector
```

## Features
- ✅ Cat and Dog mascot selection
- ✅ 5 different mood states (sad, low, okay, good, great)
- ✅ Real-time preview in selector
- ✅ Persistent display in bottom right corner
- ✅ Settings integration
- ✅ TypeScript support with proper typing 