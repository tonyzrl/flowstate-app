import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '@/components/Card';
import { Calendar as CalendarIcon, Clock, CircleAlert as AlertCircle, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useState } from 'react';

export default function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 1)); // July 2025

  const dailyHighlights = [
    { id: 1, title: 'Physics Exam', time: '10:00 AM', type: 'exam', color: '#EF4444' },
    { id: 2, title: 'Math Tutorial', time: '2:00 PM', type: 'class', color: '#3B82F6' },
    { id: 3, title: 'Study Group', time: '4:30 PM', type: 'meeting', color: '#10B981' },
  ];

  const calendarSuggestions = [
    'Consider spacing out your study sessions more evenly throughout the week.',
    'You have 3 exams next week. Start preparing now to reduce stress.',
    'Schedule regular breaks between back-to-back classes for better focus.',
  ];

  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Get first day of the month and how many days in the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Get today's date for highlighting
    const today = new Date();
    const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
    const todayDate = today.getDate();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ day: null, events: 0, today: false, isEmpty: true });
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      // Simulate some events for demonstration
      const events = Math.floor(Math.random() * 4); // 0-3 events per day
      const isToday = isCurrentMonth && day === todayDate;
      
      days.push({
        day,
        events,
        today: isToday,
        isEmpty: false
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Calendar</Text>
          <Text style={styles.subtitle}>Manage your schedule effectively</Text>
        </View>

        <Card title="Today's Highlights">
          <View style={styles.highlightsList}>
            {dailyHighlights.map((highlight) => (
              <View key={highlight.id} style={styles.highlightItem}>
                <View style={[styles.highlightDot, { backgroundColor: highlight.color }]} />
                <View style={styles.highlightContent}>
                  <Text style={styles.highlightTitle}>{highlight.title}</Text>
                  <View style={styles.highlightTime}>
                    <Clock size={12} color="#6B7280" />
                    <Text style={styles.highlightTimeText}>{highlight.time}</Text>
                  </View>
                </View>
                <View style={[styles.highlightType, { borderColor: highlight.color }]}>
                  <Text style={[styles.highlightTypeText, { color: highlight.color }]}>
                    {highlight.type}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </Card>

        <Card title="Monthly Calendar">
          <View style={styles.calendarHeader}>
            <TouchableOpacity 
              style={styles.navButton} 
              onPress={() => navigateMonth('prev')}
            >
              <ChevronLeft size={20} color="#6B7280" />
            </TouchableOpacity>
            <Text style={styles.calendarMonth}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </Text>
            <TouchableOpacity 
              style={styles.navButton} 
              onPress={() => navigateMonth('next')}
            >
              <ChevronRight size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          {/* Day names header */}
          <View style={styles.dayNamesRow}>
            {dayNames.map((dayName) => (
              <Text key={dayName} style={styles.dayNameText}>
                {dayName}
              </Text>
            ))}
          </View>
          
          {/* Calendar grid */}
          <View style={styles.calendarGrid}>
            {calendarDays.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.calendarDay,
                  day.today && styles.todayDay,
                  day.events > 0 && !day.isEmpty && styles.dayWithEvents,
                  day.isEmpty && styles.emptyDay,
                ]}
                disabled={day.isEmpty}
              >
                {!day.isEmpty && (
                  <>
                    <Text style={[
                      styles.dayText,
                      day.today && styles.todayText,
                    ]}>
                      {day.day}
                    </Text>
                    {day.events > 0 && (
                      <View style={styles.eventDot}>
                        <Text style={styles.eventCount}>{day.events}</Text>
                      </View>
                    )}
                  </>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card title="Upcoming Deadlines">
          <View style={styles.deadlinesList}>
            <View style={styles.deadlineItem}>
              <AlertCircle size={16} color="#EF4444" />
              <View style={styles.deadlineContent}>
                <Text style={styles.deadlineTitle}>Literature Essay</Text>
                <Text style={styles.deadlineDate}>Due in 3 days</Text>
              </View>
            </View>
            <View style={styles.deadlineItem}>
              <AlertCircle size={16} color="#F59E0B" />
              <View style={styles.deadlineContent}>
                <Text style={styles.deadlineTitle}>Chemistry Lab Report</Text>
                <Text style={styles.deadlineDate}>Due in 5 days</Text>
              </View>
            </View>
            <View style={styles.deadlineItem}>
              <AlertCircle size={16} color="#10B981" />
              <View style={styles.deadlineContent}>
                <Text style={styles.deadlineTitle}>Math Problem Set</Text>
                <Text style={styles.deadlineDate}>Due in 1 week</Text>
              </View>
            </View>
          </View>
        </Card>

        <Card title="AI Schedule Insights">
          <View style={styles.suggestionList}>
            {calendarSuggestions.map((suggestion, index) => (
              <View key={index} style={styles.suggestionItem}>
                <Lightbulb size={16} color="#10B981" />
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
  highlightsList: {
    marginTop: 8,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  highlightDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  highlightContent: {
    flex: 1,
  },
  highlightTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  highlightTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  highlightTimeText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 4,
  },
  highlightType: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
  },
  highlightTypeText: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    textTransform: 'uppercase',
  },
  calendarHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  navButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  calendarMonth: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#374151',
  },
  dayNamesRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  dayNameText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    paddingVertical: 8,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%', // 100% / 7 days
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
    borderRadius: 8,
    position: 'relative',
  },
  emptyDay: {
    backgroundColor: 'transparent',
  },
  todayDay: {
    backgroundColor: '#3B82F6',
  },
  dayWithEvents: {
    backgroundColor: '#F3F4F6',
  },
  dayText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  todayText: {
    color: '#FFFFFF',
  },
  eventDot: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 12,
    height: 12,
    backgroundColor: '#EF4444',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventCount: {
    fontSize: 8,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  deadlinesList: {
    marginTop: 8,
  },
  deadlineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  deadlineContent: {
    marginLeft: 12,
    flex: 1,
  },
  deadlineTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
  },
  deadlineDate: {
    fontSize: 12,
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
    backgroundColor: '#ECFDF5',
    borderRadius: 8,
    marginBottom: 8,
  },
  suggestionText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#065F46',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
});