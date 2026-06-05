import { Champion, Gender, DamageType, Lane } from '../types';

export interface UserPreferences {
  gender?: Gender;
  damageType?: DamageType;
  tags?: string[]; 
  difficulty?: number;
  rangeType?: 'Melee' | 'Ranged';
  roleFilter?: Lane; // <--- ADDED THIS
}

const POINTS = {
  THEME: 6,
  DAMAGE: 5,
  TAG: 5,
  RANGE: 3,
  DIFFICULTY: 5
};

export const findBestChampions = (preferences: UserPreferences, allChampions: Champion[]): Champion[] => {
  
  const BASELINE_SCORE = 25; 

  // 1. FILTER: Only keep champions that match the selected Lane
  const filteredPool = preferences.roleFilter 
    ? allChampions.filter(c => c.roles.includes(preferences.roleFilter!))
    : allChampions;

  // 2. SCORE
  const scoredChampions = filteredPool.map((champ) => {
    let score = 0;

    if (preferences.gender && champ.gender === preferences.gender) score += POINTS.THEME;
    if (preferences.damageType && champ.damageType === preferences.damageType) score += POINTS.DAMAGE;
    if (preferences.rangeType && champ.playstyle.includes(preferences.rangeType)) score += POINTS.RANGE;

    if (preferences.tags) {
      preferences.tags.forEach(tag => {
        if (champ.playstyle.includes(tag)) score += POINTS.TAG;
      });
    }

    if (preferences.difficulty !== undefined) {
      const d = champ.difficulty;
      if (preferences.difficulty === 1 && d <= 2) score += POINTS.DIFFICULTY;
      else if (preferences.difficulty === 2 && (d >= 2 && d <= 3)) score += POINTS.DIFFICULTY;
      else if (preferences.difficulty === 3 && d >= 3) score += POINTS.DIFFICULTY;
    }

    const percentage = Math.min(100, Math.round((score / BASELINE_SCORE) * 100));
    return { ...champ, score, percentage }; 
  });

  scoredChampions.sort((a, b) => b.score - a.score);
  return scoredChampions.slice(0, 3);
};