import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CHAMPION_LOGIC } from '../data/champion_overrides';
import { fetchChampionDetail } from '../utils/api';

// Define the Skin object structure
export interface LootSkin {
  id: string; // Unique ID for the inventory instance (e.g. timestamp + random)
  skinId: string; // The actual skin ID from Riot (e.g. "266001")
  name: string;
  image: string;
  championName: string;
  obtainedAt: number;
}

interface LootContextType {
  ownedSkins: LootSkin[];
  addSkin: (skin: Omit<LootSkin, 'id' | 'obtainedAt'>) => void;
  removeSkins: (ids: string[]) => void;
  rerollSkins: (ids: string[]) => Promise<LootSkin | null>;
  isLoading: boolean;
}

const LootContext = createContext<LootContextType | undefined>(undefined);

export const LootProvider = ({ children }: { children: ReactNode }) => {
  const [ownedSkins, setOwnedSkins] = useState<LootSkin[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load skins from storage on mount
  useEffect(() => {
    loadSkins();
  }, []);

  const loadSkins = async () => {
    try {
      const storedSkins = await AsyncStorage.getItem('@loot_skins');
      if (storedSkins) {
        setOwnedSkins(JSON.parse(storedSkins));
      }
    } catch (error) {
      console.error("Failed to load skins:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveSkins = async (skins: LootSkin[]) => {
    try {
      await AsyncStorage.setItem('@loot_skins', JSON.stringify(skins));
    } catch (error) {
      console.error("Failed to save skins:", error);
    }
  };

  const addSkin = (skin: Omit<LootSkin, 'id' | 'obtainedAt'>) => {
    const newSkin: LootSkin = {
      ...skin,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      obtainedAt: Date.now(),
    };
    
    const updatedSkins = [newSkin, ...ownedSkins];
    setOwnedSkins(updatedSkins);
    saveSkins(updatedSkins);
  };

  const removeSkins = (ids: string[]) => {
    const updatedSkins = ownedSkins.filter(skin => !ids.includes(skin.id));
    setOwnedSkins(updatedSkins);
    saveSkins(updatedSkins);
  };

  // Helper to get a random skin (Logic from LootScreen)
  const fetchRandomSkin = async (): Promise<Omit<LootSkin, 'id' | 'obtainedAt'> | null> => {
    try {
      const championIds = Object.keys(CHAMPION_LOGIC);
      // Try up to 3 times to get a valid skin
      for (let i = 0; i < 3; i++) {
        const randomId = championIds[Math.floor(Math.random() * championIds.length)];
        const detail = await fetchChampionDetail(randomId);
        
        if (detail && detail.skins && detail.skins.length > 0) {
          const randomSkin = detail.skins[Math.floor(Math.random() * detail.skins.length)];
          const skinName = randomSkin.name === 'default' ? `Original ${detail.name}` : randomSkin.name;
          
          return {
            skinId: randomSkin.id,
            name: skinName,
            image: randomSkin.loadingUrl,
            championName: detail.name
          };
        }
      }
      return null;
    } catch (error) {
      console.error("Error fetching random skin:", error);
      return null;
    }
  };

  const rerollSkins = async (ids: string[]): Promise<LootSkin | null> => {
    // 1. Remove the 3 skins
    const remainingSkins = ownedSkins.filter(skin => !ids.includes(skin.id));
    
    // 2. Fetch a new random skin
    const newSkinData = await fetchRandomSkin();
    
    if (newSkinData) {
      const newSkin: LootSkin = {
        ...newSkinData,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        obtainedAt: Date.now(),
      };
      
      // 3. Add the new skin
      const finalSkins = [newSkin, ...remainingSkins];
      setOwnedSkins(finalSkins);
      saveSkins(finalSkins);
      return newSkin;
    } else {
      // If fetch fails, restore skins? Or just fail?
      // For now, let's just not update if fail, but in reality we should probably handle this better.
      // But since we haven't saved the removal yet, we are safe.
      return null;
    }
  };

  return (
    <LootContext.Provider value={{ ownedSkins, addSkin, removeSkins, rerollSkins, isLoading }}>
      {children}
    </LootContext.Provider>
  );
};

export const useLoot = () => {
  const context = useContext(LootContext);
  if (context === undefined) {
    throw new Error('useLoot must be used within a LootProvider');
  }
  return context;
};
