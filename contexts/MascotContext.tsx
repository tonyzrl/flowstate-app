import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MascotType, MascotMood } from '../components/MascotSelector';

interface MascotContextType {
  mascot: MascotType;
  mood: MascotMood;
  setMascot: (mascot: MascotType) => void;
  setMood: (mood: MascotMood) => void;
  setMascotAndMood: (mascot: MascotType, mood: MascotMood) => void;
  setMoodFromUserMood: (userMoodId: number) => void;
}

const MascotContext = createContext<MascotContextType | undefined>(undefined);

interface MascotProviderProps {
  children: ReactNode;
}

export function MascotProvider({ children }: MascotProviderProps) {
  const [mascot, setMascotState] = useState<MascotType>('cat');
  const [mood, setMoodState] = useState<MascotMood>('good');

  const setMascot = (newMascot: MascotType) => {
    setMascotState(newMascot);
  };

  const setMood = (newMood: MascotMood) => {
    setMoodState(newMood);
  };

  const setMascotAndMood = (newMascot: MascotType, newMood: MascotMood) => {
    setMascotState(newMascot);
    setMoodState(newMood);
  };

  const setMoodFromUserMood = (userMoodId: number) => {
    // Map user mood ID to mascot mood
    const moodMap: { [key: number]: MascotMood } = {
      1: 'great', // Great
      2: 'good',  // Good
      3: 'okay',  // Okay
      4: 'low',   // Low
      5: 'sad',   // Sad
    };
    
    const newMood = moodMap[userMoodId] || 'good';
    setMoodState(newMood);
  };

  const value: MascotContextType = {
    mascot,
    mood,
    setMascot,
    setMood,
    setMascotAndMood,
    setMoodFromUserMood,
  };

  return (
    <MascotContext.Provider value={value}>
      {children}
    </MascotContext.Provider>
  );
}

export function useMascot() {
  const context = useContext(MascotContext);
  if (context === undefined) {
    throw new Error('useMascot must be used within a MascotProvider');
  }
  return context;
} 