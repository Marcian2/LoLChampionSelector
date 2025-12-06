import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Linking, KeyboardAvoidingView, Platform } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { generateGuide } from '../utils/guideGenerator';
import { CHAMPION_LOGIC } from '../data/champion_overrides';
import { Ionicons } from '@expo/vector-icons'; // Optional: For send icon

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  link?: string;
  championId?: string; // To navigate to details
}

// --- HELPER: SMART SEARCH ---
const findChampionId = (userInput: string): string | undefined => {
  // 1. Clean the input (remove spaces, dots, apostrophes, lowercase)
  // "Dr. Mundo" -> "drmundo", "Kai'Sa" -> "kaisa"
  const cleanInput = userInput.toLowerCase().replace(/[^a-z0-9]/g, '');

  // 2. Handle Riot's Weird Aliases
  const aliases: Record<string, string> = {
    'wukong': 'MonkeyKing',
    'monkeyking': 'MonkeyKing',
    'mundo': 'DrMundo',
    'drmundo': 'DrMundo',
    'jarvan': 'JarvanIV',
    'jarvan4': 'JarvanIV',
    'yi': 'MasterYi',
    'masteryi': 'MasterYi',
    'aurelion': 'AurelionSol',
    'sol': 'AurelionSol',
    'tahm': 'TahmKench',
    'kench': 'TahmKench',
    'renata': 'Renata', // Riot ID is just 'Renata'
    'glas': 'Renata',
    'nunu': 'Nunu', 
  };

  // Direct match in alias list?
  if (aliases[cleanInput]) return aliases[cleanInput];

  // 3. Search the Database Keys
  const allIds = Object.keys(CHAMPION_LOGIC);
  
  return allIds.find(id => {
    // Clean the database ID too ("DrMundo" -> "drmundo") to compare
    const cleanId = id.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleanId === cleanInput;
  });
};

export const ChatScreen = ({ navigation }: any) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Greetings Summoner. Name a champion, and I shall reveal their path.", sender: 'bot' }
  ]);
  const listRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    const newMsg: Message = { id: Date.now().toString(), text: userText, sender: 'user' };
    
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    // --- LOGIC START ---
    const champID = findChampionId(userText);

    setTimeout(() => {
      if (champID && CHAMPION_LOGIC[champID]) {
        // FOUND!
        // Adjusted to match existing generateGuide signature (takes 1 arg)
        const guide = generateGuide(champID);
        
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: guide.text,
          sender: 'bot',
          link: guide.url,
          championId: champID
        };
        setMessages(prev => [...prev, botResponse]);
      } else {
        // NOT FOUND
        const errorMsg: Message = {
          id: (Date.now() + 1).toString(),
          text: `I cannot find a champion named "${userText}". Check your spelling (e.g. "Dr Mundo", "Wukong").`,
          sender: 'bot'
        };
        setMessages(prev => [...prev, errorMsg]);
      }
    }, 500); // Small delay to feel natural
  };

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  const openDetails = (champId: string) => {
    navigation.navigate('ChampionDetail', { championId: champId });
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isBot = item.sender === 'bot';
    return (
      <View style={[styles.msgRow, isBot ? styles.msgLeft : styles.msgRight]}>
        
        {/* BOT AVATAR */}
        {isBot && (
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>🔮</Text>
          </View>
        )}

        <View style={[styles.bubble, isBot ? styles.botBubble : styles.userBubble]}>
          <Text style={styles.msgText}>{item.text}</Text>
          
          {/* U.GG LINK BUTTON */}
          {item.link && (
            <TouchableOpacity style={styles.linkButton} onPress={() => openLink(item.link!)}>
              <Text style={styles.linkText}>View Live Winrates (U.GG) ↗</Text>
            </TouchableOpacity>
          )}

          {/* VIEW DETAILS BUTTON */}
          {item.championId && (
            <TouchableOpacity style={styles.detailButton} onPress={() => openDetails(item.championId!)}>
              <Text style={styles.detailText}>View In-App Details 👁️</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <ScreenWrapper>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>← BACK</Text>
        </TouchableOpacity>
        <Text style={styles.title}>THE ORACLE 🔮</Text>
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={20} 
      >
        <FlatList
          ref={listRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={i => i.id}
          contentContainerStyle={styles.list}
          onContentSizeChange={() => listRef.current?.scrollToEnd()}
        />

        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input}
            placeholder="Type 'Garen', 'Mundo'..."
            placeholderTextColor="#888"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendText}>SEND</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, width: '100%' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the title
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#3C3C41',
    backgroundColor: 'rgba(9, 20, 40, 0.9)',
    position: 'relative', // Allow absolute positioning of children
    width: '100%',
  },
  backButton: { 
    position: 'absolute',
    left: 10,
    padding: 10,
    zIndex: 10,
  },
  backButtonText: { color: '#C8AA6E', fontWeight: 'bold' },
  title: { fontSize: 20, color: '#C89B3C', fontWeight: 'bold', letterSpacing: 2 },
  list: { padding: 20, paddingBottom: 100 },
  msgRow: { flexDirection: 'row', marginBottom: 15, alignItems: 'flex-end' }, // Align items to bottom for avatar
  msgLeft: { justifyContent: 'flex-start' },
  msgRight: { justifyContent: 'flex-end' },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1E2328',
    borderWidth: 1,
    borderColor: '#C8AA6E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: { fontSize: 20 },
  bubble: { maxWidth: '75%', padding: 15, borderRadius: 12 }, // Reduced max width slightly to fit avatar
  botBubble: { backgroundColor: '#1E2328', borderWidth: 1, borderColor: '#C8AA6E' },
  userBubble: { backgroundColor: '#0AC8B9' },
  msgText: { color: '#FFF', fontSize: 16, lineHeight: 22 },
  linkButton: { marginTop: 10, backgroundColor: '#091428', padding: 8, borderRadius: 5, alignItems: 'center' },
  linkText: { color: '#C8AA6E', fontWeight: 'bold', fontSize: 12 },
  detailButton: { marginTop: 5, backgroundColor: 'rgba(255,255,255,0.1)', padding: 8, borderRadius: 5, alignItems: 'center' },
  detailText: { color: '#F0E6D2', fontSize: 12 },
  inputContainer: { flexDirection: 'row', padding: 15, backgroundColor: '#1E2328', borderTopWidth: 1, borderTopColor: '#C8AA6E' },
  input: { flex: 1, backgroundColor: '#091428', color: '#FFF', padding: 12, borderRadius: 25, borderWidth: 1, borderColor: '#555', marginRight: 10 },
  sendButton: { justifyContent: 'center', paddingHorizontal: 15, backgroundColor: '#C8AA6E', borderRadius: 25 },
  sendText: { color: '#091428', fontWeight: 'bold' }
});
