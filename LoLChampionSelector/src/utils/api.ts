import { Champion, ChampionDetail } from '../types';
import { CHAMPION_LOGIC } from '../data/champion_overrides';

const VERSION = '15.24.1'; 
const BASE_URL = `https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/en_US/champion.json`;
const LOADING_IMG_URL = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/`;

// New URLs for Deep Data
const DETAIL_URL = `https://ddragon.leagueoflegends.com/cdn/${VERSION}/data/en_US/champion/`;
const SPELL_IMG_URL = `https://ddragon.leagueoflegends.com/cdn/${VERSION}/img/spell/`;
const PASSIVE_IMG_URL = `https://ddragon.leagueoflegends.com/cdn/${VERSION}/img/passive/`;
const SPLASH_URL = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/`;

export const fetchChampions = async (): Promise<Champion[]> => {
  try {
    console.log("Fetching summary data...");
    const response = await fetch(BASE_URL);
    const json = await response.json();
    const riotData = json.data; 

    const validIds = Object.keys(CHAMPION_LOGIC);

    const mergedChampions: Champion[] = validIds.map((id) => {
      const riotChamp = riotData[id];
      const localLogic = CHAMPION_LOGIC[id];

      if (!riotChamp) return null;

      return {
        id: riotChamp.id,
        name: riotChamp.name,
        description: `${riotChamp.blurb.split('.')[0]}.`, 
        image: `${LOADING_IMG_URL}${riotChamp.id}_0.jpg`, 
        
        gender: localLogic.gender,
        damageType: localLogic.damageType,
        difficulty: localLogic.difficulty,
        playstyle: localLogic.playstyle,
        roles: localLogic.roles,
      };
    }).filter((c): c is Champion => c !== null); 

    return mergedChampions;
  } catch (error) {
    console.error("Failed to fetch champions:", error);
    return [];
  }
};

// --- NEW FUNCTION: GET DEEP DATA ---
export const fetchChampionDetail = async (id: string): Promise<ChampionDetail | null> => {
    try {
      console.log(`Fetching detail for ${id}...`);
      const response = await fetch(`${DETAIL_URL}${id}.json`);
      const json = await response.json();
      const data = json.data[id]; // Riot nests data inside the ID key
  
      // Merge with our local logic again to keep type consistency
      const localLogic = CHAMPION_LOGIC[id];

      return {
        ...data,
        ...localLogic, // Keep our tags/logic
        image: `${LOADING_IMG_URL}${id}_0.jpg`, // Base image
        
        // Enhance Skins with full URLs
        skins: data.skins.map((s: any) => ({
          ...s,
          loadingUrl: `${LOADING_IMG_URL}${id}_${s.num}.jpg`,
          splashUrl: `${SPLASH_URL}${id}_${s.num}.jpg`
        })),
        
        // Enhance Spells with full URLs
        spells: data.spells.map((s: any) => ({
          ...s,
          imageUrl: `${SPELL_IMG_URL}${s.image.full}`
        })),
        
        // Enhance Passive
        passive: {
          ...data.passive,
          imageUrl: `${PASSIVE_IMG_URL}${data.passive.image.full}`
        }
      };
    } catch (error) {
      console.error(`Failed to fetch detail for ${id}`, error);
      return null;
    }
  };