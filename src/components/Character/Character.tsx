import React, { useRef, useEffect } from 'react';
import { useKeyboardControls } from '../../hooks';
import { useGame } from '../../contexts/GameContext';
import { useSpriteManager } from '../../hooks/useSpriteManager';
import { useAnimation } from '../../hooks';
import { GAME_CONFIG } from '../../constants';
import './Character.css';

const Character: React.FC = () => {
  const { direction } = useKeyboardControls();
  const { gameState } = useGame();
  const { currentFrame } = useAnimation(gameState.isWalking);
  const { loaded, getStaticSprite, getWalkSprite } = useSpriteManager();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!loaded || !canvasRef.current) return;
    // ссылка на холст
    const canvas = canvasRef.current;
    // контекст для 2д рисования и графики
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // очистка старого спрайта
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // выбор спрайта - либо движение, либо статичный
    const sprite = gameState.isWalking 
      ? getWalkSprite(currentFrame)
      : getStaticSprite();
    // отрисовка
    if (sprite) {
      ctx.drawImage(sprite, 0, 0, canvas.width, canvas.height);
    }
  }, [loaded, gameState.isWalking, currentFrame]);

  return (
    <div className="character-container">
      <div className="character-shadow" />
      <canvas
        ref={canvasRef}
        width={GAME_CONFIG.CHARACTER.WIDTH}
        height={GAME_CONFIG.CHARACTER.HEIGHT}
        className={`character ${direction === 'left' ? 'character-facing-left' : 'character-facing-right'}`}
        style={{
          width: `${GAME_CONFIG.CHARACTER.WIDTH / 2}px`,
          height: `${GAME_CONFIG.CHARACTER.HEIGHT / 2}px`
        }}
      />
    </div>
  );
};

export default Character;