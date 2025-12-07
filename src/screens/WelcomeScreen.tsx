import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { HextechCard } from '../components/HextechCard';
import { HextechButton } from '../components/HextechButton';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { CurrencyDisplay } from '../components/CurrencyDisplay';
import { Ionicons } from '@expo/vector-icons';

interface WelcomeScreenProps {
  navigation: any; // <--- Uses Navigation now
}

export const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  const openPayPal = () => {
    Linking.openURL('https://paypal.me/marciansuta');
  };

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

        {/* PAYPAL DONATION BUTTON */}
        <TouchableOpacity style={styles.paypalButton} onPress={openPayPal}>
          <Ionicons name="heart" size={20} color="white" style={{ marginRight: 8 }} />
          <Text style={styles.paypalText}>Donate with PayPal</Text>
        </TouchableOpacity>

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
  title: {
    fontSize: 24,
    color: '#C8AA6E',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 48,
    color: '#F0E6D2',
    fontWeight: 'bold',
    letterSpacing: 4,
    textShadowColor: '#0AC8B9',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    color: '#C8AA6E',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    color: '#A09B8C',
    textAlign: 'center',
    marginBottom: 20,
  },
  paypalButton: {
    flexDirection: 'row',
    backgroundColor: '#0070BA',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
  },
  paypalText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});