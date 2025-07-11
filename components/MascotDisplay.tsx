import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { MascotType, MascotMood } from './MascotSelector';

// Color mapping for different moods
const moodColors = {
  sad: '#7C3AED',   // Purple
  low: '#EF4444',   // Red
  okay: '#F59E0B',  // Orange
  good: '#3B82F6',  // Blue
  great: '#10B981', // Green
};

interface MascotDisplayProps {
  mascot: MascotType;
  mood: MascotMood;
}

// Static mapping for all mascot images
const mascotImages = {
  cat: {
    sad: require('../assets/images/cat/CatSad.png'),
    low: require('../assets/images/cat/CatLow.png'),
    okay: require('../assets/images/cat/CatOkay.png'),
    good: require('../assets/images/cat/CatGood.png'),
    great: require('../assets/images/cat/CatGreat.png'),
  },
  dog: {
    sad: require('../assets/images/dog/DogSad.png'),
    low: require('../assets/images/dog/DogLow.png'),
    okay: require('../assets/images/dog/DogOkay.png'),
    good: require('../assets/images/dog/DogGood.png'),
    great: require('../assets/images/dog/DogGreat.png'),
  },
};

export default function MascotDisplay({ mascot, mood }: MascotDisplayProps) {
  const getMascotImage = (mascot: MascotType, mood: MascotMood) => {
    return mascotImages[mascot][mood];
  };

  return (
    <View style={styles.container}>
      <Image
        source={getMascotImage(mascot, mood)}
        style={styles.mascotImage}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80, // Position above the tab bar
    right: 20,
    zIndex: 1000,
  },
  mascotImage: {
    width: 80,
    height: 80,
  },
}); 