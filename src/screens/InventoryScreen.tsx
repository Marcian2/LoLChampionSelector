import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, Dimensions, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { HextechButton } from '../components/HextechButton';
import { HextechCard } from '../components/HextechCard';
import { useLoot, LootSkin } from '../context/LootContext';

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 3;
const ITEM_MARGIN = 5;
const LIST_PADDING = 10;
// Calculate width: (Screen Width - List Padding * 2 - (Item Margin * 2 * Columns)) / Columns
const ITEM_WIDTH = (width - (LIST_PADDING * 2) - (ITEM_MARGIN * 2 * COLUMN_COUNT)) / COLUMN_COUNT;

const InventoryScreen = () => {
  const navigation = useNavigation<any>();
  const { ownedSkins, rerollSkins } = useLoot();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isRerolling, setIsRerolling] = useState(false);
  const [rewardSkin, setRewardSkin] = useState<LootSkin | null>(null);

  const toggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      } else {
        Alert.alert("Limit Reached", "You can only select 3 skins to reroll.");
      }
    }
  };

  const handleReroll = async () => {
    if (selectedIds.length !== 3) return;

    setIsRerolling(true);
    const newSkin = await rerollSkins(selectedIds);
    setIsRerolling(false);
    setSelectedIds([]);

    if (newSkin) {
      setRewardSkin(newSkin);
    } else {
      Alert.alert("Reroll Failed", "Something went wrong with the Hextech Forge.");
    }
  };

  const closeReward = () => {
    setRewardSkin(null);
  };

  const renderItem = ({ item }: { item: LootSkin }) => {
    const isSelected = selectedIds.includes(item.id);
    return (
      <TouchableOpacity 
        style={[styles.skinCard, isSelected && styles.selectedCard]} 
        onPress={() => toggleSelection(item.id)}
      >
        <Image source={{ uri: item.image }} style={styles.skinImage} resizeMode="cover" />
        <View style={styles.skinInfo}>
            <Text style={styles.skinName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.champName}>{item.championName}</Text>
        </View>
        {isSelected && (
            <View style={styles.checkMark}>
                <Text style={styles.checkText}>✓</Text>
            </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Text style={styles.backButtonText}>← BACK</Text>
            </TouchableOpacity>
            <Text style={styles.title}>LOOT INVENTORY</Text>
            <View style={{ width: 50 }} /> 
        </View>

        <Text style={styles.subtitle}>
            Select 3 skins to Reroll into a permanent random skin.
        </Text>

        {ownedSkins.length === 0 ? (
            <View style={styles.emptyState}>
                <Text style={styles.emptyText}>Your inventory is empty.</Text>
                <HextechButton 
                    text="GET LOOT" 
                    onPress={() => navigation.navigate('Loot')} 
                    variant="gold"
                />
            </View>
        ) : (
            <FlatList
                data={ownedSkins}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={COLUMN_COUNT}
                contentContainerStyle={styles.listContent}
            />
        )}

        {selectedIds.length > 0 && (
            <View style={styles.footer}>
                <Text style={styles.selectionText}>{selectedIds.length} / 3 Selected</Text>
                <HextechButton 
                    text={isRerolling ? "FORGING..." : "REROLL (3)"} 
                    onPress={handleReroll}
                    disabled={selectedIds.length !== 3 || isRerolling}
                    variant={selectedIds.length === 3 ? "gold" : "primary"}
                />
            </View>
        )}

        {/* REWARD MODAL */}
        <Modal
            visible={!!rewardSkin}
            transparent={true}
            animationType="fade"
            onRequestClose={closeReward}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>REROLL COMPLETE!</Text>
                    {rewardSkin && (
                        <HextechCard>
                            <Text style={styles.rewardSkinName}>{rewardSkin.name}</Text>
                            <Image 
                                source={{ uri: rewardSkin.image }} 
                                style={styles.rewardImage}
                                resizeMode="cover"
                            />
                            <Text style={styles.rewardChampName}>{rewardSkin.championName}</Text>
                        </HextechCard>
                    )}
                    <View style={styles.modalButton}>
                        <HextechButton 
                            text="COLLECT" 
                            onPress={closeReward} 
                            variant="gold" 
                        />
                    </View>
                </View>
            </View>
        </Modal>

      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 10,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: '#C8AA6E',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C89B3C',
    letterSpacing: 1,
  },
  subtitle: {
    color: '#A09B8C',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  listContent: {
    paddingHorizontal: LIST_PADDING,
    paddingBottom: 100, // Space for footer
  },
  skinCard: {
    width: ITEM_WIDTH, // Fixed width
    margin: ITEM_MARGIN,
    backgroundColor: '#1E2328',
    borderWidth: 1,
    borderColor: '#3C3C41',
    borderRadius: 4,
    overflow: 'hidden',
    aspectRatio: 0.56, // Match loading screen image ratio (308/560)
  },
  selectedCard: {
    borderColor: '#C8AA6E',
    borderWidth: 2,
  },
  skinImage: {
    width: '100%',
    flex: 1, // Take up all available space minus the info box
  },
  skinInfo: {
    paddingVertical: 5,
    paddingHorizontal: 2,
    alignItems: 'center',
    backgroundColor: '#1E2328',
    height: 35, // Fixed height for text area to prevent jumping
    justifyContent: 'center',
  },
  skinName: {
    color: '#F0E6D2',
    fontSize: 9, // Slightly smaller
    fontWeight: 'bold',
    textAlign: 'center',
  },
  champName: {
    color: '#A09B8C',
    fontSize: 8,
    textAlign: 'center',
  },
  checkMark: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#C8AA6E',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkText: {
    color: '#091428',
    fontWeight: 'bold',
    fontSize: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#A09B8C',
    fontSize: 18,
    marginBottom: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(9, 20, 40, 0.95)',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#C8AA6E',
    alignItems: 'center',
  },
  selectionText: {
    color: '#F0E6D2',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  // MODAL STYLES
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C89B3C',
    marginBottom: 20,
    letterSpacing: 2,
  },
  rewardSkinName: {
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
  rewardChampName: {
    color: '#A09B8C',
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  modalButton: {
    marginTop: 20,
    width: '100%',
    maxWidth: 200,
  }
});

export default InventoryScreen;
