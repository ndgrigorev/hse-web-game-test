import React, { useEffect } from 'react';
import Background from '../../Background/Background';
import { InteractiveObjectRenderer } from '../../Objects/InteractiveObjectRenderer/InteractiveObjectRenderer';
import { Door } from '../../Objects/Door/Door';
import { useZoneMessages } from '../../../hooks/game/useZoneMessage';

interface ShopProps {
  // двери для смены локаций
  onLocationChange: (location: string, spawnCoords?: { x: number; y: number }) => void;
  updateLocationConfig?: (config: any) => void; // дата в GameWorld
  config: any;
}

// !!! аналог (Basement.tsx) прокомментирован подробнее, смотреть его !!!

export const Shop: React.FC<ShopProps> = ({ 
  onLocationChange, 
  updateLocationConfig,
  config
}) => {
  useZoneMessages(config.zoneMessages);

  useEffect(() => {
    if (updateLocationConfig) {
      updateLocationConfig(config);
    }
  }, [updateLocationConfig, config]);

  return (
    <>
      <Background config={config}/> {/* debug={false} />*/}
      {config.objects && config.objects.map((obj: any) => (
        <InteractiveObjectRenderer
          key={obj.id}
          object={obj}
          onLocationChange={onLocationChange}
        />
      ))}
      
      {config.doors.map((door: any) => (
        <Door
          key={door.id}
          id={door.id}
          position={door.position}
          targetLocation={door.targetLocation}
          onInteract={() => onLocationChange(door.targetLocation, door.spawnCoords)}
          sprite={door.sprite}
        />
      ))}
    </>
  );
};