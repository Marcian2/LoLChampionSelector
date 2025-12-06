import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface HextechButtonProps {
  text: string;
  onPress: () => void;
  variant?: 'primary' | 'gold';
  disabled?: boolean;
}

export const HextechButton = ({ text, onPress, variant = 'primary', disabled }: HextechButtonProps) => {
  
  // Logic: 
  // Primary = Dark Blue button with Cyan Border (Magic look)
  // Gold = Solid Gold button (Prestige look)
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        isPrimary ? styles.primaryButton : styles.goldButton,
        disabled && styles.disabled
      ]} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[
        styles.text, 
        isPrimary ? styles.primaryText : styles.goldText
      ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 4, // LoL UI usually has small corner radius, not round
    marginTop: 15,
    alignItems: 'center',
    borderWidth: 1,
  },
  disabled: {
    opacity: 0.5,
  },
  // VARIANT: PRIMARY (Hextech Magic)
  primaryButton: {
    backgroundColor: '#1E2328', // Dark Panel
    borderColor: '#0AC8B9',     // Cyan Border
  },
  primaryText: {
    color: '#0AC8B9',           // Cyan Text
  },
  // VARIANT: GOLD (Prestige/Confirm)
  goldButton: {
    backgroundColor: '#C8AA6E', // Solid Gold
    borderColor: '#F0E6D2',     // Light Gold Border
  },
  goldText: {
    color: '#091428',           // Dark Navy Text (High Contrast)
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase', // LoL buttons are usually uppercase
    letterSpacing: 1,
  }
});
