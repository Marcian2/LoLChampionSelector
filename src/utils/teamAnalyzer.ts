import { Champion, Lane } from '../types';
import { CHAMPION_LOGIC } from '../data/champion_overrides';

export interface TeamAnalysis {
  score: number;
  warnings: string[];
  suggestions: string[];
}

type TeamMap = { [key in Lane]: Champion | null };

export const analyzeTeam = (team: TeamMap): TeamAnalysis => {
  let score = 100;
  const warnings: string[] = [];
  const suggestions: string[] = [];

  const champions = Object.values(team).filter((c): c is Champion => c !== null);

  if (champions.length < 5) {
    warnings.push("⚠️ Team is incomplete. Analysis may be inaccurate.");
    score -= (5 - champions.length) * 10;
  }

  // Counters
  let adCount = 0;
  let apCount = 0;
  let tankCount = 0; // Frontline
  let ccCount = 0;

  champions.forEach(champ => {
    // Use override logic if available, or the champ object itself
    const logic = CHAMPION_LOGIC[champ.id] || champ;
    
    // Damage Profile
    if (logic.damageType === 'AD') adCount++;
    if (logic.damageType === 'AP') apCount++;
    if (logic.damageType === 'Hybrid') { adCount += 0.5; apCount += 0.5; }
    
    // Frontline
    if (logic.damageType === 'Tank' || logic.playstyle.includes('Fighter') || logic.playstyle.includes('Tank')) {
        tankCount++;
    }

    // CC
    if (logic.playstyle.includes('CC') || logic.playstyle.includes('Engage')) {
        ccCount++;
    }
  });

  // 1. Damage Profile Rules
  if (adCount >= 3.5) { // 4 or more roughly
    warnings.push("⚠️ Heavy Physical Damage. Enemies will stack Armor.");
    suggestions.push("Consider swapping a lane for an AP champion (Mage/Assassin).");
    score -= 10;
  }
  if (apCount >= 3.5) {
    warnings.push("⚠️ Heavy Magic Damage. Enemies will stack MR.");
    suggestions.push("Consider adding an AD Marksman or Fighter.");
    score -= 10;
  }

  // 2. Frontline Check
  if (tankCount === 0) {
    warnings.push("❌ No Frontline. You have no Tanks or Fighters.");
    suggestions.push("Your team needs a tank in Top, Jungle, or Support.");
    score -= 20;
  } else if (tankCount === 1) {
    suggestions.push("ℹ️ Solo Frontline. Ensure your tank is durable.");
  }

  // 3. CC Check
  if (ccCount < 2) {
    warnings.push("⚠️ Low Crowd Control. Hard to lock down enemies.");
    suggestions.push("Pick a Support or Jungler with hard CC (Amumu, Leona, Nautilus).");
    score -= 10;
  }

  return { score: Math.max(0, score), warnings, suggestions };
};
