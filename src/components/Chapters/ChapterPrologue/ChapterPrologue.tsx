import { Basement } from '../../Locations/Basement/Basement';
import { Room } from '../../Locations/Room/Room';
import { BASEMENT_PROLOGUE_CONFIG } from '../../Locations/Basement/BasementPrologue.config';
import { ROOM_PROLOGUE_CONFIG } from '../../Locations/Room/RoomPrologue.config';

let prologue_target_reached = false;
let checkInterval: number | null = null;

export const CHAPTER_PROLOGUE = {
  id: 'prologue' as const,
  name: 'prologue',
  startLocation: 'room' as const,
  startSpawn: { x: -280, y: -150 },
  
  getLocationComponent: (
    location: string, 
    onLocationChange: (location: string, spawnCoords?: { x: number; y: number }) => void,
    onChapterComplete?: () => void
  ) => {
    if (checkInterval) {
      clearInterval(checkInterval);
      checkInterval = null;
    }
    // логика главы - достижение координаты -1400 в Basement
    if (location === 'basement' && !prologue_target_reached) {
      checkInterval = window.setInterval(() => {
        const background = document.querySelector('.background-image');
        if (!background) return;
        const bgStyle = getComputedStyle(background);
        const bgLeft = parseFloat(bgStyle.left);        
        if (bgLeft <= -1400) {
          prologue_target_reached = true;
          if (checkInterval) {
            clearInterval(checkInterval);
            checkInterval = null;
          }
        }
      }, 100);
    }
    
    if (location === 'room' && prologue_target_reached && onChapterComplete) {
      setTimeout(() => {
        onChapterComplete();
        prologue_target_reached = false;
      }, 3000);
    }

    switch (location) {
      case 'basement':
        return <Basement onLocationChange={onLocationChange} config={BASEMENT_PROLOGUE_CONFIG} />;
      case 'room':
        return <Room onLocationChange={onLocationChange} config={ROOM_PROLOGUE_CONFIG} />;
      default:
        return <Basement onLocationChange={onLocationChange} config={BASEMENT_PROLOGUE_CONFIG} />;
    }
  }
};