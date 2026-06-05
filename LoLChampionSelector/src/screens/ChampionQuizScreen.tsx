import React, { useState } from 'react';
import { Text, StyleSheet } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { HextechCard } from '../components/HextechCard';
import { HextechButton } from '../components/HextechButton';
import { champion_questions } from '../data/champion_questions';
import { findBestChampions, UserPreferences } from '../utils/matcher';
import { useData } from '../context/DataContext'; // Use the Global Database

export const ChampionQuizScreen = ({ route, navigation }: any) => {
  const { selectedLane } = route.params; // Get "Top" or "Mid"
  const { champions } = useData(); // Get Database
  
  const [currentId, setCurrentId] = useState('root');
  const [traits, setTraits] = useState<UserPreferences>({ roleFilter: selectedLane });

  const handleAnswer = (newTraits: UserPreferences, nextId: string) => {
    const updatedTraits = {
      ...traits,
      ...newTraits,
      tags: [...(traits.tags || []), ...(newTraits.tags || [])]
    };
    setTraits(updatedTraits);

    if (nextId === 'RESULT') {
      // Calculate
      const results = findBestChampions(updatedTraits, champions);
      navigation.navigate('Result', { results, title: `Best ${selectedLane} Champions` });
    } else {
      setCurrentId(nextId);
    }
  };

  const question = champion_questions[currentId];

  return (
    <ScreenWrapper>
      <Text style={styles.title}>PHASE 2: CHAMPION</Text>
      <HextechCard>
        <Text style={styles.questionText}>{question.text}</Text>
        {question.options.map((opt, i) => (
          <HextechButton 
            key={i} 
            text={opt.text} 
            onPress={() => handleAnswer(opt.traits, opt.nextQuestionId)} 
          />
        ))}
      </HextechCard>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 28, color: '#0AC8B9', fontWeight: 'bold', marginBottom: 20 },
  questionText: { fontSize: 20, color: '#FFF', marginBottom: 20, textAlign: 'center' }
});