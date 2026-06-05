export type Lane = 'Top' | 'Jungle' | 'Mid' | 'ADC' | 'Support';
export type DamageType = 'AD' | 'AP' | 'Hybrid' | 'Tank';
export type Difficulty = 1 | 2 | 3 | 4 | 5;
export type Gender = 'Male' | 'Female' | 'Monster' | 'Other';

export interface ChampionLogic {
    roles: Lane[];
    damageType: DamageType;
    difficulty: Difficulty;
    playstyle: string[];
    gender: Gender;
}

export interface Champion extends ChampionLogic {
    id: string;
    name: string;
    description: string;
    image: string;
    percentage?: number;
}

// --- NEW INTERFACES FOR DETAIL SCREEN ---
export interface ChampionSkin {
    id: string;
    num: number;
    name: string;
    chromas: boolean;
    loadingUrl: string; // We will generate these
    splashUrl: string;
}
  
export interface ChampionSpell {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    cooldown: number[];
    cost: number[];
}

export interface ChampionDetail extends Champion {
    lore: string;
    title: string;
    skins: ChampionSkin[];
    spells: ChampionSpell[];
    passive: {
      name: string;
      description: string;
      imageUrl: string;
    };
}
// ----------------------------------------

export interface ChampQuestion {
    id: string;
    text: string;
    options: {
        text: string;
        nextQuestionId: string;
        traits: {
            gender?: Gender;
            damageType?: DamageType;
            tags?: string[]; 
            difficulty?: number;
            rangeType?: 'Melee' | 'Ranged';
        };
    }[];
}

export interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    lanePoints: Partial<Record<Lane, number>>; 
  }[];
}