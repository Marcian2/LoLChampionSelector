import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    text: "You are placed in a warzone. How do you prefer to fight?",
    options: [
      { text: "I want to brawl 1v1 on an island.", lanePoints: { Top: 5, Mid: 2 } },
      { text: "I want to be the stealthy tactician.", lanePoints: { Jungle: 5 } },
      { text: "I want to fight alongside a partner.", lanePoints: { ADC: 5, Support: 5 } },
    ]
  },
  {
    id: 2,
    text: "Do you prefer to do damage or protect others?",
    options: [
      { text: "I want to be the Carry (Big Damage).", lanePoints: { ADC: 5, Mid: 5, Top: 2 } },
      { text: "I want to save my teammates.", lanePoints: { Support: 5, Jungle: 2 } },
      { text: "I want to be a Tank frontliner.", lanePoints: { Top: 5, Support: 3, Jungle: 3 } },
    ]
  },
  {
    id: 3,
    text: "How good are you at last-hitting minions (farming)?",
    options: [
      { text: "I love farming gold perfectly.", lanePoints: { ADC: 5, Mid: 5, Top: 5 } },
      { text: "I hate farming, I just want to fight.", lanePoints: { Support: 5, Jungle: 5 } },
    ]
  },
  {id: 4,
    text: "Do you enjoy playing around someone or stay alone?",
    options: [
        { text: "Alone sounds fun" , lanePoints: { Jungle : 5, Top : 3, Mid: 3 } },
        { text: "I like spending time with someone", lanePoints: { ADC: 5, Support: 5} },
    ]
  }
];