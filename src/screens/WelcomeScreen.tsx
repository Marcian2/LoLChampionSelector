import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Image } from 'react-native';
import { HextechCard } from '../components/HextechCard';
import { HextechButton } from '../components/HextechButton';

interface WelcomeScreenProps {
    onStartLaneQuiz: () => void;
    onStartChampionQuiz: () => void;
}

export const WelcomeScreen = ({ onStartLaneQuiz, onStartChampionQuiz }: WelcomeScreenProps) =>{
    return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.headerContainer}>
        <Text style={styles.title}>LEAGUE OF</Text>
        <Text style={styles.subtitle}>SELECTOR</Text>
      </View>

      <HextechCard>
        <Text style={styles.cardTitle}>Choose Your Path</Text>
        <Text style={styles.description}>
          New to the game? Find out where you belong on the Rift.
        </Text>
        
        <HextechButton 
          text="Find My Lane" 
          onPress={onStartLaneQuiz} 
          variant="primary" 
        />
        
        <Text style={styles.orText}>- OR -</Text>

        <HextechButton 
          text="Find My Champion" 
          onPress={onStartChampionQuiz} 
          variant="gold" 
        />
      </HextechCard>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    padding: 20,
  },
  headerContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#F0E6D2',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 40,
    color: '#C8AA6E', // Gold
    fontWeight: '800',
    letterSpacing: 4,
    marginTop: -5,
  },
  cardTitle: {
    fontSize: 22,
    color: '#F0E6D2',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  orText: {
    color: '#555',
    textAlign: 'center',
    marginVertical: 15,
    fontWeight: 'bold',
  }
});