import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { Champion } from '../types';
import { fetchChampions } from '../utils/api';

interface DataContextType {
  champions: Champion[];
  isLoading: boolean;
  refreshData: () => Promise<void>;
}

const DataContext = createContext<DataContextType>({} as DataContextType);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [champions, setChampions] = useState<Champion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    const data = await fetchChampions();
    setChampions(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <DataContext.Provider value={{ champions, isLoading, refreshData: loadData }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom Hook for easy access
export const useData = () => useContext(DataContext);