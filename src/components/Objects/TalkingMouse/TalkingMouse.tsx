import React, { memo, useCallback, useState, useEffect } from 'react';
import { useGame } from '../../../contexts/GameContext';
import InteractiveObject from '../InteractiveObject/InteractiveObject';

interface TalkingMouseProps {
  position?: { x: number; y: number };
  triggerZone?: {
    x_left: number;
    x_right: number;
  };
}

export const TalkingMouse: React.FC<TalkingMouseProps> = memo(({ 
  position = { x: 300, y: 200 },
  triggerZone
}) => {
  const { gameState } = useGame();
  const [mouseState, setMouseState] = useState(0);
  const handleInteract = useCallback(() => {
    setMouseState(prev => prev === 1 ? 1 : 0);
  }, []);

  useEffect(() => {
    if (triggerZone && mouseState === 0) {
      const characterScreenX = 400;
      const characterWorldX = characterScreenX + gameState.position.x;
      const inZone = characterWorldX >= triggerZone.x_left && characterWorldX <= triggerZone.x_right;
      if (inZone) {
        setMouseState(1);
      }
    }
  }, [gameState.position, triggerZone, mouseState]);

  const mouseImage = mouseState === 0 
    ? "/assets/images/objects/mouse_trap.png" 
    : "/assets/images/objects/mice.png";

  return (
    <InteractiveObject
      id="talking_mouse_1"
      type="mouse"
      position={position}
      sprite={mouseImage}
      interactionRadius={100}
      onInteract={handleInteract}
      clickRadius={100}
      width={300} 
      height={200}
    />
  );
});

export default TalkingMouse;