import { DamageType, Gender, Difficulty } from "../types";
import { ChampQuestion } from "../types";

export const champion_questions: ChampQuestion[] = [
  // 1. Gender (User Request)
  {
    id: 1,
    text: "Do you prefer playing as a specific gender?",
    options: [
      { text: "I prefer Male characters.", traits: { gender: 'Male' } },
      { text: "I prefer Female characters.", traits: { gender: 'Female' } },
      { text: "I like Monsters/Creatures.", traits: { gender: 'Monster' } },
      { text: "I don't care.", traits: {} } // No points, neutral
    ]
  },
  
  // 2. Damage Type (User Request)
  {
    id: 2,
    text: "What kind of damage do you want to deal?",
    options: [
      { text: "Physical (Swords, Guns, Arrows).", traits: { damageType: 'AD' } },
      { text: "Magical (Spells, Elements).", traits: { damageType: 'AP' } },
      { text: "I want to be a Tank (Low Dmg, High HP).", traits: { damageType: 'Tank' } }
    ]
  },

  // 3. AoE vs Single Target (User Request)
  {
    id: 3,
    text: "Do you prefer hitting one person hard, or everyone at once?",
    options: [
      { text: "Area of Effect (Hit the whole team).", traits: { tag: 'AoE' } },
      { text: "Single Target (Focus one enemy).", traits: { tag: 'Duelist' } },
    ]
  },

  // 4. Assassination (User Request)
  {
    id: 4,
    text: "Do you want to sneak in and delete people instantly?",
    options: [
      { text: "Yes, I want to be an Assassin.", traits: { tag: 'Assassin' } },
      { text: "No, I prefer extended fights.", traits: { tag: 'Fighter' } },
    ]
  },

  // 5. Complexity (My Suggestion - Crucial for new players)
  {
    id: 5,
    text: "How much brain power do you want to use?",
    options: [
      { text: "Simple. I just want to run at them.", traits: { difficulty: 1 } },
      { text: "Complex. I want high skill expression.", traits: { difficulty: 3 } },
    ]
  },

  // 6. Range (My Suggestion - Major playstyle factor)
  {
    id: 6,
    text: "How close do you want to get to the enemy?",
    options: [
      { text: "Melee (Up close and personal).", traits: { rangeType: 'Melee' } },
      { text: "Ranged (Safe distance).", traits: { rangeType: 'Ranged' } },
    ]
  }
];

