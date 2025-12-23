import React, { useEffect } from 'react';
import { useGame } from '../../../contexts/GameContext';
import './InteractiveObject.css';

interface InteractiveObjectProps {
  id: string;
  type: string;
  position: { x: number; y: number };
  sprite?: string;
  interactionRadius: number;
  onInteract: () => void;
  clickRadius?: number;
  width?: number;
  height?: number;
}

export const InteractiveObject: React.FC<InteractiveObjectProps> = ({
  id,
  type,
  position,
  sprite,
  interactionRadius,
  onInteract,
  width = 50,
  height = 50,
}) => {
  const { gameState } = useGame();
  const objectScreenX = position.x + gameState.position.x;
  const objectScreenY = position.y + gameState.position.y;

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const gameContainer = document.querySelector('.game-container');
      const gameWorld = document.querySelector('.game-world');
      
      if (!gameContainer || !gameWorld) return;
      // из-за реализованного адаптива экрана приходится по-сложному рассчитывать хитбокс
      const containerRect = gameContainer.getBoundingClientRect();
      const worldRect = gameWorld.getBoundingClientRect();
      const scaleX = worldRect.width / gameWorld.clientWidth;
      const scaleY = worldRect.height / gameWorld.clientHeight;
      const scale = Math.min(scaleX, scaleY);
      const mouseX = (event.clientX - containerRect.left) / scale;
      const mouseY = (event.clientY - containerRect.top) / scale;
      const hitboxLeft = objectScreenX - width / 2;
      const hitboxTop = objectScreenY - height / 2;
      const isInside = 
      mouseX >= hitboxLeft && 
      mouseX <= hitboxLeft + width && 
      mouseY >= hitboxTop && 
      mouseY <= hitboxTop + height;
      if (isInside) {
        onInteract();
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [objectScreenX, objectScreenY, width, height, onInteract]);

  if (!sprite) return null;

  return (
    <img 
      src={sprite} 
      alt={id} 
      className="interactive-object-sprite"
      style={{
        position: 'absolute',
        left: objectScreenX - width / 2,
        top: objectScreenY - height / 2,
        width: `${width}px`,
        height: `${height}px`,
        objectFit: 'contain',
        pointerEvents: 'none'
      }}
    />
  );
};

export default InteractiveObject;