import { ChampionLogic } from '../types';
import { CHAMPION_LOGIC } from '../data/champion_overrides';

export interface GuideResult {
  text: string;
  url: string;
}

export const generateGuide = (championName: string): GuideResult => {
  // 1. Find the champion logic
  // We need to find the key in CHAMPION_LOGIC that matches the name case-insensitive
  const key = Object.keys(CHAMPION_LOGIC).find(
    k => k.toLowerCase() === championName.toLowerCase()
  );

  if (!key) {
    return {
      text: "I cannot find that champion in my archives.",
      url: ""
    };
  }

  const logic = CHAMPION_LOGIC[key];
  const { roles, playstyle, damageType } = logic;

  let build = "Recommended Build: ";
  let tip = "Oracle Tip: ";

  // --- BUILD LOGIC ---
  if (roles.includes('ADC') || playstyle.includes('Marksman')) {
    if (playstyle.includes('AttackSpeed')) {
        build += "Kraken Slayer, Guinsoo's Rageblade, Berserker's Greaves.";
    } else {
        build += "The Collector, Infinity Edge, Lord Dominik's Regards.";
    }
    tip += "Positioning is key. Stay behind your frontline and kite backwards.";
  } 
  else if (roles.includes('Support')) {
    if (playstyle.includes('Enchanter')) {
        build += "Moonstone Renewer, Redemption, Ardent Censer.";
        tip += "Focus on keeping your carry alive. Do not get caught warding alone.";
    } else if (playstyle.includes('Tank') || playstyle.includes('Engage')) {
        build += "Locket of the Iron Solari, Knight's Vow, Zeke's Convergence.";
        tip += "You are the shield. Engage when the enemy missteps, then peel for your team.";
    } else {
        // Mage supports like Brand/Lux
        build += "Zaz'Zak's Realmspike, Liandry's Torment, Rylai's Crystal Scepter.";
        tip += "Poke the enemy down in lane, but save mana for critical fights.";
    }
  }
  else if (playstyle.includes('Assassin')) {
    if (damageType === 'AD') {
        build += "Youmuu's Ghostblade, Opportunity, Edge of Night.";
    } else {
        build += "Lich Bane, Shadowflame, Rabadon's Deathcap.";
    }
    tip += "Look for flanks. Your job is to delete the enemy carry, not fight the tank.";
  }
  else if (playstyle.includes('Mage')) {
    if (playstyle.includes('Burst')) {
        build += "Luden's Companion, Shadowflame, Zhonya's Hourglass.";
    } else if (playstyle.includes('DoT') || playstyle.includes('Control')) {
        build += "Liandry's Torment, Rylai's Crystal Scepter, Cryptbloom.";
    } else {
        build += "Rod of Ages, Archangel's Staff, Rabadon's Deathcap.";
    }
    tip += "Control the wave and look for roams. Use your CC to catch enemies out of position.";
  }
  else if (playstyle.includes('Tank')) {
    build += "Heartsteel, Sunfire Aegis, Thornmail.";
    tip += "Soak up damage and disrupt the enemy team. You dictate when the fight starts.";
  }
  else if (playstyle.includes('Fighter') || playstyle.includes('Bruiser')) {
    if (damageType === 'AP') {
        build += "Riftmaker, Nashor's Tooth, Zhonya's Hourglass.";
    } else {
        build += "Stridebreaker, Black Cleaver, Sterak's Gage.";
    }
    tip += "You excel in extended trades. Conqueror is likely your best rune.";
  }
  else {
    // Fallback
    build += "Trinity Force, Sterak's Gage, Guardian Angel.";
    tip += "Adapt your build to the enemy team composition.";
  }

  // --- URL GENERATION ---
  // U.GG format: https://u.gg/lol/champions/[name]/build
  // Special cases: Nunu & Willump -> nunu, Dr. Mundo -> dr-mundo, etc.
  // Simple normalization: remove special chars, spaces to dashes? 
  // Actually U.GG usually just removes spaces and dots.
  // Let's try a simple regex.
  const normalizedName = key.toLowerCase().replace(/[^a-z0-9]/g, '');
  const url = `https://u.gg/lol/champions/${normalizedName}/build`;

  return {
    text: `${build}\n\n${tip}`,
    url: url
  };
};
