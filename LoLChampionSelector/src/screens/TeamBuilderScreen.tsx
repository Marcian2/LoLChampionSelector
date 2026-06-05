import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, FlatList, ScrollView, TextInput } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { HextechButton } from '../components/HextechButton';
import { HextechCard } from '../components/HextechCard';
import { useData } from '../context/DataContext';
import { Champion, Lane } from '../types';
import { analyzeTeam, TeamAnalysis } from '../utils/teamAnalyzer';

type TeamState = {
  [key in Lane]: Champion | null;
};

const ROLES: Lane[] = ['Top', 'Jungle', 'Mid', 'ADC', 'Support'];

export const TeamBuilderScreen = ({ navigation }: any) => {
  const { champions } = useData();
  
  const [team, setTeam] = useState<TeamState>({
    Top: null,
    Jungle: null,
    Mid: null,
    ADC: null,
    Support: null,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState<Lane | null>(null);
  const [search, setSearch] = useState('');
  const [analysis, setAnalysis] = useState<TeamAnalysis | null>(null);

  const openSelection = (role: Lane) => {
    setCurrentRole(role);
    setSearch('');
    setModalVisible(true);
  };

  const selectChampion = (champion: Champion) => {
    if (currentRole) {
      setTeam(prev => ({ ...prev, [currentRole]: champion }));
    }
    setModalVisible(false);
    setCurrentRole(null);
    setAnalysis(null); // Reset analysis on change
  };

  const clearTeam = () => {
    setTeam({
      Top: null,
      Jungle: null,
      Mid: null,
      ADC: null,
      Support: null,
    });
    setAnalysis(null);
  };

  const runAnalysis = () => {
    const result = analyzeTeam(team);
    setAnalysis(result);
  };

  const getFilteredChampions = () => {
    if (!currentRole) return [];
    return champions
      .filter(c => c.roles.includes(currentRole!) && c.name.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));
  };

  const renderSlot = (role: Lane) => {
    const champion = team[role];
    
    return (
      <View key={role} style={styles.slotContainer}>
        <View style={styles.roleHeader}>
            <Text style={styles.roleLabel}>{role.toUpperCase()}</Text>
        </View>
        
        <TouchableOpacity 
          style={[styles.slot, champion ? styles.slotFilled : styles.slotEmpty]} 
          onPress={() => openSelection(role)}
        >
          {champion ? (
            <>
              <Image source={{ uri: champion.image }} style={styles.slotImage} />
              <View style={styles.nameTag}>
                <Text style={styles.championName} numberOfLines={1}>{champion.name}</Text>
              </View>
            </>
          ) : (
            <Text style={styles.plusText}>+</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>← BACK</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.headerCenter}>
            <Text style={styles.title}>TEAM BUILDER</Text>
        </View>
        <View style={styles.headerRight}>
            <TouchableOpacity onPress={clearTeam}>
                <Text style={styles.clearText}>CLEAR</Text>
            </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.instructionText}>
          Select a champion for each role to build your dream team.
        </Text>

        <View style={styles.slotsWrapper}>
            {ROLES.map(role => renderSlot(role))}
        </View>

        <View style={styles.footer}>
            <HextechButton 
                text="ANALYZE TEAM" 
                onPress={runAnalysis} 
                variant="gold"
                disabled={Object.values(team).every(c => c === null)}
            />
        </View>

        {/* ANALYSIS RESULTS */}
        {analysis && (
          <View style={styles.resultContainer}>
            <HextechCard>
              <Text style={styles.resultTitle}>TEAM SCORE: {analysis.score}/100</Text>
              
              {analysis.warnings.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>⚠️ WARNINGS</Text>
                  {analysis.warnings.map((w, i) => (
                    <Text key={i} style={styles.warningText}>{w}</Text>
                  ))}
                </View>
              )}

              {analysis.suggestions.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>💡 SUGGESTIONS</Text>
                  {analysis.suggestions.map((s, i) => (
                    <Text key={i} style={styles.suggestionText}>{s}</Text>
                  ))}
                </View>
              )}

              {analysis.warnings.length === 0 && analysis.suggestions.length === 0 && (
                <Text style={styles.perfectText}>✨ PERFECT BALANCE! ✨</Text>
              )}
            </HextechCard>
          </View>
        )}
      </ScrollView>

      {/* SELECTION MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select {currentRole}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <TextInput 
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor="#666"
              value={search}
              onChangeText={setSearch}
            />

            <FlatList
              data={getFilteredChampions()}
              keyExtractor={(item) => item.id}
              numColumns={4}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.gridItem} onPress={() => selectChampion(item)}>
                  <Image source={{ uri: item.image }} style={styles.gridImage} />
                  <Text style={styles.gridName} numberOfLines={1}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 60,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(9, 20, 40, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#3C3C41',
  },
  headerLeft: { flex: 1, alignItems: 'flex-start', justifyContent: 'center' },
  headerCenter: { flex: 2, alignItems: 'center', justifyContent: 'center' },
  headerRight: { flex: 1, alignItems: 'flex-end', justifyContent: 'center' },
  
  backButton: { padding: 5 },
  backButtonText: { color: '#C8AA6E', fontWeight: 'bold' },
  title: { color: '#C89B3C', fontSize: 18, fontWeight: 'bold', letterSpacing: 1 },
  clearText: { color: '#A09B8C', fontSize: 12 },

  scrollContent: { padding: 20, paddingBottom: 50, alignItems: 'center' },
  instructionText: { color: '#A09B8C', marginBottom: 20, textAlign: 'center' },
  
  slotsWrapper: { width: '100%', maxWidth: 400 },
  
  slotContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 15,
    backgroundColor: 'rgba(30, 35, 40, 0.8)',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#3C3C41'
  },
  roleHeader: { width: 80, justifyContent: 'center' },
  roleLabel: { color: '#C8AA6E', fontWeight: 'bold', letterSpacing: 1 },
  
  slot: {
    flex: 1,
    height: 70,
    borderRadius: 4,
    backgroundColor: '#091428',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#555',
    marginLeft: 10,
    overflow: 'hidden',
    flexDirection: 'row'
  },
  slotEmpty: { borderStyle: 'dashed' },
  slotFilled: { borderColor: '#C89B3C', borderStyle: 'solid' },
  
  slotImage: { width: 70, height: 70, position: 'absolute', left: 0 },
  nameTag: { flex: 1, marginLeft: 80, justifyContent: 'center' }, // Space for image
  championName: { color: '#F0E6D2', fontSize: 18, fontWeight: 'bold' },
  
  plusText: { color: '#555', fontSize: 30 },

  footer: { marginTop: 20, width: '100%' },

  // Modal
  modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#091428', borderRadius: 10, height: '80%', padding: 20, borderWidth: 1, borderColor: '#C8AA6E' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  modalTitle: { color: '#F0E6D2', fontSize: 20, fontWeight: 'bold' },
  closeText: { color: '#E25041', fontSize: 24 },
  gridItem: { width: '23%', alignItems: 'center', marginBottom: 15 },
  gridImage: { width: 60, height: 60, borderRadius: 30, marginBottom: 5, borderWidth: 1, borderColor: '#C8AA6E' },
  gridName: { color: '#A09B8C', fontSize: 10, textAlign: 'center' },

  // Analysis Results
  resultContainer: { marginTop: 20, width: '100%' },
  resultTitle: { color: '#F0E6D2', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  section: { marginTop: 15 },
  sectionTitle: { color: '#C8AA6E', fontSize: 14, fontWeight: 'bold', marginBottom: 5 },
  warningText: { color: '#E25041', fontSize: 14, marginBottom: 2 },
  suggestionText: { color: '#A09B8C', fontSize: 14, marginBottom: 2 },
  perfectText: { color: '#0AC8B9', fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 10 },

  // Search
  searchInput: {
    backgroundColor: '#1E2328',
    color: '#F0E6D2',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#3C3C41',
  },
});
