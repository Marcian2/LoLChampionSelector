import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface EconomyContextType {
  keys: number;
  essence: number;
  addKey: (amount?: number) => void;
  useKey: () => boolean;
  addEssence: (amount: number) => void;
  useEssence: (amount: number) => boolean;
  isLoading: boolean;
}

const EconomyContext = createContext<EconomyContextType | undefined>(undefined);

export const EconomyProvider = ({ children }: { children: ReactNode }) => {
  const [keys, setKeys] = useState(0);
  const [essence, setEssence] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEconomy();
  }, []);

  const loadEconomy = async () => {
    try {
      const storedKeys = await AsyncStorage.getItem('@economy_keys');
      const storedEssence = await AsyncStorage.getItem('@economy_essence');
      
      if (storedKeys) setKeys(parseInt(storedKeys, 10));
      // Give 1 free key if it's the very first time (optional, but friendly)
      else setKeys(1); 

      if (storedEssence) setEssence(parseInt(storedEssence, 10));
    } catch (error) {
      console.error("Failed to load economy:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveKeys = async (newKeys: number) => {
    setKeys(newKeys);
    await AsyncStorage.setItem('@economy_keys', newKeys.toString());
  };

  const saveEssence = async (newEssence: number) => {
    setEssence(newEssence);
    await AsyncStorage.setItem('@economy_essence', newEssence.toString());
  };

  const addKey = (amount: number = 1) => {
    saveKeys(keys + amount);
  };

  const useKey = (): boolean => {
    if (keys > 0) {
      saveKeys(keys - 1);
      return true;
    }
    return false;
  };

  const addEssence = (amount: number) => {
    saveEssence(essence + amount);
  };

  const useEssence = (amount: number): boolean => {
    if (essence >= amount) {
      saveEssence(essence - amount);
      return true;
    }
    return false;
  };

  return (
    <EconomyContext.Provider value={{ 
      keys, 
      essence, 
      addKey, 
      useKey, 
      addEssence, 
      useEssence,
      isLoading 
    }}>
      {children}
    </EconomyContext.Provider>
  );
};

export const useEconomy = () => {
  const context = useContext(EconomyContext);
  if (!context) {
    throw new Error('useEconomy must be used within an EconomyProvider');
  }
  return context;
};
