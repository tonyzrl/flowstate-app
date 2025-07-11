import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export type MascotType = 'cat' | 'dog';
export type MascotMood = 'sad' | 'low' | 'okay' | 'good' | 'great';

interface MascotSelectorProps {
  onMascotChange: (mascot: MascotType, mood: MascotMood) => void;
  selectedMascot: MascotType;
  selectedMood: MascotMood;
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

export default function MascotSelector({ 
  onMascotChange, 
  selectedMascot, 
  selectedMood 
}: MascotSelectorProps) {
  const mascots: MascotType[] = ['cat', 'dog'];
  const moods: MascotMood[] = ['sad', 'low', 'okay', 'good', 'great'];

  const getMascotImage = (mascot: MascotType, mood: MascotMood) => {
    return mascotImages[mascot][mood];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Mascot</Text>
      
      {/* Mascot Type Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mascot Type</Text>
        <View style={styles.mascotTypeContainer}>
          {mascots.map((mascot) => (
            <TouchableOpacity
              key={mascot}
              style={[
                styles.mascotTypeButton,
                selectedMascot === mascot && styles.selectedMascotType
              ]}
              onPress={() => onMascotChange(mascot, selectedMood)}
            >
              <Image
                source={getMascotImage(mascot, selectedMood)}
                style={styles.mascotTypeImage}
                resizeMode="contain"
              />
              <Text style={[
                styles.mascotTypeText,
                selectedMascot === mascot && styles.selectedMascotTypeText
              ]}>
                {mascot.charAt(0).toUpperCase() + mascot.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Mood Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mood</Text>
        <View style={styles.moodContainer}>
          {moods.map((mood) => (
            <TouchableOpacity
              key={mood}
              style={[
                styles.moodButton,
                selectedMood === mood && styles.selectedMood
              ]}
              onPress={() => onMascotChange(selectedMascot, mood)}
            >
              <Image
                source={getMascotImage(selectedMascot, mood)}
                style={styles.moodImage}
                resizeMode="contain"
              />
              <Text style={[
                styles.moodText,
                selectedMood === mood && styles.selectedMoodText
              ]}>
                {mood.charAt(0).toUpperCase() + mood.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#e0f2fe',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1F2937',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#374151',
  },
  mascotTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  mascotTypeButton: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    minWidth: 100,
  },
  selectedMascotType: {
    borderColor: '#3B82F6',
    backgroundColor: '#FFFFFF',
  },
  mascotTypeImage: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  mascotTypeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  selectedMascotTypeText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  moodContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  moodButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    width: '18%',
  },
  selectedMood: {
    borderColor: '#3B82F6',
    backgroundColor: '#FFFFFF',
  },
  moodImage: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  moodText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    textAlign: 'center',
  },
  selectedMoodText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
}); 