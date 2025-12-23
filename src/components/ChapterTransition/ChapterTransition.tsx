import React, { useEffect, useState } from 'react';
import './ChapterTransition.css';

interface ChapterTransitionProps {
  duration?: number;
  text?: string; // дебаг, удалить
  onComplete?: () => void;
}

// экран постепенно чернеет
// через 400мс появляется надпись "Глава ..."
// через 7с после начала все прпоадает

export const ChapterTransition: React.FC<ChapterTransitionProps> = ({
  duration = 7000, // время темного экрана
  text = '',
  onComplete
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  
    const textTimer = setTimeout(() => {
      setIsTextVisible(true);
    }, 400);// текст на экране спустя 400мс
    const completeTimer = setTimeout(() => { // завершение
      setIsVisible(false);
      setIsTextVisible(false);
      onComplete?.();
    }, duration);
    return () => {
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="chapter-transition">
      <div className="chapter-transition-overlay" />
      <div className={`chapter-transition-text ${isTextVisible ? 'visible' : ''}`}>
        {text}
      </div>
    </div>
  );
};