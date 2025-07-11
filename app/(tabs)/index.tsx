import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import Card from '@/components/Card';
import MoodSelector from '@/components/MoodSelector';
import ProgressBar from '@/components/ProgressBar';
import StatCard from '@/components/StatCard';
import { CircleCheck as CheckCircle, Clock, Target, Lightbulb } from 'lucide-react-native';

export default function HomeScreen() {
  const userName = "Andrei";
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  const [focusTasks, setFocusTasks] = useState([
    { id: 1, title: 'Complete Design Report', completed: false },
    { id: 2, title: 'Review Exam Notes', completed: true },
    { id: 3, title: 'Practice Mechanics Questions', completed: false },
  ]);

  const toggleTask = (id: number) => {
    setFocusTasks(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const upcomingEvents = [
    { id: 1, title: 'UNIT1000 Exam', date: 'Tomorrow 10:00 AM', type: 'exam' },
    { id: 2, title: 'Design Report Due', date: 'Friday 11:59 PM', type: 'assignment' },
    { id: 3, title: 'Study Group Meeting', date: 'Saturday 2:00 PM', type: 'meeting' },
  ];

  const suggestions = [
    'Take a 10-minute break every hour to improve focus',
    'Review your notes before bed to enhance memory retention',
    'Try the Pomodoro Technique for better time management',
  ];

  const dailyQuotes = [
    "You are capable of amazing things.",
    "Every day is a fresh start.",
    "Believe in yourself and all that you are.",
    "Progress, not perfection.",
    "You’ve got this!",
  ];
  const today = new Date();
  const quoteOfTheDay = dailyQuotes[today.getDate() % dailyQuotes.length];

  const [showWrappedModal, setShowWrappedModal] = useState(false);

  const wellbeingStats = {
    mood: "😊 Great",
    avgSleep: "7.5h/night",
    exercise: "4x/week",
  };

  const studyStats = {
    totalHours: "42h",
    avgDaily: "1.4h",
    topSubject: "Math",
    focusScore: "88%",
  };

  const scheduleStats = [
    { title: "UNIT1000 Exam", date: "Tomorrow 10:00 AM" },
    { title: "Design Report Due", date: "Friday 11:59 PM" },
    { title: "Study Group Meeting", date: "Saturday 2:00 PM" },
  ];

  return (
    <View style={styles.container}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Image
          source={require('@/assets/images/nature.jpeg')}
          style={styles.heroBackground}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay} />
        <SafeAreaView style={styles.heroContent}>
          <View style={styles.heroHeader}>
            <View style={styles.greetingContainer}>
              <Text style={styles.heroGreeting}>{greeting},</Text>
              <Text style={styles.heroName}>{userName}</Text>
            </View>
            <TouchableOpacity onPress={() => setShowWrappedModal(true)} style={styles.profileContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2' }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      {/* Content Section */}
      <ScrollView style={styles.contentSection} showsVerticalScrollIndicator={false}>
        <View style={styles.contentPadding}>
          {/* Daily Affirmation Card */}
          <Card title="Daily Affirmation">
            <View style={{ paddingVertical: 6, alignItems: 'center' }}> {/* Reduced from 16 to 6 */}
              <Text style={{ fontSize: 18, fontStyle: 'italic', color: '#6B7280', textAlign: 'center' }}>
                "{quoteOfTheDay}"
              </Text>
            </View>
          </Card>
          <Card title="Today's Overview">
            <View style={styles.statsRow}>
              <StatCard title="Mood" value="😊" subtitle="Great" color="#10B981" />
              <StatCard title="Study Time" value="4.5h" subtitle="Today" color="#3B82F6" />
              <StatCard title="Focus Score" value="85%" subtitle="↑ 5%" color="#8B5CF6" />
            </View>
          </Card>

          <Card title="Focus for Today">
            <View style={styles.taskList}>
              {focusTasks.map((task) => (
                <TouchableOpacity
                  key={task.id}
                  style={styles.taskItem}
                  onPress={() => toggleTask(task.id)}
                >
                  <CheckCircle
                    size={20}
                    color={task.completed ? '#10B981' : '#D1D5DB'}
                    fill={task.completed ? '#10B981' : 'transparent'}
                  />
                  <Text style={[styles.taskText, task.completed && styles.completedTask]}>
                    {task.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Card>

          <Card title="Upcoming Events">
            <View style={styles.eventList}>
              {upcomingEvents.map((event) => (
                <View key={event.id} style={styles.eventItem}>
                  <View style={styles.eventIcon}>
                    <Clock size={16} color="#6B7280" />
                  </View>
                  <View style={styles.eventContent}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.eventDate}>{event.date}</Text>
                  </View>
                </View>
              ))}
            </View>
          </Card>

          <Card title="Companion Suggestions">
            <View style={styles.suggestionList}>
              {suggestions.map((suggestion, index) => (
                <View key={index} style={styles.suggestionItem}>
                  <Lightbulb size={16} color="#F59E0B" />
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </View>
              ))}
            </View>
          </Card>
        </View>
      </ScrollView>

      <Modal
        visible={showWrappedModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowWrappedModal(false)}
      >
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.3)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            padding: 24,
            width: '90%',
            maxHeight: '80%',
          }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 18, textAlign: 'center' }}>
              Your Monthly Wrapped
            </Text>
            {/* Wellbeing Section */}
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Wellbeing</Text>
            <View style={{ marginBottom: 16 }}>
              <Text>Mood: {wellbeingStats.mood}</Text>
              <Text>Avg Sleep: {wellbeingStats.avgSleep}</Text>
              <Text>Exercise: {wellbeingStats.exercise}</Text>
            </View>
            {/* Study Section */}
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Study</Text>
            <View style={{ marginBottom: 16 }}>
              <Text>Total Study Hours: {studyStats.totalHours}</Text>
              <Text>Avg Daily: {studyStats.avgDaily}</Text>
              <Text>Top Subject: {studyStats.topSubject}</Text>
              <Text>Focus Score: {studyStats.focusScore}</Text>
            </View>
            {/* Schedules Section */}
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Schedules</Text>
            <View style={{ marginBottom: 16 }}>
              {scheduleStats.map((item, idx) => (
                <Text key={idx}>{item.title} — {item.date}</Text>
              ))}
            </View>
            <TouchableOpacity
              onPress={() => setShowWrappedModal(false)}
              style={{
                backgroundColor: '#3B82F6',
                borderRadius: 8,
                paddingVertical: 10,
                alignItems: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontSize: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  heroSection: {
    height: 200,
    position: 'relative',
  },
  heroBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },
  greetingContainer: {
    flex: 1,
  },
  heroGreeting: {
    fontSize: 24,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 4,
  },
  heroName: {
    fontSize: 48,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    lineHeight: 56,
  },
  profileContainer: {
    marginLeft: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  contentSection: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
  },
  contentPadding: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -4,
  },
  taskList: {
    marginTop: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  taskText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#374151',
    marginLeft: 12,
    flex: 1,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  eventList: {
    marginTop: 8,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  eventIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  eventDate: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginTop: 2,
  },
  suggestionList: {
    marginTop: 8,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    marginBottom: 8,
  },
  suggestionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#92400E',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
});