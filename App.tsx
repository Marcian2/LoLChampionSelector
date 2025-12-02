import { useState } from 'react';
import { Lane } from './src/types'; 

// DATA IMPORTS (Matching src/data/)
import { questions as laneQuestions } from './src/data/questions';
import { champion_questions } from './src/data/champion_questions';
import { champions as championDatabase } from './src/data/champions';

// SCREEN IMPORTS (Matching src/screens/)
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { LaneQuizScreen } from './src/screens/LaneQuizScreen'; // Matches your rename
import { ChampionQuizScreen } from './src/screens/ChampionQuizScreen';
import { ResultScreen } from './src/screens/ResultScreen';

// LOGIC IMPORTS (Matching src/utils/)
import { UserPreferences, findBestChampions } from './src/utils/matcher';

// Define the valid screens for our App
type ScreenState = 'WELCOME' | 'LANE_QUIZ' | 'CHAMPION_QUIZ' | 'RESULT';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('WELCOME');

  // --- STATE: LANE QUIZ ---
  const [laneIndex, setLaneIndex] = useState(0);
  const [laneScores, setLaneScores] = useState<Record<Lane, number>>({
    Top: 0, Jungle: 0, Mid: 0, ADC: 0, Support: 0
  });

  // --- STATE: CHAMPION QUIZ ---
  const [champIndex, setChampIndex] = useState(0);
  const [userTraits, setUserTraits] = useState<UserPreferences>({});
  
  // --- STATE: RESULTS ---
  // We use simple strings to make the ResultScreen flexible
  const [resultTitle, setResultTitle] = useState("");
  const [resultMain, setResultMain] = useState("");
  const [resultSub, setResultSub] = useState("");
  const [resultImage, setResultImage] = useState<string | undefined>(undefined); 
  // ==========================
  // LOGIC 1: LANE QUIZ
  // ==========================
  const startLaneQuiz = () => {
    setLaneScores({ Top: 0, Jungle: 0, Mid: 0, ADC: 0, Support: 0 });
    setLaneIndex(0);
    setCurrentScreen('LANE_QUIZ');
  };

  const handleLaneAnswer = (points: Partial<Record<Lane, number>>) => {
    const newScores = { ...laneScores };
    (Object.keys(points) as Lane[]).forEach((lane) => {
      newScores[lane] += points[lane] || 0;
    });
    setLaneScores(newScores);

    if (laneIndex + 1 >= laneQuestions.length) {
      // Calculate Winner
      const sorted = Object.entries(newScores).sort(([, a], [, b]) => b - a);
      const winner = sorted[0]; // e.g. ["Mid", 15]
      
      setResultTitle("You belong in:");
      setResultMain(winner[0]); // "Mid"
      setResultSub(`Score: ${winner[1]}`);
      setResultImage(undefined);
      setCurrentScreen('RESULT');
    } else {
      setLaneIndex(laneIndex + 1);
    }
  };

  // ==========================
  // LOGIC 2: CHAMPION QUIZ
  // ==========================
  const startChampionQuiz = () => {
    setUserTraits({});
    setChampIndex(0);
    setCurrentScreen('CHAMPION_QUIZ');
  };

  const handleChampionAnswer = (newTraits: UserPreferences) => {
    // Merge new answer into our shopping cart
    const updatedTraits = { ...userTraits, ...newTraits };
    setUserTraits(updatedTraits);

    if (champIndex + 1 >= champion_questions.length) {
      // Calculate Winner using your Matcher
      const results = findBestChampions(updatedTraits, championDatabase);
      const bestChamp = results[0]; // Get the #1 result

      setResultTitle("Your Champion is:");
      // Fallback in case no champion matches (e.g. database is small)
      setResultMain(bestChamp ? bestChamp.name : "Teemo"); 
      setResultSub(bestChamp ? bestChamp.description : "You are unique!");
      setResultImage(bestChamp ? bestChamp.image : undefined);
      setCurrentScreen('RESULT');
    } else {
      setChampIndex(champIndex + 1);
    }
  };

  const goHome = () => {
    setCurrentScreen('WELCOME');
  };

  // ==========================
  // RENDER SWITCH
  // ==========================
  
  if (currentScreen === 'RESULT') {
    return (
      <ResultScreen 
        winnerLane={resultMain}   
        winnerScore={resultSub}   
        heroImage={resultImage}
        onRestart={goHome} 
      />
    );
  }

  if (currentScreen === 'LANE_QUIZ') {
    return (
      <LaneQuizScreen 
        question={laneQuestions[laneIndex]}
        currentQuestionIndex={laneIndex}
        totalQuestions={laneQuestions.length}
        onAnswer={handleLaneAnswer}
      />
    );
  }

  if (currentScreen === 'CHAMPION_QUIZ') {
    return (
      <ChampionQuizScreen 
        question={champion_questions[champIndex]}
        currentQuestionIndex={champIndex}
        totalQuestions={champion_questions.length}
        onAnswer={handleChampionAnswer}
      />
    );
  }

  // Default: Welcome Screen
  return (
    <WelcomeScreen 
      onStartLaneQuiz={startLaneQuiz}
      onStartChampionQuiz={startChampionQuiz}
    />
  );
}