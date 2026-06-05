import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

interface HextechCardProps {
  children: ReactNode;
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
    backgroundColor: '#1E2328', // The official "LoL Client" panel color
    padding: 25,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#C8AA6E',     // Gold Border
    // Shadows
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  }
});