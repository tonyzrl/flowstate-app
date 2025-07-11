import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useMascot } from '@/contexts/MascotContext';

const moods = [
  { id: 1, emoji: '😊', label: 'Great', color: '#10B981' },
  { id: 2, emoji: '🙂', label: 'Good', color: '#3B82F6' },
  { id: 3, emoji: '😐', label: 'Okay', color: '#F59E0B' },
  { id: 4, emoji: '😔', label: 'Low', color: '#EF4444' },
  { id: 5, emoji: '😢', label: 'Sad', color: '#7C3AED' },
];

export default function MoodSelector() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const { setMoodFromUserMood } = useMascot();

  return (
    <View style={styles.container}>
      <Text style={styles.question}>How are you feeling today?</Text>
      <View style={styles.moodRow}>
        {moods.map((mood) => (
          <TouchableOpacity
            key={mood.id}
            style={[
              styles.moodButton,
              selectedMood === mood.id && { backgroundColor: mood.color, opacity: 0.2 }
            ]}
            onPress={() => {
              setSelectedMood(mood.id);
              setMoodFromUserMood(mood.id);
            }}
          >
            <Text style={styles.moodEmoji}>{mood.emoji}</Text>
            <Text style={styles.moodLabel}>{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedMood && (
        <Text style={styles.selectedText}>
          You're feeling {moods.find(m => m.id === selectedMood)?.label.toLowerCase()} today
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  question: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginBottom: 16,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  moodButton: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    flex: 1,
    marginHorizontal: 4,
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  selectedText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
    textAlign: 'center',
  },
});