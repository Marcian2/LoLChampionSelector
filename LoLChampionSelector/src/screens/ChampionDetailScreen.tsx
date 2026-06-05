import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { HextechCard } from '../components/HextechCard';
import { HextechButton } from '../components/HextechButton';
import { fetchChampionDetail } from '../utils/api';
import { ChampionDetail } from '../types';
import { useHistory } from '../context/HistoryContext';

const { width } = Dimensions.get('window');
// Calculate a perfect 16:9 height for the header image
const HEADER_HEIGHT = width * 0.6; 

const cleanDescription = (text: string) => {
  return text
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '');
}; 

export const ChampionDetailScreen = ({ route, navigation }: any) => {
  const { championId } = route.params;
  const [detail, setDetail] = useState<ChampionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const { favorites, toggleFavorite } = useHistory();

  const isFavorite = favorites.includes(championId);

  useEffect(() => {
    const load = async () => {
      const data = await fetchChampionDetail(championId);
      setDetail(data);
      setLoading(false);
    };
    load();
  }, [championId]);

  if (loading || !detail) {
    return (
      <ScreenWrapper>
        <ActivityIndicator size="large" color="#C8AA6E" />
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper centered={false}>
      <ScrollView 
        style={{ flex: 1, width: '100%' }}
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        
        {/* HEADER SPLASH ART */}
        {/* We moved this OUT of the padding container so it goes full width */}
        <View style={styles.headerContainer}>
          <Image 
            source={{ uri: detail.skins[0].splashUrl }} 
            style={[styles.splash, { resizeMode: 'cover' }]} 
          />
          
          {/* FAVORITE BUTTON */}
          <TouchableOpacity 
            style={styles.favoriteButton} 
            onPress={() => toggleFavorite(championId)}
          >
            <Text style={styles.favoriteIcon}>{isFavorite ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>

          <View style={styles.textOverlay}>
            <Text style={styles.name}>{detail.name.toUpperCase()}</Text>
            <Text style={styles.title}>{detail.title}</Text>
          </View>
        </View>
        
        <View style={styles.content}>
          {/* LORE */}
          <HextechCard>
            <Text style={styles.sectionHeader}>LORE</Text>
            <Text style={styles.text}>{detail.lore}</Text>
          </HextechCard>

          <View style={styles.spacer} />

          {/* ABILITIES */}
          <HextechCard>
            <Text style={styles.sectionHeader}>ABILITIES</Text>
            
            {/* Passive */}
            <View style={styles.abilityItem}>
              <Image source={{ uri: detail.passive.imageUrl }} style={[styles.spellIcon, { resizeMode: 'cover' }]} />
              <View style={styles.abilityTextContainer}>
                <Text style={styles.abilityName}>Passive: {detail.passive.name}</Text>
                <Text style={styles.abilityDescription}>{cleanDescription(detail.passive.description)}</Text>
              </View>
            </View>
            
            {/* Spells Q W E R */}
            {detail.spells.map((spell, index) => {
              const keys = ['Q', 'W', 'E', 'R'];
              return (
                <View key={index} style={styles.abilityItem}>
                  <Image source={{ uri: spell.imageUrl }} style={[styles.spellIcon, { resizeMode: 'cover' }]} />
                  <View style={styles.abilityTextContainer}>
                    <Text style={styles.abilityName}>{keys[index]}: {spell.name}</Text>
                    <Text style={styles.abilityDescription}>{cleanDescription(spell.description)}</Text>
                  </View>
                </View>
              );
            })}
          </HextechCard>

          <View style={styles.spacer} />

          {/* SKINS CAROUSEL */}
          <HextechCard>
            <Text style={styles.sectionHeader}>SKINS ({detail.skins.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
              {detail.skins.slice(1).map((skin, index) => (
                <View key={index} style={styles.skinContainer}>
                  <Image source={{ uri: skin.loadingUrl }} style={[styles.skinImage, { resizeMode: 'cover' }]} />
                  <Text style={styles.skinName} numberOfLines={2}>{skin.name}</Text>
                </View>
              ))}
            </ScrollView>
          </HextechCard>

          <View style={styles.spacer} />
          <HextechButton text="BACK" onPress={() => navigation.goBack()} variant="gold" />
          <View style={{ height: 40 }} /> 
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 0,
  },
  headerContainer: {
    width: '100%',
    height: HEADER_HEIGHT,
    position: 'relative',
    backgroundColor: '#000', // Black bg prevents white flash
    marginBottom: 20,
    // On iOS, this shadow creates a nice separation
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  favoriteButton: {
    position: 'absolute',
    top: 40, // Below status bar
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C8AA6E',
  },
  favoriteIcon: {
    fontSize: 24,
  },
  splash: {
    width: '100%',
    height: '100%',
    opacity: 0.8, // Slight dim so text pops
  },
  textOverlay: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)', // Readable text bg
    paddingVertical: 10,
  },
  name: {
    fontSize: 32,
    color: '#F0E6D2',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
    textShadowColor: '#000',
    textShadowRadius: 10,
  },
  title: {
    fontSize: 14,
    color: '#C8AA6E',
    fontWeight: 'bold',
    fontStyle: 'italic',
    textTransform: 'uppercase',
  },
  content: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    fontSize: 18,
    color: '#C8AA6E',
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    paddingBottom: 5,
  },
  text: {
    color: '#bbb',
    lineHeight: 22,
    fontSize: 14,
    textAlign: 'justify',
  },
  spacer: {
    height: 20,
  },
  abilityItem: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  abilityTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  abilityName: {
    color: '#F0E6D2',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  abilityDescription: {
    color: '#888',
    fontSize: 12,
    lineHeight: 18,
  },
  spellIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C8AA6E',
    backgroundColor: '#000',
  },
  skinContainer: {
    width: 120,
    marginRight: 15,
  },
  skinImage: {
    width: 120,
    height: 220, // Tall portrait aspect ratio for Loading Art
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#555',
  },
  skinName: {
    color: '#F0E6D2',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 8,
  },
});