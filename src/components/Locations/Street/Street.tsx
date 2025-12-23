import React, { useEffect, useRef } from 'react';
import Background from '../../Background/Background';
import { Door } from '../../Objects';
import { STREET_CONFIG } from './Street.config';
import { useZoneMessages } from '../../../hooks/game/useZoneMessage';

interface StreetProps {
  // двери для смены локаций
  onLocationChange: (location: string, spawnCoords?: { x: number; y: number }) => void;
  updateLocationConfig?: (config: any) => void; // дата в GameWorld
}

export const Street: React.FC<StreetProps> = ({ onLocationChange, updateLocationConfig }) => {
  const { debugInfo } = useZoneMessages(STREET_CONFIG.zoneMessages);
  
  useEffect(() => {
    if (updateLocationConfig) {
      updateLocationConfig(STREET_CONFIG);
    }
  }, [updateLocationConfig]);

  return (
    <>
      <Background config={STREET_CONFIG}/> {/* debug={false} />*/}
      
      {STREET_CONFIG.doors.map(door => (
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