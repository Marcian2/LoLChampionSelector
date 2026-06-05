import { Champion } from '../types';
import { CHAMPION_LOGIC } from '../data/champion_overrides';

export interface MatchupAnalysis {
  tips: string[];
  summary: string;
}

export const analyzeMatchup = (allies: Champion[], enemies: Champion[]): MatchupAnalysis => {
  const tips: string[] = [];
  let summary = "";

  // --- 1. DEFENSE GUIDE (Damage Profile) ---
  let apCount = 0;
  let adCount = 0;
  let totalDamageSources = 0;

  enemies.forEach(enemy => {
    // Use the logic from overrides if available, otherwise fallback to the enemy object
    // (The enemy object passed in might be from the API which might not have our custom tags, 
    // so we prefer looking up CHAMPION_LOGIC by ID if possible)
    const logic = CHAMPION_LOGIC[enemy.id] || enemy;
    
    if (logic.damageType === 'AP') {
      apCount++;
      totalDamageSources++;
    } else if (logic.damageType === 'AD') {
      adCount++;
      totalDamageSources++;
    } else if (logic.damageType === 'Hybrid') {
      apCount += 0.5;
      adCount += 0.5;
      totalDamageSources++;
    }
    // Tanks don't contribute heavily to the "Damage Profile" calculation for defensive itemization 
    // in this simplified model, or we could count them based on their typical damage. 
    // For now, we follow the user's rule strictly on AD/AP ratios.
  });

  if (totalDamageSources > 0) {
    const apRatio = apCount / totalDamageSources;
    const adRatio = adCount / totalDamageSources;

    if (apRatio >= 0.7) {
      tips.push("⚠️ High Magic Damage Threat. Rush Mercury's Treads and Maw of Malmortius.");
    } else if (adRatio >= 0.7) {
      tips.push("⚠️ High Physical Damage Threat. Build Plated Steelcaps and Armor items.");
    } else {
      tips.push("ℹ️ Mixed Damage Threat. Build defensive boots based on your lane opponent.");
    }
  }

  // --- 2. TEAMFIGHT STYLE ---
  const hardEngageThreats = ['Amumu', 'Malphite', 'Leona', 'Fiddlesticks', 'Kennen', 'Neeko'];
  const hookThreats = ['Blitzcrank', 'Thresh', 'Nautilus', 'Pyke'];

  const hasHardEngage = enemies.some(e => hardEngageThreats.includes(e.id) || (CHAMPION_LOGIC[e.id]?.playstyle.includes('Engage') && CHAMPION_LOGIC[e.id]?.playstyle.includes('AoE')));
  const hasHooks = enemies.some(e => hookThreats.includes(e.id) || CHAMPION_LOGIC[e.id]?.playstyle.includes('Hook'));

  if (hasHardEngage) {
    tips.push("⚠️ Heavy AoE Engage detected! Split up in teamfights. Do not group tightly.");
  }
  
  if (hasHooks) {
    tips.push("⚠️ Hook Champions detected! Stand behind minions and watch for level 1 invades.");
  }

  // --- 3. WIN CONDITION ---
  let allyScaling = 0;
  let enemyScaling = 0;
  let allyLaneBullies = 0;

  allies.forEach(a => {
    const logic = CHAMPION_LOGIC[a.id];
    if (logic?.playstyle.includes('Scaling')) allyScaling++;
    if (logic?.playstyle.includes('LaneBully')) allyLaneBullies++;
  });

  enemies.forEach(e => {
    const logic = CHAMPION_LOGIC[e.id];
    if (logic?.playstyle.includes('Scaling')) enemyScaling++;
  });

  if (allyScaling > enemyScaling) {
    summary = "✅ SCALING ADVANTAGE: Your team outscales them. Play safe early, give up small objectives if needed, and win late game.";
  } else if (allyLaneBullies >= 2) {
    summary = "🔥 EARLY AGGRESSION: Your team has strong lane bullies. You must win early! Invade, gank, and take tower plates before they scale.";
  } else {
    summary = "⚖️ SKILL MATCHUP: Teams are balanced. Focus on objectives and vision control.";
  }

  return { tips, summary };
};
