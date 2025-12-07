import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking'; // Ensure this is imported

// Context
import { DataProvider, useData } from './src/context/DataContext';
import { HistoryProvider } from './src/context/HistoryContext';
import { LootProvider } from './src/context/LootContext';
import { EconomyProvider } from './src/context/EconomyContext';

// Screens
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { ChatScreen } from './src/screens/ChatScreen';
import { MatchupScreen } from './src/screens/MatchupScreen';
import { TeamBuilderScreen } from './src/screens/TeamBuilderScreen';
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

// --- LINKING CONFIGURATION ---
const prefix = Linking.createURL('/');
const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: [prefix, 'https://marcian2.github.io/LoLChampionSelector'],
  config: {
    screens: {
      Welcome: '', // Matches the root path
      Settings: 'settings',
      LaneQuiz: 'lane-quiz',
      LaneSelection: 'lane-selection',
      ChampionQuiz: 'champion-quiz',
      Result: 'result',
      History: 'history',
      Loot: 'loot',
      Inventory: 'inventory',
      Chat: 'chat',
      Matchup: 'matchup',
      TeamBuilder: 'team-builder',
      ChampionDetail: 'champion/:championId',
    },
  },
};

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
    <NavigationContainer linking={linking} fallback={<View style={styles.loadingContainer} />}>
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
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Matchup" component={MatchupScreen} />
        <Stack.Screen name="TeamBuilder" component={TeamBuilderScreen} />
        <Stack.Screen name="ChampionDetail" component={ChampionDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <DataProvider>
      <EconomyProvider>
        <HistoryProvider>
          <LootProvider>
            <AppNavigator />
          </LootProvider>
        </HistoryProvider>
      </EconomyProvider>
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