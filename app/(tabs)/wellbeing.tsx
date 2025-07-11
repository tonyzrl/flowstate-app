import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Card from '@/components/Card';
import MoodSelector from '@/components/MoodSelector';
import MascotPopup from '@/components/MascotPopup';
import { Heart, Headphones, Play, Lightbulb, CircleAlert as AlertCircle, Settings } from 'lucide-react-native';
import { useMascot } from '@/contexts/MascotContext';

export default function WellbeingScreen() {
  const [show360, setShow360] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const [showSounds, setShowSounds] = useState(false);
  const [showMeditation, setShowMeditation] = useState(false);
  const [showMascotPopup, setShowMascotPopup] = useState(false);
  const { mascot, setMascot } = useMascot();
  const recentMoods = [
    { day: 'Mon', mood: '😊', score: 51 },
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
          <View style={styles.mascotSection}>
            <TouchableOpacity
              style={styles.mascotButton}
              onPress={() => setShowMascotPopup(true)}
            >
              <Settings size={20} color="#6B7280" />
              <Text style={styles.mascotButtonText}>Choose Companion</Text>
            </TouchableOpacity>
          </View>
        </Card>

        <Card title="Report Wellbeing to Teacher">
          <View style={styles.reportSection}>
            <View style={styles.reportInfo}>
              <AlertCircle size={20} color="#8B5CF6" />
              <Text style={styles.reportText}>
                Need to talk to your teacher about your wellbeing? Send them a detailed report.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.reportButton}
              onPress={() => router.push('/wellbeing-report')}
            >
              <Text style={styles.reportButtonText}>Report Wellbeing</Text>
            </TouchableOpacity>
          </View>
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
              <TouchableOpacity
                key={option.id}
                style={styles.supportCard}
                onPress={() => {
                  if (option.icon === 'vr') setShow360(true);
                  if (option.icon === 'breathing') setShowBreathing(true);
                  if (option.icon === 'sounds') setShowSounds(true);
                  if (option.icon === 'meditation') setShowMeditation(true);
                }}
              >
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

        {/* 360 Video Player, only shown when show360 is true */}
        {show360 && (
          <Card title="360° Calming Video">
            <View style={{ height: 260, borderRadius: 12, overflow: 'hidden', backgroundColor: '#000', position: 'relative' }}>
              {/* Close button */}
              <TouchableOpacity
                style={{ position: 'absolute', top: 8, right: 8, zIndex: 2, backgroundColor: '#fff', borderRadius: 16, padding: 4 }}
                onPress={() => setShow360(false)}
              >
                <Text style={{ color: '#000', fontWeight: 'bold' }}>X</Text>
              </TouchableOpacity>
              {Platform.OS === 'web' ? (
                <iframe
                  src="/360player.html"
                  width="100%"
                  height="240"
                  style={{ border: 0, borderRadius: 12, width: '100%', height: '100%' }}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="360 Calming Video"
                />
              ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: '#fff', textAlign: 'center' }}>
                    360° video is available on the web version only.
                  </Text>
                </View>
              )}
            </View>
          </Card>
        )}

        {/* Breathing Exercise Video Player, only shown when showBreathing is true */}
        {showBreathing && (
          <Card title="Breathing Exercise Video">
            <View style={{ height: 260, borderRadius: 12, overflow: 'hidden', backgroundColor: '#000', position: 'relative' }}>
              {/* Close button */}
              <TouchableOpacity
                style={{ position: 'absolute', top: 8, right: 8, zIndex: 2, backgroundColor: '#fff', borderRadius: 16, padding: 4 }}
                onPress={() => setShowBreathing(false)}
              >
                <Text style={{ color: '#000', fontWeight: 'bold' }}>X</Text>
              </TouchableOpacity>
              {Platform.OS === 'web' ? (
                <iframe
                  src="https://www.youtube.com/embed/7Ep5mKuRmAA?si=wELPjSiZv3n-fiul&amp;controls=0"
                  width="100%"
                  height="240"
                  style={{ border: 0, borderRadius: 12, width: '100%', height: '100%' }}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Breathing Exercise Video"
                />
              ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: '#fff', textAlign: 'center' }}>
                    Breathing exercise video is available on the web version only.
                  </Text>
                </View>
              )}
            </View>
          </Card>
        )}

        {/* Relaxing Sounds Video Player, only shown when showSounds is true */}
        {showSounds && (
          <Card title="Relaxing Sounds Video">
            <View style={{ height: 260, borderRadius: 12, overflow: 'hidden', backgroundColor: '#000', position: 'relative' }}>
              {/* Close button */}
              <TouchableOpacity
                style={{ position: 'absolute', top: 8, right: 8, zIndex: 2, backgroundColor: '#fff', borderRadius: 16, padding: 4 }}
                onPress={() => setShowSounds(false)}
              >
                <Text style={{ color: '#000', fontWeight: 'bold' }}>X</Text>
              </TouchableOpacity>
              {Platform.OS === 'web' ? (
                <iframe
                  src="https://www.youtube.com/embed/a9qDzUzDS6U?si=sG6SYYdFEz14GItI&amp;controls=0"
                  width="100%"
                  height="240"
                  style={{ border: 0, borderRadius: 12, width: '100%', height: '100%' }}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Relaxing Sounds Video"
                />
              ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: '#fff', textAlign: 'center' }}>
                    Relaxing sounds video is available on the web version only.
                  </Text>
                </View>
              )}
            </View>
          </Card>
        )}

        {/* Guided Meditation Video Player, only shown when showMeditation is true */}
        {showMeditation && (
          <Card title="Guided Meditation Video">
            <View style={{ height: 260, borderRadius: 12, overflow: 'hidden', backgroundColor: '#000', position: 'relative' }}>
              {/* Close button */}
              <TouchableOpacity
                style={{ position: 'absolute', top: 8, right: 8, zIndex: 2, backgroundColor: '#fff', borderRadius: 16, padding: 4 }}
                onPress={() => setShowMeditation(false)}
              >
                <Text style={{ color: '#000', fontWeight: 'bold' }}>X</Text>
              </TouchableOpacity>
              {Platform.OS === 'web' ? (
                <iframe
                  src="https://www.youtube.com/embed/lVx3mFxML80?si=F5gx2aSkE-YRkKSI&amp;controls=0"
                  width="100%"
                  height="240"
                  style={{ border: 0, borderRadius: 12, width: '100%', height: '100%' }}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Guided Meditation Video"
                />
              ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: '#fff', textAlign: 'center' }}>
                    Guided meditation video is available on the web version only.
                  </Text>
                </View>
              )}
            </View>
          </Card>
        )}

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
      
      <MascotPopup
        visible={showMascotPopup}
        onClose={() => setShowMascotPopup(false)}
        onMascotChange={setMascot}
        selectedMascot={mascot}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f2fe',
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
  reportSection: {
    marginTop: 8,
  },
  reportInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  reportText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    marginLeft: 12,
    flex: 1,
    lineHeight: 20,
  },
  reportButton: {
    backgroundColor: '#8B5CF6',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  reportButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  mascotSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  mascotButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  mascotButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginLeft: 8,
  },
});