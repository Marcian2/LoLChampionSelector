import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, Animated, Easing, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { HextechButton } from '../components/HextechButton';
import { HextechCard } from '../components/HextechCard';
import { CHAMPION_LOGIC } from '../data/champion_overrides';
import { fetchChampionDetail } from '../utils/api';
import { useLoot } from '../context/LootContext';
import { useEconomy } from '../context/EconomyContext';
import { Alert } from 'react-native';
import { CurrencyDisplay } from '../components/CurrencyDisplay';

interface LootReward {
  championName: string;
  skinName: string;
  imageUrl: string;
}

const LootScreen = () => {
  const navigation = useNavigation<any>();
  const { addSkin } = useLoot();
  const { essence, useEssence, addEssence } = useEconomy();
  const [loading, setLoading] = useState(false);
  const [adLoading, setAdLoading] = useState(false);
  const [reward, setReward] = useState<LootReward | null>(null);
  const [pendingSkin, setPendingSkin] = useState<any>(null);
  
  // Animation values
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const openChest = async () => {
    const COST = 300;
    if (essence < COST) {
        Alert.alert("Not Enough Essence", `You need ${COST} Blue Essence to open this chest.`);
        return;
    }

    if (!useEssence(COST)) return; // Deduct essence

    setLoading(true);
    setReward(null);
    
    // Reset animations
    scaleAnim.setValue(0);
    rotateAnim.setValue(0);
    fadeAnim.setValue(0);

    try {
      // 1. Pick Random Champion
      const championIds = Object.keys(CHAMPION_LOGIC);
      const randomId = championIds[Math.floor(Math.random() * championIds.length)];

      // 2. Fetch Details
      const detail = await fetchChampionDetail(randomId);

      if (detail && detail.skins && detail.skins.length > 0) {
        // 3. Pick Random Skin
        const randomSkin = detail.skins[Math.floor(Math.random() * detail.skins.length)];
        
        const skinName = randomSkin.name === 'default' ? `Original ${detail.name}` : randomSkin.name;

        const newReward = {
          championName: detail.name,
          skinName: skinName,
          imageUrl: randomSkin.loadingUrl 
        };

        setReward(newReward);

        // Store for decision instead of adding immediately
        setPendingSkin({
            skinId: randomSkin.id,
            name: skinName,
            image: randomSkin.loadingUrl,
            championName: detail.name
        });

        // Start Animation after a brief delay
        setTimeout(() => {
            runRevealAnimation();
        }, 100);

      } else {
        console.error("No skins found for", randomId);
      }
    } catch (error) {
      console.error("Error opening chest:", error);
    } finally {
      setLoading(false);
    }
  };

  const runRevealAnimation = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      })
    ]).start();
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-180deg', '0deg']
  });

  const handleKeep = () => {
    if (pendingSkin) {
        addSkin(pendingSkin);
        setPendingSkin(null);
        setReward(null);
    }
  };

  const handleDiscard = () => {
    setPendingSkin(null);
    setReward(null);
  };

  const watchAd = () => {
    setAdLoading(true);
    // SIMULATED AD - Replace with AdMob logic later
    setTimeout(() => {
        addEssence(500);
        setAdLoading(false);
        Alert.alert("Reward", "You received +500 Blue Essence!");
    }, 3000);
  };

  return (
    <ScreenWrapper centered>
      <View style={styles.container}>
        
        {/* HEADER BUTTONS */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>← BACK</Text>
            </TouchableOpacity>
            
            <CurrencyDisplay />

            <TouchableOpacity onPress={() => navigation.navigate('Inventory')} style={styles.inventoryButton}>
                <Text style={styles.inventoryButtonText}>INVENTORY 📦</Text>
            </TouchableOpacity>
        </View>

        <Text style={styles.title}>Hextech Crafting</Text>
        <Text style={styles.subtitle}>Open a chest to unlock a random skin!</Text>

        <View style={styles.contentArea}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#C89B3C" />
                    <Text style={styles.loadingText}>Forging Hextech Key...</Text>
                </View>
            ) : reward ? (
                <Animated.View style={{ 
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }, { rotateY: spin }] 
                }}>
                    <View style={styles.rewardCard}>
                        <HextechCard>
                            <Text style={styles.skinTitle}>{reward.skinName}</Text>
                            <Image 
                                source={{ uri: reward.imageUrl }} 
                                style={styles.rewardImage}
                                resizeMode="cover"
                            />
                            <Text style={styles.championName}>{reward.championName}</Text>
                        </HextechCard>
                    </View>
                </Animated.View>
            ) : (
                <View style={styles.placeholder}>
                    <Text style={styles.placeholderText}>?</Text>
                </View>
            )}
        </View>

        <View style={styles.buttonContainer}>
            {pendingSkin ? (
                <View style={styles.decisionButtons}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <HextechButton 
                            text="DISCARD" 
                            onPress={handleDiscard}
                            variant="primary"
                        />
                    </View>
                    <View style={{ flex: 1, marginLeft: 10 }}>
                        <HextechButton 
                            text="KEEP" 
                            onPress={handleKeep}
                            variant="gold"
                        />
                    </View>
                </View>
            ) : (
                essence >= 300 ? (
                    <HextechButton 
                        text={loading ? "Opening..." : "OPEN CHEST (300 BE)"} 
                        onPress={openChest}
                        disabled={loading}
                        variant="gold"
                    />
                ) : (
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Text style={{ color: '#A09B8C', marginBottom: 10 }}>Not enough Essence (Need 300)</Text>
                        <HextechButton 
                            text={adLoading ? "Watching Ad..." : "WATCH AD (+500 BE)"} 
                            onPress={watchAd}
                            disabled={adLoading}
                            variant="primary"
                        />
                    </View>
                )
            )}
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    position: 'absolute',
    top: 0,
    zIndex: 10,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: '#C8AA6E',
    fontWeight: 'bold',
  },
  inventoryButton: {
    padding: 10,
    backgroundColor: '#1E2328',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#C8AA6E',
  },
  inventoryButtonText: {
    color: '#C8AA6E',
    fontWeight: 'bold',
    fontSize: 12,
  },
  currencyContainer: {
    backgroundColor: '#091428',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C8AA6E',
  },
  currencyText: {
    color: '#F0E6D2',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#C89B3C',
    marginBottom: 10,
    marginTop: 40, // Space for header
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#A09B8C',
    marginBottom: 40,
    textAlign: 'center',
  },
  contentArea: {
    height: 450, 
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    color: '#C89B3C',
    marginTop: 15,
    fontSize: 16,
  },
  rewardCard: {
    width: 300,
    alignItems: 'center',
  },
  skinTitle: {
    color: '#F0E6D2',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  rewardImage: {
    width: '100%',
    aspectRatio: 0.56, // Match loading screen image ratio
    borderRadius: 4,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#C89B3C',
  },
  championName: {
    color: '#A09B8C',
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  placeholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#3C3C41',
    backgroundColor: '#1E2328',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 80,
    color: '#3C3C41',
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  decisionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  }
});

export default LootScreen;
