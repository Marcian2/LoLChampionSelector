import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { HextechCard } from '../components/HextechCard';
import { HextechButton } from '../components/HextechButton';
import { useEconomy } from '../context/EconomyContext';
import { CurrencyDisplay } from '../components/CurrencyDisplay';

export const ResultScreen = ({ route, navigation }: any) => {
  const { results, title } = route.params;
  const [index, setIndex] = useState(0);
  const { addEssence } = useEconomy();

  useEffect(() => {
    // Award Essence on completion
    addEssence(100);
    Alert.alert("Quiz Complete!", "You earned +100 Blue Essence 🔷");
  }, []);
  
  // Get current item
  const item = results[index] || { name: 'None', description: 'No match found' };

  // Helper to handle "Deep Dive" click
  const handleDetails = () => {
    // Only navigate if it's a Champion (has an ID). Lanes don't have IDs.
    if (item.id) {
      navigation.navigate('ChampionDetail', { championId: item.id });
    }
  };

  return (
    <ScreenWrapper>
      
      <View style={styles.currencyContainer}>
        <CurrencyDisplay />
      </View>

      <HextechCard>
        <Text style={styles.resultTitle}>{title}</Text>
        
        {/* CAROUSEL LOGIC */}
        <View style={styles.row}>
           {/* Prev Arrow */}
           <TouchableOpacity onPress={() => index > 0 && setIndex(index - 1)} style={{ padding: 10 }}>
             <Text style={[styles.arrow, { opacity: index > 0 ? 1 : 0.2 }]}>{'<'}</Text>
           </TouchableOpacity>

           {/* CLICKABLE CONTENT (Replaces the old View) */}
           <TouchableOpacity activeOpacity={0.8} onPress={handleDetails} style={styles.content}>
             {item.image && <Image source={{ uri: item.image }} style={[styles.img, { resizeMode: 'cover' }]} />}
             
             <Text style={styles.name}>{item.name}</Text>
             
             {item.percentage && <Text style={styles.perc}>{item.percentage}% Match</Text>}
             
             <Text style={styles.desc}>{item.description}</Text>
             
             {/* Hint that it is clickable */}
             {item.id && <Text style={styles.clickHint}>(Tap for Details)</Text>}
           </TouchableOpacity>

           {/* Next Arrow */}
           <TouchableOpacity onPress={() => index < results.length - 1 && setIndex(index + 1)} style={{ padding: 10 }}>
             <Text style={[styles.arrow, { opacity: index < results.length - 1 ? 1 : 0.2 }]}>{'>'}</Text>
           </TouchableOpacity>
        </View>

        {/* DOTS */}
        {results.length > 1 && (
          <View style={styles.dotsContainer}>
            {results.map((_: any, i: number) => (
              <View key={i} style={[styles.dot, { backgroundColor: i === index ? '#0AC8B9' : '#555' }]} />
            ))}
          </View>
        )}

        <HextechButton text="MAIN MENU" onPress={() => navigation.popToTop()} variant="gold" />
      </HextechCard>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  currencyContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 100,
  },
  resultTitle: { fontSize: 18, color: '#F0E6D2', textAlign: 'center', marginBottom: 10, textTransform: 'uppercase' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  // Updated content style to align items properly inside TouchableOpacity
  content: { alignItems: 'center', width: 220 }, 
  arrow: { fontSize: 40, color: '#C8AA6E', fontWeight: 'bold' },
  img: { width: 160, height: 260, borderWidth: 2, borderColor: '#C8AA6E', marginBottom: 10 },
  name: { fontSize: 24, color: '#FFF', fontWeight: 'bold', textTransform: 'uppercase', textAlign: 'center' },
  perc: { fontSize: 16, color: '#0AC8B9', marginBottom: 5 },
  desc: { fontSize: 13, color: '#C8AA6E', textAlign: 'center', fontStyle: 'italic', minHeight: 40 },
  clickHint: { fontSize: 10, color: '#888', marginTop: 5 },
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 15, marginTop: 5 },
  dot: { width: 6, height: 6, borderRadius: 3, marginHorizontal: 3 }
});