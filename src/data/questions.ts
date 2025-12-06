import { Question } from '../types';

export const questions: Question[] = [
  // 1. The Social Aspect (Solo vs Team)
  {
    id: 1,
    text: "You are dropped into a chaotic battlefield. What is your first instinct?",
    options: [
      { 
        text: "Leave me alone. I want to fight a 1v1 duel to the death.", 
        lanePoints: { Top: 10, Mid: 2 } 
      },
      { 
        text: "I want to control the map and ambush enemies from the shadows.", 
        lanePoints: { Jungle: 10, Mid: 2 } 
      },
      { 
        text: "I want to stick with a partner and watch each other's backs.", 
        lanePoints: { ADC: 5, Support: 5 } 
      },
    ]
  },

  // 2. The Responsibility (Carry vs Utility)
  {
    id: 2,
    text: "The game is on the line. Who should take the final shot?",
    options: [
      { 
        text: "ME. I am the main character. Give me the resources.", 
        lanePoints: { ADC: 8, Mid: 8, Top: 3 } 
      },
      { 
        text: "Not me. I set up the play so someone else can score.", 
        lanePoints: { Support: 10, Jungle: 5 } 
      },
      { 
        text: "I don't care about glory, I just want to disrupt the enemy team.", 
        lanePoints: { Top: 5, Jungle: 5, Support: 2 } 
      },
    ]
  },

  // 3. The "Toxic" Trait (Personality Filter)
  {
    id: 3,
    text: "What annoys you the most?",
    options: [
      { 
        text: "People interrupting my 1v1 fight.", 
        lanePoints: { Top: 8 } 
      },
      { 
        text: "Being blamed for everything that goes wrong on the map.", 
        lanePoints: { Jungle: 10 } 
      },
      { 
        text: "Depending on a teammate who plays badly.", 
        lanePoints: { ADC: 5, Support: 5 } 
      },
      { 
        text: "Not being able to roam and help other lanes.", 
        lanePoints: { Mid: 8, Support: 3 } 
      }
    ]
  },

  // 4. Resource Management (Gold vs XP)
  {
    id: 4,
    text: "How do you feel about farming (killing minions for gold)?",
    options: [
      { 
        text: "I love it. I want perfect CS (Creep Score).", 
        lanePoints: { ADC: 10, Mid: 5, Top: 5 } 
      },
      { 
        text: "It's boring. I'd rather fight players or roam.", 
        lanePoints: { Support: 10, Jungle: 8 } 
      },
      { 
        text: "I farm champions, not minions.", 
        lanePoints: { Mid: 5, Jungle: 2 } 
      }
    ]
  },

  // 5. The Power Fantasy (Archetype)
  {
    id: 5,
    text: "Pick your ideal fantasy archetype:",
    options: [
      { 
        text: "The Unstoppable Juggernaut (Raid Boss).", 
        lanePoints: { Top: 10 } 
      },
      { 
        text: "The Mastermind / 300 IQ Tactician.", 
        lanePoints: { Jungle: 10, Support: 3 } 
      },
      { 
        text: "The Glass Cannon (High Damage, Low Health).", 
        lanePoints: { ADC: 10, Mid: 5 } 
      },
      { 
        text: "The Combo Mage / Assassin.", 
        lanePoints: { Mid: 10 } 
      },
      { 
        text: "The Guardian / Healer / Playmaker.", 
        lanePoints: { Support: 10 } 
      }
    ]
  },
  
  // 6. Attention Span (Focus)
  {
    id: 6,
    text: "Where are your eyes usually looking?",
    options: [
      { 
        text: "Only at my opponent in front of me.", 
        lanePoints: { Top: 8, ADC: 5 } 
      },
      { 
        text: "At the minimap. I track everyone.", 
        lanePoints: { Jungle: 10, Support: 5, Mid: 5 } 
      },
      { 
        text: "At my own health bar (panic).", 
        lanePoints: { Support: 2 } 
      }
    ]
  }
];