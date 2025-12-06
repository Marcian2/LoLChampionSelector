import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { HextechCard } from '../components/HextechCard';
import { HextechButton } from '../components/HextechButton';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { CurrencyDisplay } from '../components/CurrencyDisplay';

interface WelcomeScreenProps {
  navigation: any; // <--- Uses Navigation now
}

export const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  return (
    <ScreenWrapper>
      
      {/* CURRENCY DISPLAY */}
      <View style={styles.currencyContainer}>
        <CurrencyDisplay />
      </View>

      {/* SETTINGS BUTTON (Emoji Version) */}
      <TouchableOpacity 
        style={styles.settingsButton} 
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={{ fontSize: 24 }}>⚙️</Text>
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Text style={styles.title}>LEAGUE OF</Text>
        <Text style={styles.subtitle}>SELECTOR</Text>
      </View>

      <HextechCard>
        <Text style={styles.cardTitle}>SUMMONER ANALYSIS</Text>
        <Text style={styles.description}>
          New to the game? Find out where you belong on the Rift.
        </Text>
        
        {/* NAVIGATE TO LANE QUIZ */}
        <HextechButton 
          text="START MATCHMAKING" 
          onPress={() => navigation.navigate('LaneQuiz')} 
          variant="gold" 
        />

        <HextechButton 
          text="FAVORITES" 
          onPress={() => navigation.navigate('History')} 
          variant="primary" 
        />

        <HextechButton 
          text="HEXTECH CRAFTING" 
          onPress={() => navigation.navigate('Loot')} 
          variant="primary" 
        />

        <HextechButton 
          text="ASK THE ORACLE 🔮" 
          onPress={() => navigation.navigate('Chat')} 
          variant="primary" 
        />

        <HextechButton 
          text="MATCHUP ANALYZER ⚔️" 
          onPress={() => navigation.navigate('Matchup')} 
          variant="primary" 
        />

        <HextechButton 
          text="TEAM BUILDER 🛡️" 
          onPress={() => navigation.navigate('TeamBuilder')} 
          variant="primary" 
        />
      </HextechCard>
      
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  currencyContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 100,
  },
  settingsButton: {
    position: 'absolute',
    top: 50, 
    right: 20,
    zIndex: 100,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)', 
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C8AA6E',
  },
  headerContainer: { marginBottom: 50, alignItems: 'center' },
  title: { fontSize: 20, color: '#F0E6D2', fontWeight: 'bold', letterSpacing: 4, opacity: 0.8 },
  subtitle: { fontSize: 48, color: '#C8AA6E', fontWeight: '800', letterSpacing: 2, marginTop: -5 },
  cardTitle: { fontSize: 20, color: '#F0E6D2', textAlign: 'center', marginBottom: 15, fontWeight: 'bold', borderBottomWidth: 1, borderBottomColor: '#C8AA6E', paddingBottom: 10, textTransform: 'uppercase' },
  description: { fontSize: 15, color: '#A09B8C', textAlign: 'center', marginBottom: 10, lineHeight: 22 },
});