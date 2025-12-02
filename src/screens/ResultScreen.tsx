import React from 'react';
import { StyleSheet, Text, SafeAreaView, Image } from 'react-native'; // Added Image
import { HextechCard } from '../components/HextechCard';
import { HextechButton } from '../components/HextechButton';

interface ResultScreenProps {
  winnerLane: string;
  winnerScore: string | number;
  heroImage?: string; // <--- This MUST be here to accept the prop from App.tsx
  onRestart: () => void;
}

export const ResultScreen = ({ winnerLane, winnerScore, heroImage, onRestart }: ResultScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <HextechCard>
        <Text style={styles.resultTitle}>Your Result:</Text>
        
        {/* Only show image if one was passed */}
        {heroImage && (
          <Image 
            source={{ uri: heroImage }} 
            style={styles.championImage} 
            resizeMode="cover"
          />
        )}

        <Text style={styles.winnerText}>{winnerLane}</Text>
        <Text style={styles.scoreText}>{winnerScore}</Text>
        
        <HextechButton 
          text="Try Again" 
          onPress={onRestart} 
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  resultTitle: {
    fontSize: 22,
    color: '#F0E6D2',
    textAlign: 'center',
    marginBottom: 10,
  },
  championImage: {
    width: 200,
    height: 300,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#C8AA6E',
  },
  winnerText: {
    fontSize: 32, // Slightly smaller to fit image
    color: '#C8AA6E',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  scoreText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
});