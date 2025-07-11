import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { router } from 'expo-router';
import Card from '@/components/Card';
import FormattedText from '@/components/FormattedText';
import { Send, Bot, User, Users, GraduationCap, Lightbulb, Plus, X, Brain, BookOpen, Heart, Maximize2, Minimize2 } from 'lucide-react-native';
import { getWellbeingInsights, getStudyTips, getTimeManagementTips, getFocusTips, testHuggingFaceAPI } from '@/services/api';

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I\'m your AI study assistant. I can help you with:\n\n📚 Study tips and techniques\n💚 Wellbeing and mental health support\n⏰ Time management strategies\n\nWhat would you like to work on today?', sender: 'ai' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFullscreenChat, setShowFullscreenChat] = useState(false);
  const [fullscreenMessage, setFullscreenMessage] = useState('');

  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    role: '',
    type: 'student'
  });

  const [contacts, setContacts] = useState([
    { id: 1, name: 'Sarah Chen', role: 'Study Partner', status: 'online', type: 'student' },
    { id: 2, name: 'Ray Johnson', role: 'UNIT2001 Tutor', status: 'offline', type: 'tutor' },
    { id: 3, name: 'Dr. Mike Rodriguez', role: 'Course Coordinator', status: 'online', type: 'teacher' },
    { id: 4, name: 'UNIT2001 Study Group', role: '21 members', status: 'active', type: 'group' },
  ]);

  const contactTypes = [
    { label: 'All', value: null },
    { label: 'Student', value: 'student' },
    { label: 'Tutor', value: 'tutor' },
    { label: 'Teacher', value: 'teacher' },
    { label: 'Group', value: 'group' },
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase()) &&
    (!selectedType || contact.type === selectedType)
  );

  const suggestedContacts = [
    { id: 1, name: 'Assc. Prof. Emma Wilson', role: 'UNIT3034 Lecturer', type: 'staff' },
    { id: 2, name: 'Dr. Jason Smith', role: 'Academic Advisor', type: 'staff' },
    { id: 3, name: 'Alex Kim', role: 'UNIT2001 Study Group', type: 'student' },
  ];

  const chatSuggestions = [
    'Ask about effective study techniques for your upcoming exams',
    'Get help with creating a balanced study schedule',
    'Find study partners for your difficult subjects',
  ];

  const sendMessage = async () => {
    if (message.trim() && !isLoading) {
      const userMessage = message.trim();
      setMessages(prev => [...prev, { id: prev.length + 1, text: userMessage, sender: 'user' }]);
      setMessage('');
      setIsLoading(true);

      try {
        let aiResponse = '';
        
        // Analyze the message content to determine the type of help needed
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('study') || lowerMessage.includes('learn') || lowerMessage.includes('exam') || 
            lowerMessage.includes('math') || lowerMessage.includes('science') || lowerMessage.includes('subject') ||
            lowerMessage.includes('tips') || lowerMessage.includes('technique')) {
          // Get study tips
          const subject = lowerMessage.includes('math') ? 'Mathematics' : 
                         lowerMessage.includes('science') ? 'Science' : 
                         lowerMessage.includes('english') ? 'English' :
                         lowerMessage.includes('history') ? 'History' :
                         lowerMessage.includes('physics') ? 'Physics' :
                         lowerMessage.includes('chemistry') ? 'Chemistry' :
                         lowerMessage.includes('biology') ? 'Biology' : 'General Studies';
          const difficulty = lowerMessage.includes('hard') || lowerMessage.includes('difficult') ? 'advanced' :
                           lowerMessage.includes('easy') || lowerMessage.includes('beginner') ? 'beginner' : 'intermediate';
          aiResponse = await getStudyTips(subject, difficulty, userMessage);
        } else if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety') || 
                   lowerMessage.includes('mood') || lowerMessage.includes('mental') || 
                   lowerMessage.includes('tired') || lowerMessage.includes('overwhelmed') ||
                   lowerMessage.includes('depressed') || lowerMessage.includes('sad') ||
                   lowerMessage.includes('worried') || lowerMessage.includes('frustrated')) {
          // Get wellbeing insights
          aiResponse = await getWellbeingInsights(
            `User mentioned: ${userMessage}`,
            'Based on recent study patterns and mood indicators',
            userMessage
          );
        } else if (lowerMessage.includes('time') || lowerMessage.includes('schedule') || 
                   lowerMessage.includes('busy') || lowerMessage.includes('manage') ||
                   lowerMessage.includes('organize') || lowerMessage.includes('planning') ||
                   lowerMessage.includes('pomodoro') || lowerMessage.includes('productivity')) {
          // Time management advice
          aiResponse = await getTimeManagementTips(userMessage);
        } else if (lowerMessage.includes('focus') || lowerMessage.includes('concentration') ||
                   lowerMessage.includes('distracted') || lowerMessage.includes('attention') ||
                   lowerMessage.includes('mind') || lowerMessage.includes('zone')) {
          // Focus tips
          aiResponse = await getFocusTips(userMessage);
        } else {
          // Use the test API for general responses
          aiResponse = await testHuggingFaceAPI(userMessage);
        }

        setMessages(prev => [...prev, { 
          id: prev.length + 1, 
          text: aiResponse, 
          sender: 'ai' 
        }]);
      } catch (error) {
        console.error('AI Response Error:', error);
        setMessages(prev => [...prev, { 
          id: prev.length + 1, 
          text: 'I apologize, but I\'m having trouble processing your request right now. Please try again in a moment, or ask me about study tips, wellbeing, time management, or focus strategies.', 
          sender: 'ai' 
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const sendFullscreenMessage = async () => {
    if (fullscreenMessage.trim() && !isLoading) {
      const userMessage = fullscreenMessage.trim();
      setMessages(prev => [...prev, { id: prev.length + 1, text: userMessage, sender: 'user' }]);
      setFullscreenMessage('');
      setIsLoading(true);

      try {
        let aiResponse = '';
        
        // Analyze the message content to determine the type of help needed
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('study') || lowerMessage.includes('learn') || lowerMessage.includes('exam') || 
            lowerMessage.includes('math') || lowerMessage.includes('science') || lowerMessage.includes('subject') ||
            lowerMessage.includes('tips') || lowerMessage.includes('technique')) {
          // Get study tips
          const subject = lowerMessage.includes('math') ? 'Mathematics' : 
                         lowerMessage.includes('science') ? 'Science' : 
                         lowerMessage.includes('english') ? 'English' :
                         lowerMessage.includes('history') ? 'History' :
                         lowerMessage.includes('physics') ? 'Physics' :
                         lowerMessage.includes('chemistry') ? 'Chemistry' :
                         lowerMessage.includes('biology') ? 'Biology' : 'General Studies';
          const difficulty = lowerMessage.includes('hard') || lowerMessage.includes('difficult') ? 'advanced' :
                           lowerMessage.includes('easy') || lowerMessage.includes('beginner') ? 'beginner' : 'intermediate';
          aiResponse = await getStudyTips(subject, difficulty, userMessage);
        } else if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety') || 
                   lowerMessage.includes('mood') || lowerMessage.includes('mental') || 
                   lowerMessage.includes('tired') || lowerMessage.includes('overwhelmed') ||
                   lowerMessage.includes('depressed') || lowerMessage.includes('sad') ||
                   lowerMessage.includes('worried') || lowerMessage.includes('frustrated')) {
          // Get wellbeing insights
          aiResponse = await getWellbeingInsights(
            `User mentioned: ${userMessage}`,
            'Based on recent study patterns and mood indicators',
            userMessage
          );
        } else if (lowerMessage.includes('time') || lowerMessage.includes('schedule') || 
                   lowerMessage.includes('busy') || lowerMessage.includes('manage') ||
                   lowerMessage.includes('organize') || lowerMessage.includes('planning') ||
                   lowerMessage.includes('pomodoro') || lowerMessage.includes('productivity')) {
          // Time management advice
          aiResponse = await getTimeManagementTips(userMessage);
        } else if (lowerMessage.includes('focus') || lowerMessage.includes('concentration') ||
                   lowerMessage.includes('distracted') || lowerMessage.includes('attention') ||
                   lowerMessage.includes('mind') || lowerMessage.includes('zone')) {
          // Focus tips
          aiResponse = await getFocusTips(userMessage);
        } else {
          // Use the test API for general responses
          aiResponse = await testHuggingFaceAPI(userMessage);
        }

        setMessages(prev => [...prev, { 
          id: prev.length + 1, 
          text: aiResponse, 
          sender: 'ai' 
        }]);
      } catch (error) {
        console.error('AI Response Error:', error);
        setMessages(prev => [...prev, { 
          id: prev.length + 1, 
          text: 'I apologize, but I\'m having trouble processing your request right now. Please try again in a moment, or ask me about study tips, wellbeing, time management, or focus strategies.', 
          sender: 'ai' 
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const addContact = () => {
    if (newContact.name.trim() && newContact.role.trim()) {
      // Add the new contact to the contacts array
      const contact = {
        id: contacts.length + 1,
        name: newContact.name,
        role: newContact.role,
        status: 'offline',
        type: newContact.type
      };
      setContacts([...contacts, contact]);
      
      // Reset form and close modal
      setNewContact({ name: '', role: '', type: 'student' });
      setShowAddModal(false);
    }
  };

  const navigateToTeacherView = () => {
    router.push('/teacher-view' as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Chat</Text>
          <Text style={styles.subtitle}>Connect and get AI assistance</Text>
        </View>

        <Card title="AI Study Assistant">
          <View style={styles.chatHeader}>
            <Text style={styles.chatSubtitle}>Connect and get AI assistance</Text>
            <TouchableOpacity 
              style={styles.fullscreenButton}
              onPress={() => setShowFullscreenChat(true)}
            >
              <Maximize2 size={20} color="#3B82F6" />
            </TouchableOpacity>
          </View>
          <View style={styles.chatContainer}>
            <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
              {messages.map((msg) => (
                <View key={msg.id} style={[
                  styles.messageItem,
                  msg.sender === 'user' ? styles.userMessage : styles.aiMessage
                ]}>
                  <View style={styles.messageIcon}>
                    {msg.sender === 'ai' ? (
                      <Bot size={16} color="#3B82F6" />
                    ) : (
                      <User size={16} color="#6B7280" />
                    )}
                  </View>
                  {msg.sender === 'ai' ? (
                    <View style={[styles.messageText, styles.aiMessageText]}>
                      <FormattedText text={msg.text} />
                    </View>
                  ) : (
                    <Text style={[
                      styles.messageText,
                      styles.userMessageText
                    ]}>
                      {msg.text}
                    </Text>
                  )}
                </View>
              ))}
              {isLoading && (
                <View style={[styles.messageItem, styles.aiMessage]}>
                  <View style={styles.messageIcon}>
                    <Bot size={16} color="#3B82F6" />
                  </View>
                  <View style={[styles.messageText, styles.aiMessageText]}>
                    <FormattedText text="Thinking..." />
                  </View>
                </View>
              )}
            </ScrollView>
            
            {/* Quick Action Buttons */}
            <View style={styles.quickActions}>
              <TouchableOpacity 
                style={styles.quickActionButton}
                onPress={async () => {
                  setIsLoading(true);
                  try {
                    const studyTips = await getStudyTips('General Studies', 'intermediate', 'I need general study tips');
                    setMessages(prev => [...prev, { 
                      id: prev.length + 1, 
                      text: studyTips, 
                      sender: 'ai' 
                    }]);
                  } catch {
                    setMessages(prev => [...prev, { 
                      id: prev.length + 1, 
                      text: 'Failed to get study tips. Please try again.', 
                      sender: 'ai' 
                    }]);
                  } finally {
                    setIsLoading(false);
                  }
                }}
              >
                <BookOpen size={16} color="#3B82F6" />
                <Text style={styles.quickActionText}>Study Tips</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.quickActionButton}
                onPress={async () => {
                  setIsLoading(true);
                  try {
                    const wellbeingTips = await getWellbeingInsights(
                      'User is feeling stressed about exams',
                      'Recent study patterns show increased anxiety',
                      'I\'m feeling stressed about my upcoming exams'
                    );
                    setMessages(prev => [...prev, { 
                      id: prev.length + 1, 
                      text: wellbeingTips, 
                      sender: 'ai' 
                    }]);
                  } catch {
                    setMessages(prev => [...prev, { 
                      id: prev.length + 1, 
                      text: 'Failed to get wellbeing tips. Please try again.', 
                      sender: 'ai' 
                    }]);
                  } finally {
                    setIsLoading(false);
                  }
                }}
              >
                <Heart size={16} color="#10B981" />
                <Text style={styles.quickActionText}>Wellbeing</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.quickActionButton}
                onPress={async () => {
                  setIsLoading(true);
                  try {
                    const timeTips = await getTimeManagementTips('I need help managing my study time better');
                    setMessages(prev => [...prev, { 
                      id: prev.length + 1, 
                      text: timeTips, 
                      sender: 'ai' 
                    }]);
                  } catch {
                    setMessages(prev => [...prev, { 
                      id: prev.length + 1, 
                      text: 'Failed to get time management tips. Please try again.', 
                      sender: 'ai' 
                    }]);
                  } finally {
                    setIsLoading(false);
                  }
                }}
              >
                <Brain size={16} color="#8B5CF6" />
                <Text style={styles.quickActionText}>Time Management</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.quickActionButton}
                onPress={async () => {
                  setIsLoading(true);
                  try {
                    const focusTips = await getFocusTips('I need help staying focused while studying');
                    setMessages(prev => [...prev, { 
                      id: prev.length + 1, 
                      text: focusTips, 
                      sender: 'ai' 
                    }]);
                  } catch (error) {
                    setMessages(prev => [...prev, { 
                      id: prev.length + 1, 
                      text: 'Failed to get focus tips. Please try again.', 
                      sender: 'ai' 
                    }]);
                  } finally {
                    setIsLoading(false);
                  }
                }}
              >
                <Bot size={16} color="#F59E0B" />
                <Text style={styles.quickActionText}>Focus Tips</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Ask me anything..."
                value={message}
                onChangeText={setMessage}
                multiline
              />
              <TouchableOpacity 
                style={[styles.sendButton, isLoading && styles.sendButtonDisabled]} 
                onPress={sendMessage}
                disabled={isLoading}
              >
                <Send size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        <Card title="Your Contacts">
          {/* Header with Add Button */}
          <View style={styles.contactsHeader}>
            <TextInput
              placeholder="Search contacts..."
              value={search}
              onChangeText={setSearch}
              style={{
                flex: 1,
                height: 40,
                borderColor: '#ccc',
                borderWidth: 1,
                borderRadius: 8,
                paddingHorizontal: 10,
                marginRight: 12,
              }}
            />
            <TouchableOpacity 
              style={styles.addContactButton}
              onPress={() => setShowAddModal(true)}
            >
              <Plus size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          {/* Filter Buttons */}
          <View style={{ flexDirection: 'row', marginBottom: 12 }}>
            {contactTypes.map(type => (
              <TouchableOpacity
                key={type.label}
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 14,
                  borderRadius: 16,
                  backgroundColor: selectedType === type.value || (type.value === null && !selectedType) ? '#3B82F6' : '#E5E7EB',
                  marginRight: 8,
                }}
                onPress={() => setSelectedType(type.value)}
              >
                <Text style={{
                  color: selectedType === type.value || (type.value === null && !selectedType) ? '#fff' : '#1F2937',
                  fontSize: 14,
                }}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Contacts List */}
          <View style={styles.contactsList}>
            {filteredContacts.map((contact) => (
              <TouchableOpacity key={contact.id} style={styles.contactItem}>
                <View style={styles.contactIcon}>
                  {contact.type === 'student' && <User size={20} color="#3B82F6" />}
                  {contact.type === 'teacher' && <GraduationCap size={20} color="#10B981" />}
                  {contact.type === 'tutor' && <GraduationCap size={20} color="#F59E0B" />}
                  {contact.type === 'group' && <Users size={20} color="#8B5CF6" />}
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactRole}>{contact.role}</Text>
                </View>
                <View style={[
                  styles.statusDot,
                  { backgroundColor: contact.status === 'online' || contact.status === 'active' ? '#10B981' : '#6B7280' }
                ]} />
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card title="Suggested Connections">
          <View style={styles.suggestedList}>
            {suggestedContacts.map((contact) => (
              <TouchableOpacity key={contact.id} style={styles.suggestedItem}>
                <View style={styles.suggestedIcon}>
                  {contact.type === 'student' && <User size={16} color="#3B82F6" />}
                  {contact.type === 'staff' && <GraduationCap size={16} color="#10B981" />}
                  {contact.type === 'group' && <Users size={16} color="#8B5CF6" />}
                </View>
                <View style={styles.suggestedInfo}>
                  <Text style={styles.suggestedName}>{contact.name}</Text>
                  <Text style={styles.suggestedRole}>{contact.role}</Text>
                </View>
                <TouchableOpacity style={styles.connectButton}>
                  <Text style={styles.connectButtonText}>Connect</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card title="Chat Suggestions">
          <View style={styles.suggestionList}>
            {chatSuggestions.map((suggestion, index) => (
              <TouchableOpacity key={index} style={styles.suggestionItem}>
                <Lightbulb size={16} color="#F59E0B" />
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card title="View Options">
          <TouchableOpacity style={styles.swapButton} onPress={navigateToTeacherView}>
            <Text style={styles.swapButtonText}>Swap to Teacher View</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>

      {/* Fullscreen Chat Modal */}
      <Modal
        visible={showFullscreenChat}
        animationType="slide"
        onRequestClose={() => setShowFullscreenChat(false)}
      >
        <SafeAreaView style={styles.fullscreenContainer}>
          <View style={styles.fullscreenHeader}>
            <Text style={styles.fullscreenTitle}>AI Study Assistant</Text>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowFullscreenChat(false)}
            >
              <Minimize2 size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.fullscreenChatContainer}>
            <ScrollView style={styles.fullscreenMessagesContainer} showsVerticalScrollIndicator={false}>
              {messages.map((msg) => (
                <View key={msg.id} style={[
                  styles.fullscreenMessageItem,
                  msg.sender === 'user' ? styles.fullscreenUserMessage : styles.fullscreenAiMessage
                ]}>
                  <View style={styles.fullscreenMessageIcon}>
                    {msg.sender === 'ai' ? (
                      <Bot size={20} color="#3B82F6" />
                    ) : (
                      <User size={20} color="#6B7280" />
                    )}
                  </View>
                  {msg.sender === 'ai' ? (
                    <View style={[styles.fullscreenMessageText, styles.fullscreenAiMessageText]}>
                      <FormattedText text={msg.text} />
                    </View>
                  ) : (
                    <Text style={[
                      styles.fullscreenMessageText,
                      styles.fullscreenUserMessageText
                    ]}>
                      {msg.text}
                    </Text>
                  )}
                </View>
              ))}
              {isLoading && (
                <View style={[styles.fullscreenMessageItem, styles.fullscreenAiMessage]}>
                  <View style={styles.fullscreenMessageIcon}>
                    <Bot size={20} color="#3B82F6" />
                  </View>
                  <View style={[styles.fullscreenMessageText, styles.fullscreenAiMessageText]}>
                    <FormattedText text="Thinking..." />
                  </View>
                </View>
              )}
            </ScrollView>
            
            <View style={styles.fullscreenInputContainer}>
              <TextInput
                style={styles.fullscreenTextInput}
                placeholder="Ask me anything..."
                value={fullscreenMessage}
                onChangeText={setFullscreenMessage}
                multiline
              />
              <TouchableOpacity 
                style={[styles.fullscreenSendButton, isLoading && styles.sendButtonDisabled]} 
                onPress={sendFullscreenMessage}
                disabled={isLoading}
              >
                <Send size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Add Contact Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Contact</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <X size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            
            <TextInput
              style={styles.modalInput}
              placeholder="Name"
              value={newContact.name}
              onChangeText={(text) => setNewContact({...newContact, name: text})}
            />
            
            <TextInput
              style={styles.modalInput}
              placeholder="Role"
              value={newContact.role}
              onChangeText={(text) => setNewContact({...newContact, role: text})}
            />
            
            <Text style={styles.modalLabel}>Icon Type:</Text>
            <View style={styles.iconTypeContainer}>
              {[
                { type: 'student', icon: <User size={20} color="#3B82F6" />, label: 'Student' },
                { type: 'teacher', icon: <GraduationCap size={20} color="#10B981" />, label: 'Teacher' },
                { type: 'tutor', icon: <GraduationCap size={20} color="#F59E0B" />, label: 'Tutor' },
                { type: 'group', icon: <Users size={20} color="#8B5CF6" />, label: 'Group' },
              ].map((item) => (
                <TouchableOpacity
                  key={item.type}
                  style={[
                    styles.iconTypeButton,
                    newContact.type === item.type && styles.selectedIconType
                  ]}
                  onPress={() => setNewContact({...newContact, type: item.type})}
                >
                  {item.icon}
                  <Text style={[
                    styles.iconTypeLabel,
                    newContact.type === item.type && styles.selectedIconTypeLabel
                  ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <TouchableOpacity 
              style={styles.addButton}
              onPress={addContact}
            >
              <Text style={styles.addButtonText}>Add Contact</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  chatSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  fullscreenButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  chatContainer: {
    height: 300,
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 16,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  userMessage: {
    flexDirection: 'row-reverse',
  },
  aiMessage: {
    flexDirection: 'row',
  },
  messageIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  messageText: {
    flex: 1,
    fontSize: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    maxWidth: '80%',
  },
  userMessageText: {
    backgroundColor: '#E0E7FF',
    color: '#3730A3',
    textAlign: 'right',
  },
  aiMessageText: {
    backgroundColor: '#F3F4F6',
    color: '#1F2937',
    textAlign: 'left',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 80,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 8,
    textAlignVertical: 'center',
  },
  sendButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  quickActionText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginLeft: 4,
  },
  contactsList: {
    marginTop: 4,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  contactIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: '#1F2937',
  },
  contactRole: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 8,
  },
  suggestedList: {
    marginTop: 4,
  },
  suggestedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  suggestedIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  suggestedInfo: {
    flex: 1,
  },
  suggestedName: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#1F2937',
  },
  suggestedRole: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  connectButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: 'Inter-Medium',
  },
  suggestionList: {
    marginTop: 4,
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
  contactsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  addContactButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  modalInput: {
    height: 48,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  modalLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginBottom: 12,
  },
  iconTypeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  iconTypeButton: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 8,
  },
  selectedIconType: {
    backgroundColor: '#EBF8FF',
    borderColor: '#3B82F6',
  },
  iconTypeLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginTop: 4,
  },
  selectedIconTypeLabel: {
    color: '#3B82F6',
  },
  addButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  swapButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  swapButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  fullscreenHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  fullscreenTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
  },
  closeButton: {
    padding: 8,
  },
  fullscreenChatContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  fullscreenMessagesContainer: {
    flex: 1,
    marginBottom: 16,
  },
  fullscreenMessageItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  fullscreenUserMessage: {
    flexDirection: 'row-reverse',
  },
  fullscreenAiMessage: {
    flexDirection: 'row',
  },
  fullscreenMessageIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  fullscreenMessageText: {
    flex: 1,
    fontSize: 15,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    maxWidth: '80%',
  },
  fullscreenUserMessageText: {
    backgroundColor: '#E0E7FF',
    color: '#3730A3',
    textAlign: 'right',
  },
  fullscreenAiMessageText: {
    backgroundColor: '#F3F4F6',
    color: '#1F2937',
    textAlign: 'left',
  },
  fullscreenInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  fullscreenTextInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 80,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 8,
    textAlignVertical: 'center',
  },
  fullscreenSendButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});