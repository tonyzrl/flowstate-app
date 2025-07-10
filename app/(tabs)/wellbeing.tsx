import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '@/components/Card';
import MoodSelector from '@/components/MoodSelector';
import { Heart, Headphones, Play, Lightbulb } from 'lucide-react-native';

export default function WellbeingScreen() {
  const recentMoods = [
    { day: 'Mon', mood: '😊', score: 85 },
    { day: 'Tue', mood: '🙂', score: 75 },
    { day: 'Wed', mood: '😐', score: 60 },
    { day: 'Thu', mood: '😊', score: 90 },
    { day: 'Fri', mood: '😔', score: 45 },
    { day: 'Sat', mood: '🙂', score: 70 },
    { day: 'Sun', mood: '😊', score: 85 },
  ];

  const supportOptions = [
    { id: 1, title: 'Guided Meditation', duration: '10 min', icon: 'meditation' },
    { id: 2, title: 'Breathing Exercise', duration: '5 min', icon: 'breathing' },
    { id: 3, title: 'Calming VR Experience', duration: '15 min', icon: 'vr' },
    { id: 4, title: 'Relaxing Sounds', duration: '∞', icon: 'sounds' },
  ];

  const wellbeingSuggestions = [
    'Your stress levels seem elevated. Consider taking a short walk outside.',
    'You\'ve been studying for 3 hours straight. Time for a mindfulness break!',
    'Your mood has been improving this week. Keep up the good habits!',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Wellbeing</Text>
          <Text style={styles.subtitle}>Take care of your mental health</Text>
        </View>

        <Card title="How's Your Mood?">
          <MoodSelector />
        </Card>

        <Card title="Recent Moods">
          <View style={styles.moodChart}>
            {recentMoods.map((mood, index) => (
              <View key={index} style={styles.moodDay}>
                <Text style={styles.moodEmoji}>{mood.mood}</Text>
                <View style={[styles.moodBar, { height: mood.score }]} />
                <Text style={styles.moodDayLabel}>{mood.day}</Text>
              </View>
            ))}
          </View>
          <Text style={styles.chartNote}>
            Your average wellbeing score this week: 73%
          </Text>
        </Card>

        <Card title="Support & Resources">
          <View style={styles.supportGrid}>
            {supportOptions.map((option) => (
              <TouchableOpacity key={option.id} style={styles.supportCard}>
                <View style={styles.supportIcon}>
                  {option.icon === 'meditation' && <Heart size={24} color="#8B5CF6" />}
                  {option.icon === 'breathing' && <Heart size={24} color="#10B981" />}
                  {option.icon === 'vr' && <Play size={24} color="#3B82F6" />}
                  {option.icon === 'sounds' && <Headphones size={24} color="#F59E0B" />}
                </View>
                <Text style={styles.supportTitle}>{option.title}</Text>
                <Text style={styles.supportDuration}>{option.duration}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card title="Companion Wellbeing Insights">
          <View style={styles.suggestionList}>
            {wellbeingSuggestions.map((suggestion, index) => (
              <View key={index} style={styles.suggestionItem}>
                <Lightbulb size={16} color="#8B5CF6" />
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </View>
            ))}
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingVertical: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 4,
  },
  moodChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
    marginVertical: 16,
  },
  moodDay: {
    alignItems: 'center',
    flex: 1,
  },
  moodEmoji: {
    fontSize: 16,
    marginBottom: 8,
  },
  moodBar: {
    width: 20,
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    marginBottom: 8,
  },
  moodDayLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  chartNote: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#10B981',
    textAlign: 'center',
  },
  supportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  supportCard: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  supportIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  supportTitle: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 4,
  },
  supportDuration: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  suggestionList: {
    marginTop: 8,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F3E8FF',
    borderRadius: 8,
    marginBottom: 8,
  },
  suggestionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#7C3AED',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
});