// src/components/HextechCard.tsx
import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

interface HextechCardProps {
  children: ReactNode; // This means it can accept other components inside it
}

export const HextechCard = ({ children }: HextechCardProps) => {
  return (
    <View style={styles.card}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#266cb2ff', // LoL Hextech Blue-Grey
    padding: 25,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1c1c3eff',
    // Shadows
    shadowColor: "#240404ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  }
});