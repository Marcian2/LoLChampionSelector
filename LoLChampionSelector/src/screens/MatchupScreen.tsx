import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, FlatList, TextInput, ScrollView, Alert } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { HextechButton } from '../components/HextechButton';
import { HextechCard } from '../components/HextechCard';
import { fetchChampions } from '../utils/api';
import { Champion } from '../types';
import { analyzeMatchup, MatchupAnalysis } from '../utils/matchupAnalyzer';

export const MatchupScreen = ({ navigation }: any) => {
  const [allChampions, setAllChampions] = useState<Champion[]>([]);
  const [filteredChampions, setFilteredChampions] = useState<Champion[]>([]);
  const [search, setSearch] = useState('');
  
  // Team State: Array of 5 slots, null means empty
  const [allies, setAllies] = useState<(Champion | null)[]>([null, null, null, null, null]);
  const [enemies, setEnemies] = useState<(Champion | null)[]>([null, null, null, null, null]);
  
  // Selection State
  const [modalVisible, setModalVisible] = useState(false);
  const [selectionContext, setSelectionContext] = useState<{ team: 'ally' | 'enemy', index: number } | null>(null);
  
  // Analysis Result
  const [analysis, setAnalysis] = useState<MatchupAnalysis | null>(null);

  useEffect(() => {
    loadChampions();
  }, []);

  const loadChampions = async () => {
    const data = await fetchChampions();
    // Sort alphabetically
    const sorted = data.filter(c => c !== null).sort((a, b) => a!.name.localeCompare(b!.name));
    setAllChampions(sorted as Champion[]);
    setFilteredChampions(sorted as Champion[]);
  };

  const ROLES = ['Top', 'Jungle', 'Mid', 'ADC', 'Support'];

  const getAvailableChampions = (roleIndex: number, searchText: string) => {
    const targetRole = ROLES[roleIndex];
    const query = searchText.toLowerCase();

    // Gather all picked IDs to exclude (Unique per Game)
    const pickedIds = new Set([
        ...allies.map(c => c?.id),
        ...enemies.map(c => c?.id)
    ].filter(Boolean));

    return allChampions.filter(champ => {
        // 1. Role Match
        const matchesRole = champ.roles && champ.roles.includes(targetRole as any);

        // 2. Search Match
        const matchesSearch = champ.name.toLowerCase().includes(query);

        // 3. Not Picked (Unique)
        const isAvailable = !pickedIds.has(champ.id);

        return matchesRole && matchesSearch && isAvailable;
    });
  };

  const openSelection = (team: 'ally' | 'enemy', index: number) => {
    setSelectionContext({ team, index });
    setSearch('');
    
    // Initial Filter
    const filtered = getAvailableChampions(index, '');
    setFilteredChampions(filtered);
    
    setModalVisible(true);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    if (selectionContext) {
        const filtered = getAvailableChampions(selectionContext.index, text);
        setFilteredChampions(filtered);
    }
  };

  const selectChampion = (champion: Champion) => {
    if (!selectionContext) return;
    
    const { team, index } = selectionContext;
    
    if (team === 'ally') {
      const newAllies = [...allies];
      newAllies[index] = champion;
      setAllies(newAllies);
    } else {
      const newEnemies = [...enemies];
      newEnemies[index] = champion;
      setEnemies(newEnemies);
    }
    
    setModalVisible(false);
    setAnalysis(null); // Reset analysis on change
  };

  const clearAll = () => {
    setAllies([null, null, null, null, null]);
    setEnemies([null, null, null, null, null]);
    setAnalysis(null);
  };

  const runAnalysis = () => {
    const validAllies = allies.filter(c => c !== null) as Champion[];
    const validEnemies = enemies.filter(c => c !== null) as Champion[];

    if (validAllies.length === 0 && validEnemies.length === 0) {
      Alert.alert("Empty Teams", "Please select at least one champion to analyze.");
      return;
    }

    const result = analyzeMatchup(validAllies, validEnemies);
    setAnalysis(result);
  };

  const renderSlot = (champion: Champion | null, team: 'ally' | 'enemy', index: number) => {
    const isAlly = team === 'ally';
    const borderColor = isAlly ? '#0AC8B9' : '#E25041'; // Blue vs Red

    return (
      <View key={`${team}-${index}`} style={styles.slotContainer}>
        <Text style={styles.roleLabel}>{ROLES[index]}</Text>
        <TouchableOpacity 
          style={[styles.slot, { borderColor }]} 
          onPress={() => openSelection(team, index)}
        >
          {champion ? (
            <Image source={{ uri: champion.image }} style={styles.slotImage} />
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
            <Text style={styles.title}>MATCHUP ANALYZER</Text>
        </View>
        <View style={styles.headerRight}>
            <TouchableOpacity onPress={clearAll}>
                <Text style={styles.clearText}>CLEAR</Text>
            </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* TEAMS CONTAINER */}
        <View style={styles.teamsContainer}>
          {/* ALLIES */}
          <View style={styles.teamColumn}>
            <Text style={[styles.teamTitle, { color: '#0AC8B9' }]} numberOfLines={1} adjustsFontSizeToFit>MY TEAM</Text>
            {allies.map((champ, i) => renderSlot(champ, 'ally', i))}
          </View>

          {/* VS SEPARATOR */}
          <View style={styles.vsContainer}>
            <Text style={styles.vsText}>VS</Text>
          </View>

          {/* ENEMIES */}
          <View style={styles.teamColumn}>
            <Text style={[styles.teamTitle, { color: '#E25041' }]} numberOfLines={1} adjustsFontSizeToFit>ENEMY TEAM</Text>
            {enemies.map((champ, i) => renderSlot(champ, 'enemy', i))}
          </View>
        </View>

        {/* ACTION BUTTON */}
        <View style={styles.buttonContainer}>
          <HextechButton text="ANALYZE MATCHUP" onPress={runAnalysis} variant="gold" />
        </View>

        {/* RESULTS */}
        {analysis && (
          <View style={styles.resultContainer}>
            <HextechCard>
              <Text style={styles.resultTitle}>TACTICAL REPORT</Text>
              
              <Text style={styles.summaryText}>{analysis.summary}</Text>
              
              <View style={styles.divider} />
              
              {analysis.tips.map((tip, index) => (
                <Text key={index} style={styles.tipText}>{tip}</Text>
              ))}
            </HextechCard>
          </View>
        )}

      </ScrollView>

      {/* SELECTION MODAL */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Champion</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <TextInput 
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor="#666"
              value={search}
              onChangeText={handleSearch}
            />

            <FlatList
              data={filteredChampions}
              keyExtractor={(item) => item.id}
              numColumns={4}
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
  headerCenter: { flex: 2, alignItems: 'center', justifyContent: 'center' }, // More space for title
  headerRight: { flex: 1, alignItems: 'flex-end', justifyContent: 'center' },
  
  backButton: { padding: 5 },
  backButtonText: { color: '#C8AA6E', fontWeight: 'bold' },
  title: { color: '#C89B3C', fontSize: 16, fontWeight: 'bold', letterSpacing: 1, textAlign: 'center' },
  clearText: { color: '#A09B8C', fontSize: 12 },
  
  scrollContent: { padding: 20, paddingBottom: 50 },
  
  teamsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  teamColumn: { flex: 1, alignItems: 'center' },
  teamTitle: { fontSize: 14, fontWeight: 'bold', marginBottom: 15, letterSpacing: 1, textAlign: 'center', width: '100%' },
  
  vsContainer: { justifyContent: 'center', paddingHorizontal: 5, paddingTop: 30 }, // Adjusted for alignment
  vsText: { color: '#F0E6D2', fontWeight: 'bold', fontSize: 16, opacity: 0.5 },

  slotContainer: { alignItems: 'center', marginBottom: 15 },
  roleLabel: { color: '#A09B8C', fontSize: 10, marginBottom: 4, fontWeight: 'bold', letterSpacing: 1 },
  slot: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: '#1E2328',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  slotImage: { width: '100%', height: '100%' },
  plusText: { color: '#555', fontSize: 30 },

  buttonContainer: { marginBottom: 30 },

  resultContainer: { width: '100%' },
  resultTitle: { color: '#C8AA6E', fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  summaryText: { color: '#F0E6D2', fontSize: 16, textAlign: 'center', marginBottom: 15, lineHeight: 22, fontWeight: 'bold' },
  divider: { height: 1, backgroundColor: '#3C3C41', width: '100%', marginBottom: 15 },
  tipText: { color: '#A09B8C', fontSize: 14, marginBottom: 8, lineHeight: 20 },

  // Modal
  modalContainer: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#091428', borderRadius: 10, height: '80%', padding: 20, borderWidth: 1, borderColor: '#C8AA6E' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  modalTitle: { color: '#F0E6D2', fontSize: 20, fontWeight: 'bold' },
  closeText: { color: '#E25041', fontSize: 24 },
  searchInput: { backgroundColor: '#1E2328', color: '#FFF', padding: 10, borderRadius: 5, marginBottom: 15, borderWidth: 1, borderColor: '#3C3C41' },
  gridItem: { flex: 1, alignItems: 'center', margin: 5, maxWidth: '25%' },
  gridImage: { width: 50, height: 50, borderRadius: 25, marginBottom: 5 },
  gridName: { color: '#A09B8C', fontSize: 10, textAlign: 'center' },
});
