import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { HextechCard } from '../components/HextechCard';
import { HextechButton } from '../components/HextechButton';
import { questions } from '../data/questions';
import { Lane } from '../types';

export const LaneQuizScreen = ({ navigation }: any) => {
  const [index, setIndex] = useState(0);
  const [scores, setScores] = useState<Record<Lane, number>>({
    Top: 0, Jungle: 0, Mid: 0, ADC: 0, Support: 0
  });

  const handleAnswer = (points: Partial<Record<Lane, number>>) => {
    const newScores = { ...scores };
    (Object.keys(points) as Lane[]).forEach((l) => newScores[l] += points[l] || 0);
    setScores(newScores);

    if (index + 1 >= questions.length) {
      // Calculate Result
      const sorted = Object.entries(newScores)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 2)
        .map(([lane, score]) => ({ lane: lane as Lane, score }));
      
      // Navigate forward with params
      navigation.navigate('LaneSelection', { topTwoLanes: sorted });
    } else {
      setIndex(index + 1);
    }
  };

  const question = questions[index];

  return (
    <ScreenWrapper>
      <Text style={styles.title}>PHASE 1: ROLE</Text>
      <Text style={styles.progress}>Question {index + 1} / {questions.length}</Text>
      <HextechCard>
        <Text style={styles.questionText}>{question.text}</Text>
        {question.options.map((opt, i) => (
          <HextechButton key={i} text={opt.text} onPress={() => handleAnswer(opt.lanePoints)} />
        ))}
      </HextechCard>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 28, color: '#C8AA6E', fontWeight: 'bold', marginBottom: 5 },
  progress: { color: '#888', marginBottom: 20 },
  questionText: { fontSize: 20, color: '#FFF', marginBottom: 20, textAlign: 'center' }
});