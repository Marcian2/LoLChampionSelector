// src/screens/QuizScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { HextechCard } from '../components/HextechCard';
import { HextechButton } from '../components/HextechButton';
import { Question, Lane } from '../types';

interface LaneQuizScreenProps {
  question: Question;
  currentQuestionIndex: number;
  totalQuestions: number;
  onAnswer: (points: Partial<Record<Lane, number>>) => void;
}

export const LaneQuizScreen = ({ question, currentQuestionIndex, totalQuestions, onAnswer }: LaneQuizScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>League Selector</Text>
      <Text style={styles.progress}>Question {currentQuestionIndex + 1} / {totalQuestions}</Text>
      
      <HextechCard>
        <Text style={styles.questionText}>{question.text}</Text>
        
        {question.options.map((option, index) => (
          <HextechButton 
            key={index}
            text={option.text}
            onPress={() => onAnswer(option.lanePoints)}
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
    backgroundColor: '#331212ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  title: {
    fontSize: 50,
    color: '#C8AA6E',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progress: {
    color: '#f0ddddff',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 25,
    color: '#ab7916ff',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '500',
  },
});