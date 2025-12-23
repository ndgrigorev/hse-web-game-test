import React, { useEffect } from 'react';
import Background from '../../Background/Background';
import { InteractiveObjectRenderer } from '../../Objects/InteractiveObjectRenderer/InteractiveObjectRenderer';
import { Door } from '../../Objects/Door/Door';
import { useZoneMessages } from '../../../hooks/game/useZoneMessage';

interface BasementProps {
  // двери для смены локаций
  onLocationChange: (location: string, spawnCoords?: { x: number; y: number }) => void; // передается из Chapter
  updateLocationConfig?: (config: any) => void; // передаётся через GameWorld
  config: any; // передается из Chapter
}

export const Basement: React.FC<BasementProps> = ({ 
  onLocationChange, 
  updateLocationConfig,
  config
}) => {
  useZoneMessages(config.zoneMessages);

  useEffect(() => { // функция передачи конфига локации в GameWorld
    if (updateLocationConfig) {
      updateLocationConfig(config);
    }
  }, [updateLocationConfig, config]); // вызов функции при первой отрисовке Basement. config излишен как параемтр

  return (
    <>
      <Background config={config}/> {/* debug={false}/> */}

      {config.objects && config.objects.map((obj: any) => (
        <InteractiveObjectRenderer
          key={obj.id}
          object={obj}
          onLocationChange={onLocationChange}
        />
      ))}
      {config.doors.map((door: any) => ( // дверь всегда есть, не превращать её в интерактивный объект
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