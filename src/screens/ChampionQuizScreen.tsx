// src/screens/ChampionQuizScreen.tsx
import React from 'react';
import { StyleSheet, Text, SafeAreaView, StatusBar } from 'react-native';
import { HextechCard } from '../components/HextechCard';
import { HextechButton } from '../components/HextechButton';
import { UserPreferences } from '../utils/matcher'; // Import the new type
import { ChampQuestion } from '../types';

interface ChampionQuizScreenProps {
  question: ChampQuestion;
  currentQuestionIndex: number;
  totalQuestions: number;
  // This function now receives Traits, not LanePoints
  onAnswer: (traits: UserPreferences) => void; 
}

export const ChampionQuizScreen = ({ question, currentQuestionIndex, totalQuestions, onAnswer }: ChampionQuizScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>Champion Finder</Text>
      <Text style={styles.progress}>Question {currentQuestionIndex + 1} / {totalQuestions}</Text>
      
      <HextechCard>
        <Text style={styles.questionText}>{question.text}</Text>
        
        {question.options.map((option, index) => (
          <HextechButton 
            key={index}
            text={option.text}
            // Here we pass the specific traits from the button
            onPress={() => onAnswer(option.traits)} 
            variant="primary"
          />
        ))}
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
  title: {
    fontSize: 28,
    color: '#0AC8B9', // Cyan for Champion Quiz (Distinct from Gold)
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progress: {
    color: '#888',
    marginBottom: 20,
  },
  questionText: {
    fontSize: 20,
    color: '#F0E6D2',
    marginBottom: 25,
    textAlign: 'center',
    fontWeight: '500',
  },
});