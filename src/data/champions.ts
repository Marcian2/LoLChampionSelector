import { Champion } from "../types";

export const champions: Champion[] = [
  // --- TOP ---
  {
    id: 'garen',
    name: 'Garen',
    roles: ['Top'],
    damageType: 'AD',
    difficulty: 1,
    playstyle: ['Tank', 'Simple', 'Melee'],
    gender: 'Male',
    description: 'The Might of Demacia.',
    image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Garen_0.jpg',
  },
  {
    id: 'teemo',
    name: 'Teemo',
    roles: ['Top'],
    damageType: 'AP',
    difficulty: 2,
    playstyle: ['Ranged', 'Annoying', 'Trapper'],
    gender: 'Monster', // Or Male (Yordle)
    description: 'The Swift Scout',
    image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Teemo_0.jpg',
  },

  // --- JUNGLE ---
  {
    id: 'masteryi',
    name: 'Master Yi',
    roles: ['Jungle'],
    damageType: 'AD',
    difficulty: 1,
    playstyle: ['Assassin', 'Farmer', 'Melee'],
    gender: 'Male',
    description: 'The Wuju Bladesman.',
    // Note: No space in the URL ID
    image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/MasterYi_0.jpg', 
  },
  {
    id: 'sejuani',
    name: 'Sejuani',
    roles: ['Jungle'],
    damageType: 'Tank',
    difficulty: 3,
    playstyle: ['Tank', 'Engage', 'CC'],
    gender: 'Female',
    description: 'Fury of the North.',
    image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Sejuani_0.jpg',
  },

  // --- MID ---
  {
    id: 'lux',
    name: 'Lux',
    roles: ['Mid', 'Support'],
    damageType: 'AP',
    difficulty: 1,
    playstyle: ['Burst', 'Poke', 'Ranged'],
    gender: 'Female',
    description: 'The Lady of Luminosity.',
    image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Lux_0.jpg',
  },
  {
    id: 'zed',
    name: 'Zed',
    roles: ['Mid'],
    damageType: 'AD',
    difficulty: 4,
    playstyle: ['Assassin', 'Mobility', 'Melee'],
    gender: 'Male',
    description: 'The Master of Shadows.',
    image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Zed_0.jpg',
  },

  // --- ADC ---
  {
    id: 'ashe',
    name: 'Ashe',
    roles: ['ADC', 'Support'],
    damageType: 'AD',
    difficulty: 1,
    playstyle: ['Marksman', 'Utility', 'Ranged'],
    gender: 'Female',
    description: 'The Frost Archer.',
    image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Ashe_0.jpg',
  },
  {
    id: 'ezreal',
    name: 'Ezreal',
    roles: ['ADC'],
    damageType: 'Hybrid',
    difficulty: 3,
    playstyle: ['Caster', 'Mobility', 'Poke'],
    gender: 'Male',
    description: 'The Prodigal Explorer.',
    image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Ezreal_0.jpg',
  },

  // --- SUPPORT ---
  {
    id: 'soraka',
    name: 'Soraka',
    roles: ['Support'],
    damageType: 'AP',
    difficulty: 1,
    playstyle: ['Enchanter', 'Healer', 'Ranged'],
    gender: 'Female',
    description: 'The Starchild.',
    image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Soraka_0.jpg',
  },
  {
    id: 'leona',
    name: 'Leona',
    roles: ['Support'],
    damageType: 'Tank',
    difficulty: 1,
    playstyle: ['Tank', 'Engage', 'Melee'],
    gender: 'Female',
    description: 'The Radiant Dawn.',
    image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Leona_0.jpg',
  },
];