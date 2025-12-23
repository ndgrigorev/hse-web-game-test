import React, { useEffect } from 'react';
import Background from '../../Background/Background';
import { TalkingMouse, Door } from '../../Objects';
import { SCRAPYARD_CONFIG } from './Scrapyard.config';

interface ScrapyardProps {
  // двери для смены локаций
  onLocationChange: (location: string, spawnCoords?: { x: number; y: number }) => void;
  updateLocationConfig?: (config: any) => void; // дата в GameWorld
}

// !!! аналог (Basement.tsx) прокомментирован подробнее, смотреть его !!!

export const Scrapyard: React.FC<ScrapyardProps> = ({ onLocationChange, updateLocationConfig }) => {
  useEffect(() => {
    if (updateLocationConfig) {
      updateLocationConfig(SCRAPYARD_CONFIG);
    }
  }, [updateLocationConfig]);

  return (
    <>
      <Background config={SCRAPYARD_CONFIG}/> {/* debug={false} />*/}
      
      {SCRAPYARD_CONFIG.objects && SCRAPYARD_CONFIG.objects.map(obj => {
        if (obj.type === 'mouse') {
          return (
            <TalkingMouse
              key={obj.id}
              position={obj.position}
            />
          );
        }
        return null;
      })}
      
      {SCRAPYARD_CONFIG.doors.map(door => (
        <Door
          key={door.id}
          id={door.id}
          position={door.position}
          targetLocation={door.targetLocation}
          onInteract={() => onLocationChange(door.targetLocation, door.spawnCoords)}
        />
      ))}
    </>
  );
};