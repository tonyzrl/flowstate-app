import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Send, ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';

export default function Unit2001GroupScreen() {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Alice', text: 'Hey everyone! Anyone else struggling with the last assignment?' },
    { id: 2, sender: 'Bob', text: 'Yes! The time management part is tough for me.' },
    { id: 3, sender: 'Charlie', text: 'Let’s share tips and help each other out!' },
  ]);
  const [input, setInput] = useState('');

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
        <ArrowLeft size={20} color="#3B82F6" />
        <Text style={styles.backButtonText}>Back to Chat</Text>
      </TouchableOpacity>
      <Text style={styles.title}>UNIT2001 Study Group Board</Text>
      <Text style={styles.subtitle}>Collaborate with your peers on study issues and tips</Text>
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
    backgroundColor: '#F4FAFA',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  backButtonText: {
    color: '#3B82F6',
    fontSize: 16,
    marginLeft: 4,
    fontFamily: 'Inter-Medium',
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 16,
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