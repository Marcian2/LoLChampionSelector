import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Champion } from '../types';

interface HistoryContextType {
  favorites: string[];
  toggleFavorite: (id: string) => Promise<void>;
  history: Champion[][]; // Array of result arrays
  saveResult: (results: Champion[]) => Promise<void>;
  clearHistory: () => Promise<void>;
}

const HistoryContext = createContext<HistoryContextType>({} as HistoryContextType);

const FAVORITES_KEY = '@lol_selector_favorites';
const HISTORY_KEY = '@lol_selector_history';

export const HistoryProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [history, setHistory] = useState<Champion[][]>([]);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedFavs = await AsyncStorage.getItem(FAVORITES_KEY);
        const storedHist = await AsyncStorage.getItem(HISTORY_KEY);

        if (storedFavs) setFavorites(JSON.parse(storedFavs));
        if (storedHist) setHistory(JSON.parse(storedHist));
      } catch (e) {
        console.error("Failed to load history/favorites", e);
      }
    };
    loadData();
  }, []);

  const toggleFavorite = async (id: string) => {
    try {
      let newFavs;
      if (favorites.includes(id)) {
        newFavs = favorites.filter(favId => favId !== id);
      } else {
        newFavs = [...favorites, id];
      }
      setFavorites(newFavs);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavs));
    } catch (e) {
      console.error("Failed to toggle favorite", e);
    }
  };

  const saveResult = async (results: Champion[]) => {
    try {
      // Add new result to the beginning of the array
      const newHistory = [results, ...history];
      // Optional: Limit history size (e.g., last 20 results)
      if (newHistory.length > 20) newHistory.pop();
      
      setHistory(newHistory);
      await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    } catch (e) {
      console.error("Failed to save result", e);
    }
  };

  const clearHistory = async () => {
    try {
      setHistory([]);
      await AsyncStorage.removeItem(HISTORY_KEY);
    } catch (e) {
      console.error("Failed to clear history", e);
    }
  };

  return (
    <HistoryContext.Provider value={{ favorites, toggleFavorite, history, saveResult, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => useContext(HistoryContext);
