import React from 'react';
import { useGame } from '../../../contexts/GameContext';
import InteractiveObject from '../InteractiveObject/InteractiveObject';
import './Door.css';

interface DoorProps {
  id: string;
  position: { x: number; y: number };
  targetLocation: string;
  onInteract: () => void;
  sprite?: string;
  active?: boolean;
}

export const Door: React.FC<DoorProps> = ({
  id,
  position,
  onInteract,
  sprite,
  active = true
}) => {
  const { gameState } = useGame();
  const handleInteract = () => {
    if (!active) {
      return;
    }
    onInteract();
  };

  const screenX = position.x + gameState.position.x;
  const screenY = position.y + gameState.position.y;

  return (
    <>
      <InteractiveObject
        id={id}
        type="door"
        position={position}
        sprite={sprite}
        interactionRadius={60}
        onInteract={handleInteract}
        clickRadius={60}
        width={90}
        height={170}
      />
      <div 
        className="door-label"
        style={{
          position: 'absolute',
          left: `${screenX}px`,
          top: `${screenY - 100}px`,
          transform: 'translateX(-50%)'
        }}
      >
        Дверь
      </div>
    </>
  );
};

export default Door;