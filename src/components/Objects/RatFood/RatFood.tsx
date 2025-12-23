import React from 'react';
import InteractiveObject from '../InteractiveObject/InteractiveObject';
import { getChapter1Flag, setChapter1Flag } from '../../Chapters/Chapter1/flags';

interface RatFoodProps {
  position?: { x: number; y: number };
}

export const RatFood: React.FC<RatFoodProps> = ({ 
  position = { x: 500, y: 200 }
}) => {
  const isCollected = getChapter1Flag('rat_food_taken');

  const handleInteract = () => {
    if (!isCollected) {
      setChapter1Flag('rat_food_taken', true);
    }
  };
  if (isCollected) {
    return null;
  }

  return (
    <InteractiveObject
      id="rat_food"
      type="ratfood"
      position={position}
      sprite="/assets/images/objects/rat_food.png"
      interactionRadius={80}
      onInteract={handleInteract}
      clickRadius={80}
      width={100}
      height={160}
    />
  );
};

export default RatFood;