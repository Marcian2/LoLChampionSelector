import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Context
import { DataProvider, useData } from './src/context/DataContext';
import { HistoryProvider } from './src/context/HistoryContext';
import { LootProvider } from './src/context/LootContext';
import { EconomyProvider } from './src/context/EconomyContext';

// Screens
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { LaneQuizScreen } from './src/screens/LaneQuizScreen';
import { LaneSelectionScreen } from './src/screens/LaneSelectionScreen';
import { ChampionQuizScreen } from './src/screens/ChampionQuizScreen';
import { ResultScreen } from './src/screens/ResultScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { ChampionDetailScreen } from './src/screens/ChampionDetailScreen'; 
import { HistoryScreen } from './src/screens/HistoryScreen';
import LootScreen from './src/screens/LootScreen';
import InventoryScreen from './src/screens/InventoryScreen';

const Stack = createNativeStackNavigator();

// This component handles the loading state before showing the app
const AppNavigator = () => {
  const { isLoading } = useData();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#C8AA6E" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false, 
          animation: 'fade_from_bottom', 
          contentStyle: { backgroundColor: '#091428' }
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="LaneQuiz" component={LaneQuizScreen} />
        <Stack.Screen name="LaneSelection" component={LaneSelectionScreen} />
        <Stack.Screen name="ChampionQuiz" component={ChampionQuizScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
        <Stack.Screen name="Loot" component={LootScreen} />
        <Stack.Screen name="Inventory" component={InventoryScreen} />
        
        {/* NEW DETAIL SCREEN */}
        <Stack.Screen name="ChampionDetail" component={ChampionDetailScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <DataProvider>
      <HistoryProvider>
        <LootProvider>
          <EconomyProvider>
            <AppNavigator />
          </EconomyProvider>
        </LootProvider>
      </HistoryProvider>
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#091428',
    justifyContent: 'center',
    alignItems: 'center',
  }
});