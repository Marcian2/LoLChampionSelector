import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useEconomy } from '../context/EconomyContext';

export const CurrencyDisplay = () => {
  const { essence } = useEconomy();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🔷</Text>
      </View>
      <Text style={styles.amount}>{essence}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(9, 20, 40, 0.8)',
    borderRadius: 20,
    paddingRight: 12,
    paddingLeft: 4,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#0AC8B9', // Hextech Blue-ish
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  icon: {
    fontSize: 14,
  },
  amount: {
    color: '#0AC8B9',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
  }
});
