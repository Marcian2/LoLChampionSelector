import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { HextechCard } from '../components/HextechCard';
import { HextechButton } from '../components/HextechButton';
import { useHistory } from '../context/HistoryContext';
import { fetchChampions } from '../utils/api';
import { Champion } from '../types';

export const HistoryScreen = ({ navigation }: any) => {
  const { favorites } = useHistory();
  const [favoriteChamps, setFavoriteChamps] = useState<Champion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      // Fetch all champions (summary)
      const allChamps = await fetchChampions();
      
      // Filter by favorites
      const favs = allChamps.filter(c => favorites.includes(c.id));
      setFavoriteChamps(favs);
      setLoading(false);
    };

    loadFavorites();
  }, [favorites]); // Reload when favorites change

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <Text style={styles.title}>FAVORITES</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {loading ? (
          <Text style={styles.loadingText}>Loading Grimoire...</Text>
        ) : favoriteChamps.length === 0 ? (
          <HextechCard>
            <Text style={styles.emptyText}>No favorites yet.</Text>
            <Text style={styles.emptySubText}>Go explore and heart some champions!</Text>
          </HextechCard>
        ) : (
          favoriteChamps.map((champ) => (
            <TouchableOpacity 
              key={champ.id} 
              style={styles.itemContainer}
              onPress={() => navigation.navigate('ChampionDetail', { championId: champ.id })}
            >
              <Image source={{ uri: champ.image }} style={styles.avatar} />
              <View style={styles.info}>
                <Text style={styles.name}>{champ.name}</Text>
                <Text style={styles.desc} numberOfLines={1}>{champ.description}</Text>
              </View>
              <Text style={styles.arrow}>{'>'}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <View style={styles.footer}>
        <HextechButton text="BACK" onPress={() => navigation.goBack()} variant="gold" />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: '#C8AA6E',
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  scroll: {
    width: '100%',
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  loadingText: {
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: '#F0E6D2',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  emptySubText: {
    color: '#888',
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(30, 35, 40, 0.8)',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C8AA6E',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#C8AA6E',
  },
  info: {
    flex: 1,
    marginLeft: 15,
  },
  name: {
    color: '#F0E6D2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  desc: {
    color: '#888',
    fontSize: 12,
  },
  arrow: {
    color: '#C8AA6E',
    fontSize: 20,
    fontWeight: 'bold',
  },
  footer: {
    width: '100%',
    padding: 20,
  }
});
