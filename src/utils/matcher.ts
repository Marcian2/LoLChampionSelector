// src/utils/matcher.ts
import { Champion, Gender, DamageType } from '../types';

// This is the shape of the User's "Shopping Cart"
export interface UserPreferences {
  gender?: Gender;
  damageType?: DamageType;
  tag?: string;      // e.g. 'Assassin'
  difficulty?: number;
  rangeType?: 'Melee' | 'Ranged';
}

export const findBestChampions = (preferences: UserPreferences, allChampions: Champion[]): Champion[] => {
  // 1. Map every champion to a scored version
  const scoredChampions = allChampions.map((champ) => {
    let score = 0;

    // RULE 1: Gender (Heavy Weight)
    // If user didn't pick a gender, skip this check.
    if (preferences.gender && champ.gender === preferences.gender) {
      score += 10;
    }

    // RULE 2: Damage Type (Heavy Weight)
    if (preferences.damageType && champ.damageType === preferences.damageType) {
      score += 10;
    }

    // RULE 3: Playstyle Tags (Medium Weight)
    // If user wants 'Assassin', and champion has 'Assassin' in their list
    if (preferences.tag && champ.playstyle.includes(preferences.tag)) {
      score += 5;
    }

    // RULE 4: Range (Medium Weight)
    // We check if the playstyle list contains 'Melee' or 'Ranged'
    if (preferences.rangeType && champ.playstyle.includes(preferences.rangeType)) {
      score += 5;
    }

    // RULE 5: Difficulty (Tie-Breaker)
    // If user wants simple (1), give points to simple champs.
    if (preferences.difficulty !== undefined) {
      if (champ.difficulty === preferences.difficulty) {
        score += 3;
      }
    }

    return { ...champ, score };
  });

  // 2. Sort by highest score first
  scoredChampions.sort((a, b) => b.score - a.score);

  // 3. Return top 3
  return scoredChampions.slice(0, 3);
};