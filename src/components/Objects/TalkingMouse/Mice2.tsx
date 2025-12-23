import React from 'react';
import { useGame } from '../../../contexts/GameContext';
import InteractiveObject from '../InteractiveObject/InteractiveObject';

interface Mice2Props {
  position?: { x: number; y: number };
}

export const Mice2: React.FC<Mice2Props> = ({ 
  position = { x: 300, y: 200 }
}) => {
  const { gameState } = useGame();

  const handleInteract = () => {
    console.log('Мышки пищат');
  };

  return (
    <InteractiveObject
      id="mice_group_2"
      type="mice"
      position={position}
      sprite="/assets/images/objects/mice2.png"
      interactionRadius={100}
      onInteract={handleInteract}
      clickRadius={100}
      width={380}
      height={200}
    />
  );
};

export default Mice2;