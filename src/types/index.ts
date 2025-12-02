export type Lane = 'Top' | 'Jungle' | 'Mid' | 'ADC' | 'Support';
export type DamageType = 'AD' | 'AP' | 'Hybrid' | 'Tank';
export type Difficulty = 1 | 2 | 3 | 4 | 5;
export type Gender = 'Male' | 'Female' | 'Monster' | 'Other';

export interface Champion {
    id: string;
    name: string;
    roles: Lane[];
    damageType: DamageType;
    difficulty: Difficulty;
    playstyle: string[];
    gender: Gender;
    description: string;
    image: string; // will add
}

export interface ChampQuestion {
    id: number,
    text: string,
    options:{
        text: string;
        traits: {
            gender?: Gender;
            damageType?: DamageType;
            tag?: string; //maps to playstyle Assasin, Aoe etc
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