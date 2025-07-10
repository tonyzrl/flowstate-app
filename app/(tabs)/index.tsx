import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '@/components/Card';
import MoodSelector from '@/components/MoodSelector';
import ProgressBar from '@/components/ProgressBar';
import StatCard from '@/components/StatCard';
import { CircleCheck as CheckCircle, Clock, Target, Lightbulb } from 'lucide-react-native';

export default function HomeScreen() {
  const userName = "Jimmy";
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  const focusTasks = [
    { id: 1, title: 'Complete Math Assignment', completed: false },
    { id: 2, title: 'Review Chemistry Notes', completed: true },
    { id: 3, title: 'Practice Spanish Vocabulary', completed: false },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Physics Exam', date: 'Tomorrow 10:00 AM', type: 'exam' },
    { id: 2, title: 'Literature Essay Due', date: 'Friday 11:59 PM', type: 'assignment' },
    { id: 3, title: 'Study Group Meeting', date: 'Saturday 2:00 PM', type: 'meeting' },
  ];

  const suggestions = [
    'Take a 10-minute break every hour to improve focus',
    'Review your notes before bed to enhance memory retention',
    'Try the Pomodoro Technique for better time management',
  ];

  return (
    <View style={styles.container}>
      {/* Hero Section with Background Image and Profile */}
      <View style={styles.heroSection}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=800' }}
          style={styles.backgroundImage}
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}
          style={styles.overlay}
        />
        <SafeAreaView style={styles.heroContent}>
          <View style={styles.profileSection}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150' }}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.greetingSection}>
            <Text style={styles.greeting}>{greeting},</Text>
            <Text style={styles.userName}>{userName}</Text>
          </View>
        </SafeAreaView>
      </View>

      {/* Content Section */}
      <ScrollView style={styles.contentSection} showsVerticalScrollIndicator={false}>
        <View style={styles.contentPadding}>
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
                <View key={task.id} style={styles.taskItem}>
                  <CheckCircle
                    size={20}
                    color={task.completed ? '#10B981' : '#D1D5DB'}
                    fill={task.completed ? '#10B981' : 'transparent'}
                  />
                  <Text style={[styles.taskText, task.completed && styles.completedTask]}>
                    {task.title}
                  </Text>
                </View>
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

          <Card title="AI Suggestions">
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  heroSection: {
    height: 280,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  profileSection: {
    alignItems: 'flex-end',
    paddingTop: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  greetingSection: {
    alignItems: 'flex-start',
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  userName: {
    fontSize: 42,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
    marginTop: -5,
  },
  contentSection: {
    flex: 1,
    marginTop: -20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#F3F4F6',
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