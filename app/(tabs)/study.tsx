import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import Card from '@/components/Card';
import ProgressBar from '@/components/ProgressBar';
import StatCard from '@/components/StatCard';
import { Brain, BookOpen, Target, Lightbulb } from 'lucide-react-native';

export default function StudyScreen() {
  const [selectedLearningStyle, setSelectedLearningStyle] = useState(1);

  const learningStyles = [
    { id: 1, title: 'Visual', icon: '👁️' },
    { id: 2, title: 'Auditory', icon: '🎧' },
    { id: 3, title: 'Kinesthetic', icon: '✋' },
    { id: 4, title: 'Reading', icon: '📚' },
  ];

  const studySessions = [
    { subject: 'UNIT2001', duration: '2h 30m', date: 'Today', focus: 95 },
    { subject: 'UNIT3034', duration: '1h 45m', date: 'Yesterday', focus: 87 },
    { subject: 'UNIT3045', duration: '3h 15m', date: 'Jul 10', focus: 92 },
    { subject: 'UNIT2003', duration: '2h 10m', date: 'Jul 9', focus: 78 },
  ];

  const studySuggestions = [
    'You focus best between 9-11 AM. Schedule difficult subjects during this time.',
    'Break down your 3-hour study sessions into 45-minute chunks with breaks.',
    'Your retention improves by 23% when you review material within 24 hours.',
  ];

  const learningStyleSuggestions: Record<number, { title: string; icon: string; tips: string[] }> = {
    1: {
      title: 'Visual Learners',
      icon: '👁️',
      tips: [
        'Use diagrams, mind maps, and flowcharts',
        'Colour-code notes to group ideas',
        'Watch explainer videos or animations',
        'Study with flashcards that include images or symbols',
      ],
    },
    2: {
      title: 'Auditory Learners',
      icon: '🎧',
      tips: [
        'Listen to podcasts or recorded lectures',
        'Talk through concepts out loud',
        'Use text-to-speech tools or voice notes',
        'Join study groups or discussion sessions',
      ],
    },
    3: {
      title: 'Kinesthetic Learners',
      icon: '🖐️',
      tips: [
        'Write notes by hand or use a whiteboard',
        'Study while walking or moving',
        'Roleplay scenarios or real-world applications',
        'Use physical flashcards or sorting games',
      ],
    },
    4: {
      title: 'Reading/Writing Learners',
      icon: '📖',
      tips: [
        'Rewrite notes in your own words',
        'Highlight and annotate key sections',
        'Make lists, summaries, and definitions',
        'Practice with written quizzes or short answers',
      ],
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Study</Text>
          <Text style={styles.subtitle}>Track your learning journey</Text>
        </View>

        <Card title="Learning Style">
          <View style={styles.learningStyles}>
            {learningStyles.map((style) => (
              <TouchableOpacity
                key={style.id}
                style={[styles.styleButton, selectedLearningStyle === style.id && styles.activeStyle]}
                onPress={() => setSelectedLearningStyle(style.id)}
              >
                <Text style={styles.styleIcon}>{style.icon}</Text>
                <Text style={[styles.styleText, selectedLearningStyle === style.id && styles.activeStyleText]}>
                  {style.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Learning style suggestions panel */}
          <View style={styles.suggestionPanel}>
            <Text style={styles.suggestionPanelTitle}>
              {learningStyleSuggestions[selectedLearningStyle].icon} {learningStyleSuggestions[selectedLearningStyle].title}
            </Text>
            {learningStyleSuggestions[selectedLearningStyle].tips.map((tip, idx) => (
              <Text key={idx} style={styles.suggestionPanelTip}>• {tip}</Text>
            ))}
          </View>
        </Card>

        <Card title="Study Overview">
          <View style={styles.statsRow}>
            <StatCard title="Today" value="4.5h" subtitle="Study Time" color="#3B82F6" />
            <StatCard title="This Week" value="28h" subtitle="Total Time" color="#10B981" />
            <StatCard title="Avg Focus" value="89%" subtitle="Score" color="#8B5CF6" />
          </View>
          <View style={styles.progressSection}>
            <ProgressBar
              label="Study Goal Progress"
              value={28}
              maxValue={35}
              color="#3B82F6"
              unit="h"
            />
            <ProgressBar
              label="Focus Improvement"
              value={89}
              maxValue={100}
              color="#10B981"
              unit="%"
            />
          </View>
        </Card>

        <Card title="Recent Study Sessions">
          <View style={styles.sessionsList}>
            {studySessions.map((session, index) => (
              <View key={index} style={styles.sessionItem}>
                <View style={styles.sessionInfo}>
                  <Text style={styles.sessionSubject}>{session.subject}</Text>
                  <Text style={styles.sessionDate}>{session.date}</Text>
                </View>
                <View style={styles.sessionStats}>
                  <Text style={styles.sessionDuration}>{session.duration}</Text>
                  <View style={styles.focusIndicator}>
                    <Target size={14} color="#6B7280" />
                    <Text style={styles.focusScore}>{session.focus}%</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </Card>

        <Card title="Companion Study Insights">
          <View style={styles.suggestionList}>
            {studySuggestions.map((suggestion, index) => (
              <View key={index} style={styles.suggestionItem}>
                <Lightbulb size={16} color="#3B82F6" />
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
  learningStyles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  styleButton: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activeStyle: {
    backgroundColor: '#EBF8FF',
    borderColor: '#3B82F6',
  },
  styleIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  styleText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  activeStyleText: {
    color: '#3B82F6',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -4,
    marginBottom: 16,
  },
  progressSection: {
    marginTop: 16,
  },
  sessionsList: {
    marginTop: 8,
  },
  sessionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  sessionInfo: {
    flex: 1,
  },
  sessionSubject: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  sessionDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  sessionStats: {
    alignItems: 'flex-end',
  },
  sessionDuration: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  focusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  focusScore: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 4,
  },
  suggestionList: {
    marginTop: 8,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#EBF8FF',
    borderRadius: 8,
    marginBottom: 8,
  },
  suggestionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#1E40AF',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  suggestionPanel: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  suggestionPanelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  suggestionPanelTip: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
    marginLeft: 8,
  },
});