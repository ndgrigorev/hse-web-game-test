import React from 'react';
import TalkingMouse from '../TalkingMouse/TalkingMouse';
import Mice2 from '../TalkingMouse/Mice2';
import Door from '../Door/Door';
import RatFood from '../RatFood/RatFood';
import type { GameObject } from '../../../types';

interface InteractiveObjectRendererProps {
  object: GameObject;
  onLocationChange?: (location: string, spawnCoords?: { x: number; y: number }) => void;
}

// единый отрисовщик для всех объектов

export const InteractiveObjectRenderer: React.FC<InteractiveObjectRendererProps> = ({
  object,
  onLocationChange
}) => {
  switch (object.type) {
    case 'mouse':
      return (
        <TalkingMouse
          key={object.id}
          position={object.position}
          triggerZone={object.triggerZone}
        />
      );
    
    case 'mice2':
      return (
        <Mice2
          key={object.id}
          position={object.position}
        />
      );
    
    case 'ratfood':
      return (
        <RatFood
          key={object.id}
          position={object.position}
        />
      );
    
    case 'door':
      if (!object.targetLocation) {
        return null;
      }
      return (
        <Door
          key={object.id}
          id={object.id}
          position={object.position}
          targetLocation={object.targetLocation}
          onInteract={() => onLocationChange?.(object.targetLocation!, object.spawnCoords)}
          sprite={object.sprite}
        />
      );
  
    default:
      return null;
  }
};