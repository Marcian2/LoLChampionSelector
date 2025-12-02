// src/components/HextechButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface HextechButtonProps {
  text: string;
  onPress: () => void;
  variant?: 'primary' | 'gold';
}

export const HextechButton = ({ text, onPress, variant = 'primary' }: HextechButtonProps) => {
  
  // Choose background color based on variant
  const backgroundColor = variant === 'primary' ? '#6bbb2eff' : '#4f0c0cff';

  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor }]} 
      onPress={onPress}
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginTop: 20,
    alignItems: 'center',
  },
  text: {
    color: '#000000ff', 
    fontSize: 16,
    fontWeight: 'bold',
  }
});