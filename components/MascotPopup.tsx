import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import { MascotType, MascotMood } from './MascotSelector';

interface MascotPopupProps {
  visible: boolean;
  onClose: () => void;
  onMascotChange: (mascot: MascotType) => void;
  selectedMascot: MascotType;
}

// Static mapping for all mascot images
const mascotImages = {
  cat: {
    sad: require('../assets/images/cat/CatSad.png'),
    low: require('../assets/images/cat/CatLow.png'),
    okay: require('../assets/images/cat/CatOkay.png'),
    good: require('../assets/images/cat/CatGood.png'),
    great: require('../assets/images/cat/CatGreat.png'),
  },
  dog: {
    sad: require('../assets/images/dog/DogSad.png'),
    low: require('../assets/images/dog/DogLow.png'),
    okay: require('../assets/images/dog/DogOkay.png'),
    good: require('../assets/images/dog/DogGood.png'),
    great: require('../assets/images/dog/DogGreat.png'),
  },
};

export default function MascotPopup({ 
  visible, 
  onClose, 
  onMascotChange, 
  selectedMascot 
}: MascotPopupProps) {
  const mascots: MascotType[] = ['cat', 'dog'];

  const getMascotImage = (mascot: MascotType, mood: MascotMood) => {
    return mascotImages[mascot][mood];
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <View style={styles.header}>
            <Text style={styles.title}>Choose Your Companion</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.description}>
            Select your mascot companion. Their mood will match your current wellbeing state.
          </Text>

          <View style={styles.mascotContainer}>
            {mascots.map((mascot) => (
              <TouchableOpacity
                key={mascot}
                style={[
                  styles.mascotButton,
                  selectedMascot === mascot && styles.selectedMascot
                ]}
                onPress={() => onMascotChange(mascot)}
              >
                <Image
                  source={getMascotImage(mascot, 'good')}
                  style={styles.mascotImage}
                  resizeMode="contain"
                />
                <Text style={[
                  styles.mascotText,
                  selectedMascot === mascot && styles.selectedMascotText
                ]}>
                  {mascot.charAt(0).toUpperCase() + mascot.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.note}>
            Your companion's mood will automatically sync with your wellbeing selection above.
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    margin: 20,
    width: '90%',
    maxWidth: 400,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 24,
  },
  mascotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  mascotButton: {
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    minWidth: 120,
  },
  selectedMascot: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  mascotImage: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  mascotText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  selectedMascotText: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  note: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    fontStyle: 'italic',
  },
}); 