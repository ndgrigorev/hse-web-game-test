import { Basement } from '../../Locations/Basement/Basement';
import { Scrapyard } from '../../Locations/Scrapyard/Scrapyard';
import { Room } from '../../Locations/Room/Room';
import { Street } from '../../Locations/Street/Street';
import { Shop } from '../../Locations/Shop/Shop';
import { BASEMENT_CONFIG } from '../../Locations/Basement/Basement.config';
import { ROOM_CONFIG } from '../../Locations/Room/Room.config';
import { SHOP_CONFIG } from '../../Locations/Shop/Shop.config';

export const CHAPTER_1 = {
  id: 'chapter1' as const,
  name: 'chapter1',
  startLocation: 'room' as const,
  startSpawn: { x: -280, y: -150 },

  getLocationComponent: (
    location: string,
    onLocationChange: (location: string, spawnCoords?: { x: number; y: number }) => void,
    onChapterComplete?: () => void
  ) => {
    switch (location) {
      case 'basement':
        return <Basement onLocationChange={onLocationChange} config={BASEMENT_CONFIG} />;
      case 'scrapyard':
        return <Scrapyard onLocationChange={onLocationChange} />;
      case 'room':
        return <Room onLocationChange={onLocationChange} config={ROOM_CONFIG} />;
      case 'street':
        return <Street onLocationChange={onLocationChange} />;
      case 'shop':
        return <Shop onLocationChange={onLocationChange} config={SHOP_CONFIG} />;
      default:
        return <Basement onLocationChange={onLocationChange} config={BASEMENT_CONFIG} />;
    }
  }
};