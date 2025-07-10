import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import Card from '@/components/Card';
import { Send, Bot, User, Users, GraduationCap, Lightbulb } from 'lucide-react-native';

export default function ChatScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I\'m your AI study assistant. How can I help you today?', sender: 'ai' },
    { id: 2, text: 'I\'m struggling with time management', sender: 'user' },
    { id: 3, text: 'I understand. Based on your study patterns, I suggest using the Pomodoro Technique. Would you like me to create a personalized schedule for you?', sender: 'ai' },
  ]);

  const [search, setSearch] = useState(''); // <-- Added for search bar

  const contacts = [
    { id: 1, name: 'Sarah Chen', role: 'Study Partner', status: 'online', type: 'student' },
    { id: 2, name: 'Ray Johnson', role: 'UNIT2001 Tutor', status: 'offline', type: 'tutor' },
    { id: 3, name: 'Dr. Mike Rodriguez', role: 'Course Coordinator', status: 'online', type: 'teacher' },
    { id: 4, name: 'UNIT2001 Study Group', role: '21 members', status: 'active', type: 'group' },
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  ); // <-- Filter contacts by search

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

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: message, sender: 'user' }]);
      setMessage('');
      
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: prev.length + 1, 
          text: 'I\'m here to help! Let me analyze your study patterns and provide personalised recommendations.', 
          sender: 'ai' 
        }]);
      }, 1000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Chat</Text>
          <Text style={styles.subtitle}>Connect and get AI assistance</Text>
        </View>

        <Card title="AI Study Assistant">
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
                  <Text style={[
                    styles.messageText,
                    msg.sender === 'user' ? styles.userMessageText : styles.aiMessageText
                  ]}>
                    {msg.text}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Ask me anything about studying..."
                value={message}
                onChangeText={setMessage}
                multiline
              />
              <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                <Send size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </Card>

        <Card title="Your Contacts">
          {/* Search Bar for Contacts */}
          <TextInput
            placeholder="Search contacts..."
            value={search}
            onChangeText={setSearch}
            style={{
              height: 40,
              borderColor: '#ccc',
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 10,
              marginBottom: 12,
            }}
          />
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
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
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
});