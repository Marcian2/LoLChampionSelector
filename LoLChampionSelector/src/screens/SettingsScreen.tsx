import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { HextechCard } from '../components/HextechCard';
import { HextechButton } from '../components/HextechButton';
import { useData } from '../context/DataContext'; 

export const SettingsScreen = ({ navigation }: any) => {
  const { refreshData } = useData();

  const handleUpdate = async () => {
    await refreshData();
    Alert.alert("Success", "Data updated from Riot!");
  };

  return (
    <ScreenWrapper>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>SETTINGS</Text>

        <HextechCard>
          <Text style={styles.sectionHeader}>DATA MANAGEMENT</Text>
          <Text style={styles.infoText}>Current Patch: Live</Text>
          
          <HextechButton text="FORCE UPDATE" onPress={handleUpdate} variant="primary" />

          <View style={styles.divider} />

          <Text style={styles.sectionHeader}>CREDITS</Text>
          <Text style={styles.infoText}>Created by Marcian</Text>

          <View style={styles.divider} />

          <Text style={styles.legalText}>Not endorsed by Riot Games.</Text>
        </HextechCard>

        {/* GO BACK */}
        <View style={styles.bottomContainer}>
          <HextechButton text="BACK" onPress={() => navigation.goBack()} variant="gold" />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  contentContainer: { width: '100%', padding: 20, alignItems: 'center' },
  title: { fontSize: 32, color: '#C8AA6E', fontWeight: 'bold', marginBottom: 20 },
  sectionHeader: { fontSize: 18, color: '#F0E6D2', fontWeight: 'bold', marginBottom: 10 },
  infoText: { fontSize: 16, color: '#888', marginBottom: 15, textAlign: 'center' },
  divider: { height: 1, backgroundColor: '#C8AA6E', marginVertical: 20, opacity: 0.3 },
  legalText: { fontSize: 11, color: '#555', fontStyle: 'italic', textAlign: 'center' },
  bottomContainer: { marginTop: 20, width: '100%' }
});