import { useState } from 'react';
import { GameProvider } from './contexts/GameContext';
import { DialogProvider } from './contexts/DialogContext';
import { IngameMessage } from './components/IngameMessage';
import { ChapterTransition } from './components/ChapterTransition/ChapterTransition';
import GameWorld from './components/GameWorld/GameWorld';
import Character from './components/Character/Character';
import { CHAPTER_PROLOGUE } from './components/Chapters/ChapterPrologue';
import { CHAPTER_1 } from './components/Chapters/Chapter1';
import './App.css';

const ALL_CHAPTERS = [CHAPTER_PROLOGUE, CHAPTER_1];

function App() {
  // смена главы
  const [chapterIndex, setChapterIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionText, setTransitionText] = useState('');
  const currentChapter = ALL_CHAPTERS[chapterIndex];
  // координаты спавна
  const [currentLocation, setCurrentLocation] = useState<string>(currentChapter.startLocation);
  const [spawnPoint, setSpawnPoint] = useState(currentChapter.startSpawn);

  const handleLocationChange = (location: string, spawnCoords?: { x: number; y: number }) => {
    setCurrentLocation(location);
    if (spawnCoords) {
      setSpawnPoint(spawnCoords);
    }
  };

  // переход к следующей главе + экран перехода
  const goToNextChapter = () => {
    if (chapterIndex < ALL_CHAPTERS.length - 1) {
      const currentChapter = ALL_CHAPTERS[chapterIndex];
      const nextChapter = ALL_CHAPTERS[chapterIndex + 1];
      setTransitionText(getTransitionText(currentChapter.id, nextChapter.id));
      setIsTransitioning(true);
      setTimeout(() => {
        setChapterIndex(chapterIndex + 1);
        setCurrentLocation(nextChapter.startLocation);
        setSpawnPoint(nextChapter.startSpawn);
        setIsTransitioning(false);
      }, 5000);
    }
  };

  // текст перехода к главе
  const getTransitionText = (currentId: string, nextId: string) => {
    if (currentId === 'prologue' && nextId === 'chapter1') {
      return 'Глава 1';
    }
    return '...';
  };

  const renderLocation = () => {
    return currentChapter.getLocationComponent(
      currentLocation, 
      handleLocationChange,
      goToNextChapter
    );
  };

  return (
    <DialogProvider>
      <GameProvider>
        <div className="App">
          <GameWorld spawnPoint={spawnPoint}>
            {renderLocation()}
            <Character />
          </GameWorld>
          <IngameMessage />
          {isTransitioning && (
            <ChapterTransition 
              duration={5000}
              text={transitionText}
            />
          )}
        </div>
      </GameProvider>
    </DialogProvider>
  );
}

export default App;