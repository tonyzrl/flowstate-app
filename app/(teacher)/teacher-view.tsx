import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import Card from '@/components/Card';
import StatCard from '@/components/StatCard';
import { CircleCheck as CheckCircle, Clock, Target, Lightbulb, Users, GraduationCap, BookOpen, MessageCircle } from 'lucide-react-native';
import { router } from 'expo-router';

export default function TeacherViewScreen() {
  const teacherName = "Dr. Sarah Chen";
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  const [focusTasks, setFocusTasks] = useState([
    { id: 1, title: 'Grade UNIT2001 Assignments', completed: false },
    { id: 2, title: 'Prepare Lecture Notes', completed: true },
    { id: 3, title: 'Review Student Submissions', completed: false },
  ]);

  const toggleTask = (id: number) => {
    setFocusTasks(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const upcomingEvents = [
    { id: 1, title: 'UNIT2001 Lecture', date: 'Tomorrow 10:00 AM', type: 'lecture' },
    { id: 2, title: 'Office Hours', date: 'Friday 2:00 PM', type: 'office' },
    { id: 3, title: 'Faculty Meeting', date: 'Monday 3:00 PM', type: 'meeting' },
  ];

  const suggestions = [
    'Review student progress reports before office hours',
    'Prepare interactive activities for tomorrow\'s lecture',
    'Send reminders for upcoming assignment deadlines',
  ];

  const dailyQuotes = [
    "Teaching is the greatest act of optimism.",
    "Every student is a story yet to be told.",
    "Education is not preparation for life; education is life itself.",
    "The art of teaching is the art of assisting discovery.",
    "Inspiring minds, one lesson at a time.",
  ];
  const today = new Date();
  const quoteOfTheDay = dailyQuotes[today.getDate() % dailyQuotes.length];

  const [showStatsModal, setShowStatsModal] = useState(false);

  const teachingStats = {
    totalStudents: "156",
    avgAttendance: "92%",
    officeHours: "8h/week",
  };

  const courseStats = {
    activeCourses: "3",
    totalAssignments: "24",
    avgGrade: "B+",
    studentEngagement: "87%",
  };

  const scheduleStats = [
    { title: "UNIT2001 Lecture", date: "Tomorrow 10:00 AM" },
    { title: "Office Hours", date: "Friday 2:00 PM" },
    { title: "Faculty Meeting", date: "Monday 3:00 PM" },
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
              <Text style={styles.heroName}>{teacherName}</Text>
              <Text style={styles.heroRole}>Professor</Text>
            </View>
            <TouchableOpacity onPress={() => setShowStatsModal(true)} style={styles.profileContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2' }}
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
          <Card title="Daily Inspiration">
            <View style={{ paddingVertical: 6, alignItems: 'center' }}>
              <Text style={{ fontSize: 18, fontStyle: 'italic', color: '#6B7280', textAlign: 'center' }}>
                "{quoteOfTheDay}"
              </Text>
            </View>
          </Card>

          <Card title="Teaching Overview">
            <View style={styles.statsRow}>
              <StatCard title="Students" value="156" subtitle="Total" color="#10B981" />
              <StatCard title="Attendance" value="92%" subtitle="Average" color="#3B82F6" />
              <StatCard title="Engagement" value="87%" subtitle="↑ 3%" color="#8B5CF6" />
            </View>
          </Card>

          <Card title="Today's Tasks">
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

          <Card title="Upcoming Schedule">
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

          <Card title="Teaching Tips">
            <View style={styles.suggestionList}>
              {suggestions.map((suggestion, index) => (
                <View key={index} style={styles.suggestionItem}>
                  <Lightbulb size={16} color="#F59E0B" />
                  <Text style={styles.suggestionText}>{suggestion}</Text>
                </View>
              ))}
            </View>
          </Card>

          <Card title="Quick Actions">
            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.actionButton}>
                <GraduationCap size={24} color="#3B82F6" />
                <Text style={styles.actionText}>Grade Assignments</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Users size={24} color="#10B981" />
                <Text style={styles.actionText}>View Students</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <BookOpen size={24} color="#8B5CF6" />
                <Text style={styles.actionText}>Course Materials</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <MessageCircle size={24} color="#F59E0B" />
                <Text style={styles.actionText}>Messages</Text>
              </TouchableOpacity>
            </View>
          </Card>
        </View>
      </ScrollView>

      <Modal
        visible={showStatsModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowStatsModal(false)}
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
              Teaching Statistics
            </Text>
            {/* Teaching Section */}
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Teaching</Text>
            <View style={{ marginBottom: 16 }}>
              <Text>Total Students: {teachingStats.totalStudents}</Text>
              <Text>Avg Attendance: {teachingStats.avgAttendance}</Text>
              <Text>Office Hours: {teachingStats.officeHours}</Text>
            </View>
            {/* Course Section */}
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Courses</Text>
            <View style={{ marginBottom: 16 }}>
              <Text>Active Courses: {courseStats.activeCourses}</Text>
              <Text>Total Assignments: {courseStats.totalAssignments}</Text>
              <Text>Avg Grade: {courseStats.avgGrade}</Text>
              <Text>Student Engagement: {courseStats.studentEngagement}</Text>
            </View>
            {/* Schedule Section */}
            <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Schedule</Text>
            <View style={{ marginBottom: 16 }}>
              {scheduleStats.map((item, idx) => (
                <Text key={idx}>{item.title} — {item.date}</Text>
              ))}
            </View>
            <TouchableOpacity
              onPress={() => setShowStatsModal(false)}
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
    backgroundColor: '#F4FAFA',
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
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  greetingContainer: {
    flex: 1,
  },
  heroGreeting: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
  },
  heroName: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
  heroRole: {
    fontSize: 16,
    color: '#E5E7EB',
    fontFamily: 'Inter-Regular',
    marginTop: 2,
  },
  profileContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  contentSection: {
    flex: 1,
  },
  contentPadding: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  taskList: {
    marginTop: 8,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  taskText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#1F2937',
    fontFamily: 'Inter-Regular',
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: '#6B7280',
  },
  eventList: {
    marginTop: 8,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  eventIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#1F2937',
  },
  eventDate: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  suggestionList: {
    marginTop: 8,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  suggestionText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#F59E0B',
    fontFamily: 'Inter-Medium',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 8,
  },
  actionText: {
    marginTop: 8,
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    textAlign: 'center',
  },
}); 