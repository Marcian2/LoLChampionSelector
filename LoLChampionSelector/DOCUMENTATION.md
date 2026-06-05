# React Hooks PoC - LoL Champion Selector

A proof of concept React Native application demonstrating modern React Hooks patterns and state management architecture.

## Overview

This project showcases three core React hooks:
- **`useState`** - State management in functional components
- **`useContext`** - Global state without prop drilling
- **`useEffect`** - Side effects and data lifecycle

## Hooks Implementation

---

## 1. useState Hook

**Purpose:** Add state to functional components without class components.

**Usage in DataContext:**
```typescript
const [champions, setChampions] = useState<Champion[]>([]);
const [isLoading, setIsLoading] = useState(true);
```

**How it works:**
```typescript
const [state, setState] = useState(initialValue);
setState(newValue);  // Update state
```

**Example from EconomyContext:**
```typescript
const [keys, setKeys] = useState(0);

const addKey = (amount: number = 1) => {
  setKeys(keys + amount);  // Trigger re-render
};
```

---

## 2. useContext Hook

**Purpose:** Access global state without passing props through multiple levels (prop drilling).

**Setup:**
```typescript
// Create context
const DataContext = createContext<DataContextType>({} as DataContextType);

// Provide value
<DataContext.Provider value={{ champions, isLoading, refreshData }}>
  {children}
</DataContext.Provider>

// Consume in components
const { champions, isLoading } = useContext(DataContext);
```

**Custom Hook Pattern:**
```typescript
// src/context/DataContext.tsx
export const useData = () => useContext(DataContext);

// Usage in any component
const { champions } = useData();  // No prop drilling needed!
```

**Multi-Context Example:**
```typescript
// Use multiple contexts in one component
const { champions } = useData();          // Champion data
const { essence, addEssence } = useEconomy();   // Currency
const { ownedSkins } = useLoot();         // Inventory
```

---

## 3. useEffect Hook

**Purpose:** Perform side effects (data fetching, subscriptions, persistence).

**Syntax:**
```typescript
useEffect(() => {
  // Code to run after render
  doSomething();
  
  return () => {
    // Optional cleanup
    cleanup();
  };
}, [dependencies]);  // When to run
```

**Dependency Array:**
| Array | Behavior |
|---|---|
| No array | Runs after every render |
| `[]` | Runs once on mount |
| `[dep]` | Runs when dep changes |

**Data Loading Example (DataContext):**
```typescript
useEffect(() => {
  loadData();  // Fetch on component mount
}, []);       // Empty array = run once

const loadData = async () => {
  setIsLoading(true);
  const data = await fetchChampions();
  setChampions(data);
  setIsLoading(false);
};
```

**Persistence Example (EconomyContext):**
```typescript
// Load from storage on mount
useEffect(() => {
  loadEconomy();
}, []);

const loadEconomy = async () => {
  const storedKeys = await AsyncStorage.getItem('@economy_keys');
  if (storedKeys) setKeys(parseInt(storedKeys, 10));
};

// Save to storage when state changes
const saveKeys = async (newKeys: number) => {
  setKeys(newKeys);
  await AsyncStorage.setItem('@economy_keys', newKeys.toString());
};
```

---

## Context Architecture

The app uses **4 separate contexts**, each managing one domain:

```
DataProvider      → Champion data & loading
EconomyProvider   → Keys & Blue Essence currency
LootProvider      → Skins & inventory system
HistoryProvider   → User activity tracking
```

**Why separate contexts?**
-  Performance: Components re-render only when their used context changes
-  Maintainability: Each context is simple and focused
-  Testability: Easier to test individual domains

---

## Custom Hooks

### useData
```typescript
export const useData = () => useContext(DataContext);

// Usage
const { champions, isLoading, refreshData } = useData();
```

### useEconomy
```typescript
export const useEconomy = () => {
  const context = useContext(EconomyContext);
  if (!context) throw new Error('useEconomy must be used within EconomyProvider');
  return context;
};

// Usage
const { keys, essence, useKey, useEssence, addEssence } = useEconomy();
```

### useLoot
```typescript
export const useLoot = () => {
  const context = useContext(LootContext);
  if (!context) throw new Error('useLoot must be used within LootProvider');
  return context;
};

// Usage
const { ownedSkins, addSkin, removeSkins, rerollSkins } = useLoot();
```

---

## Best Practices

1. **Always create custom hooks** instead of using `useContext` directly
2. **Add error handling** - throw if hook used outside provider
3. **Use correct dependency arrays** - `[]` for mount, `[deps]` for changes
4. **Separate concerns** - one context per domain
5. **Type everything** - full TypeScript support for safety
6. **Persist important data** - use AsyncStorage for state preservation

---

## Real-World Usage

```typescript
const InventoryScreen = () => {
  // Multiple hooks, zero prop drilling
  const { champions, isLoading } = useData();
  const { essence } = useEconomy();
  const { ownedSkins } = useLoot();
  
  if (isLoading) return <Loading />;
  
  return (
    <View>
      <Text>{essence} Essence</Text>
      <SkinList skins={ownedSkins} />
    </View>
  );
};
```

---

## Tech Stack

- **Framework:** React Native + Expo
- **Language:** TypeScript
- **State Management:** React Context API + Custom Hooks
- **Data Persistence:** AsyncStorage
- **Navigation:** React Navigation

---

## Key Takeaways

This PoC demonstrates:
-  `useState` for component state
-  `useContext` for global state without prop drilling
-  `useEffect` for data fetching and persistence
-  Custom hooks for code organization
-  Multiple contexts for separation of concerns
-  Type-safe React development with TypeScript
