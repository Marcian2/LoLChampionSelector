# ⚔️ LoL Champion Selector & Companion

> *Your ultimate pocket guide to the Rift. Draft smarter, learn faster, and master the meta.*

Welcome to the **LoL Champion Selector**, a comprehensive React Native application designed to help League of Legends players find their perfect champion, analyze team compositions, and simulate the Hextech crafting experience.

Whether you're a complete beginner looking for your first main or a veteran trying to draft the perfect 5v5 comp, this app has tools for you.

---

## ✨ Key Features

### 🧠 Smart Recommendation Engine
- **Lane Quiz**: Not sure where to go? Answer a few questions about your playstyle to find your ideal role.
- **Champion Quiz**: Get personalized champion recommendations based on damage type, difficulty, and mechanics.

### 🛡️ Team Builder & Analyzer
- **Draft Simulator**: Build your dream 5-man squad.
- **Composition Analysis**: Get real-time feedback on your team's balance.
  - Checks for **AD/AP Mix** (Don't go full AD!).
  - Evaluates **Frontline** durability.
  - Measures **Crowd Control (CC)** capabilities.
- **Search & Filter**: Quickly find champions by role or name.

### ⚔️ Matchup Analyzer
- **5v5 Face-off**: Input both teams to see a detailed breakdown of the matchup.
- **Win Conditions**: Learn what your team needs to do to win.

### 🔮 Oracle Chat
- **AI Assistant**: Chat with "Oracle," a simulated expert that can answer questions about champions, counters, and game mechanics.
- **Smart Search**: Type `@championName` to quickly pull up stats.

### 💎 Hextech Economy & Loot
- **Earn Rewards**: Complete quizzes to earn **Blue Essence**.
- **Loot System**: Open **Hextech Chests** to unlock champion shards and skins.
- **Inventory**: Manage your collection and craft items.

---

## 🛠️ Tech Stack

- **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/)
- **Language**: TypeScript
- **Navigation**: React Navigation (Native Stack)
- **State Management**: React Context API
  - `DataContext`: Champion data & logic
  - `EconomyContext`: Currency (Blue Essence)
  - `LootContext`: Inventory & Chests
  - `HistoryContext`: User activity tracking

---

## 🚀 Getting Started

Follow these steps to get the app running locally on your machine.

### Prerequisites
- Node.js (LTS recommended)
- npm or yarn
- Expo Go app on your mobile device (iOS/Android) OR an emulator.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/LoLChampionSelector.git
   cd LoLChampionSelector
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device**
   - Scan the QR code with the **Expo Go** app (Android) or Camera app (iOS).
   - Press `w` in the terminal to run in a web browser.

---

## 📂 Project Structure

```
src/
├── components/      # Reusable UI components (HextechButton, ScreenWrapper, etc.)
├── context/         # Global state providers
├── data/            # Static data (Champions, Quiz Questions)
├── screens/         # Application screens (TeamBuilder, Matchup, etc.)
├── types/           # TypeScript definitions
└── utils/           # Helper logic (Team Analysis, Matchup Logic)
```

---

## 🎨 Design Philosophy

The app features a **Hextech-inspired UI**, utilizing the iconic gold, dark blue, and magic-cyan color palette of Piltover. 

- **Custom Components**: `HextechCard`, `HextechButton` provide a consistent, game-authentic feel.
- **Immersive Experience**: Backgrounds and assets are chosen to make you feel like you're in the client.

---

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features (like a Rune page generator or Item set builder), feel free to fork the repo and submit a PR.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

*Disclaimer: LoL Champion Selector isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.*
