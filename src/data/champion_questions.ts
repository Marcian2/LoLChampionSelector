import { ChampQuestion } from "../types";

export const champion_questions: Record<string, ChampQuestion> = {
  
  // === ROOT ===
  'root': {
    id: 'root',
    text: "Deep down, what role do you want to play in the story?",
    options: [
      { text: "The Slayer. I want to deal damage and get kills.", traits: { tags: ['Carry'] }, nextQuestionId: 'damage_type' },
      { text: "The Strategist. I control the flow and help the team.", traits: { tags: ['Utility'] }, nextQuestionId: 'utility_style' },
      { text: "The Raid Boss. I want to be unkillable.", traits: { damageType: 'Tank', tags: ['Frontline'] }, nextQuestionId: 'tank_style' }
    ]
  },

  // === BRANCH A: DAMAGE ===
  'damage_type': {
    id: 'damage_type',
    text: "What is your weapon of choice?",
    options: [
      { text: "Heavy Weapons / Brute Force.", traits: { damageType: 'AD' }, nextQuestionId: 'damage_range' },
      { text: "Magic / Spells / Elements.", traits: { damageType: 'AP' }, nextQuestionId: 'damage_range' },
      { text: "Precision and Speed.", traits: { damageType: 'AD', tags: ['Duelist'] }, nextQuestionId: 'damage_range' }
    ]
  },
  'damage_range': {
    id: 'damage_range',
    text: "How close do you get to the enemy?",
    options: [
      { text: "Face to face (Melee).", traits: { rangeType: 'Melee' }, nextQuestionId: 'vibe_check' },
      { text: "Safe distance (Ranged).", traits: { rangeType: 'Ranged' }, nextQuestionId: 'vibe_check' },
      { text: "I sneak up on them (Assassin).", traits: { tags: ['Assassin'] }, nextQuestionId: 'vibe_check' }
    ]
  },

  // === BRANCH B: UTILITY ===
  'utility_style': {
    id: 'utility_style',
    text: "How do you support your team?",
    options: [
      { text: "By healing and shielding them.", traits: { tags: ['Enchanter'], damageType: 'AP' }, nextQuestionId: 'vibe_check' },
      { text: "By locking enemies down (Stuns/Hooks).", traits: { tags: ['CC', 'Catcher'] }, nextQuestionId: 'tank_style' }, // <--- FIXED!
      { text: "By dealing damage from afar.", traits: { tags: ['Mage', 'Poke'] }, nextQuestionId: 'vibe_check' }
    ]
  },

  // === BRANCH C: TANK ===
  'tank_style': {
    id: 'tank_style',
    text: "What represents your ideal defense?",
    options: [
      { text: "I charge in first (Engage).", traits: { tags: ['Engage'], rangeType: 'Melee' }, nextQuestionId: 'vibe_check' },
      { text: "I stand between my team and danger (Protector).", traits: { tags: ['Peel', 'Warden'] }, nextQuestionId: 'vibe_check' },
    ]
  },

  // === CONVERGENCE: VIBE ===
  'vibe_check': {
    id: 'vibe_check',
    text: "Finally, what aesthetic do you prefer?",
    options: [
      { text: "Dark, Edgy, and Dangerous.", traits: { tags: ['Dark'] }, nextQuestionId: 'difficulty_check' },
      { text: "Heroic, Noble, and Bright.", traits: { tags: ['Heroic'] }, nextQuestionId: 'difficulty_check' },
      { text: "Monstrous or Otherworldly.", traits: { tags: ['Monster'] }, nextQuestionId: 'difficulty_check' },
      { text: "Cute or Whimsical.", traits: { tags: ['Cute'] }, nextQuestionId: 'difficulty_check' }
    ]
  },

  // === FINAL: DIFFICULTY ===
  'difficulty_check': {
    id: 'difficulty_check',
    text: "How complex do you want the champion to be?",
    options: [
      { text: "Simple. I want to relax.", traits: { difficulty: 1 }, nextQuestionId: 'RESULT' },
      { text: "Average.", traits: { difficulty: 2 }, nextQuestionId: 'RESULT' },
      { text: "Hard. I want to show off my skills.", traits: { difficulty: 3 }, nextQuestionId: 'RESULT' }
    ]
  }
};