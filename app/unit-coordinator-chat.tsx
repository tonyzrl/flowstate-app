import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Send, Video } from 'lucide-react-native';
import { router } from 'expo-router';

export default function UnitCoordinatorChat() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Dr. Mike Rodriguez', text: 'Hi! Let me know if you have any questions about the unit or assessments.' },
    { id: 2, sender: 'You', text: 'Thank you, Dr. Rodriguez! I wanted to ask about the last assignment.' },
  ]);
  const [input, setInput] = useState('');
  const [showPopup, setShowPopup] = useState(true);

  const sendMessage = () => {
    if (input.trim()) {
      setMessages(prev => [
        ...prev,
        { id: prev.length + 1, sender: 'You', text: input.trim() }
      ]);
      setInput('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>{'< Back to Chat'}</Text>
      </TouchableOpacity>
      {showPopup && (
        <View style={styles.popup}>
          <Video size={18} color="#3B82F6" />
          <Text style={styles.popupText}>You have new video feedback</Text>
          <TouchableOpacity onPress={() => setShowPopup(false)} style={styles.popupClose}>
            <Text style={styles.popupCloseText}>×</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.title}>Chat with Dr. Mike Rodriguez</Text>
      <Text style={styles.subtitle}>Unit Coordinator</Text>
      <View style={styles.boardContainer}>
        <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
          {messages.map(msg => (
            <View key={msg.id} style={styles.messageItem}>
              <View style={styles.icon}><User size={18} color="#3B82F6" /></View>
              <View style={styles.messageContent}>
                <Text style={styles.sender}>{msg.sender}:</Text>
                <Text style={styles.text}>{msg.text}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type your message..."
            value={input}
            onChangeText={setInput}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Send size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 8,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  backButtonText: {
    color: '#3B82F6',
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  popup: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E7FF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    alignSelf: 'center',
    marginTop: 4,
  },
  popupText: {
    color: '#3B82F6',
    fontSize: 15,
    marginLeft: 8,
    fontFamily: 'Inter-Medium',
  },
  popupClose: {
    marginLeft: 12,
    padding: 4,
  },
  popupCloseText: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 16,
    textAlign: 'center',
  },
  boardContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 12,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  icon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  messageContent: {
    flex: 1,
  },
  sender: {
    fontWeight: 'bold',
    color: '#3B82F6',
    fontSize: 14,
  },
  text: {
    fontSize: 15,
    color: '#1F2937',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 8,
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 80,
    backgroundColor: '#F3F4F6',
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
}); 