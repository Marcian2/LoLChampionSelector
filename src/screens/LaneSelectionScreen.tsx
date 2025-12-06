import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { HextechCard } from '../components/HextechCard';
import { HextechButton } from '../components/HextechButton';

export const LaneSelectionScreen = ({ route, navigation }: any) => {
  // Read the params passed from previous screen
  const { topTwoLanes } = route.params; 

  const handleSelect = (lane: string) => {
    navigation.navigate('ChampionQuiz', { selectedLane: lane });
  };

  return (
    <ScreenWrapper>
      <HextechCard>
        <Text style={styles.title}>ANALYSIS COMPLETE</Text>
        <Text style={styles.subtitle}>Recommended Roles:</Text>
        
        {topTwoLanes.map((item: any, index: number) => (
          <View key={item.lane} style={{ marginBottom: 15 }}>
            <HextechButton 
              text={`Continue as ${item.lane}`} 
              onPress={() => handleSelect(item.lane)}
              variant={index === 0 ? 'gold' : 'primary'}
            />
          </View>
        ))}
      </HextechCard>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 24, color: '#F0E6D2', fontWeight: 'bold', textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#888', textAlign: 'center', marginBottom: 20, marginTop: 10 }
});