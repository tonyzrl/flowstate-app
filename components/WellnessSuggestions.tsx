import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Play, Heart, Headphones, Lightbulb } from 'lucide-react-native';

interface WellnessSuggestionsProps {
  onVR: () => void;
  onBreathing: () => void;
  onMeditation: () => void;
  onSounds: () => void;
}

export default function WellnessSuggestions({ onVR, onBreathing, onMeditation, onSounds }: WellnessSuggestionsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wellness Suggestions:</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={onVR}>
          <Play size={18} color="#3B82F6" />
          <Text style={styles.buttonText}>VR Experience</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onBreathing}>
          <Heart size={18} color="#10B981" />
          <Text style={styles.buttonText}>Breathing</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={onMeditation}>
          <Lightbulb size={18} color="#8B5CF6" />
          <Text style={styles.buttonText}>Meditation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSounds}>
          <Headphones size={18} color="#F59E0B" />
          <Text style={styles.buttonText}>Sounds</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 4,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 4,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  buttonText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#374151',
    fontWeight: '500',
  },
}); 