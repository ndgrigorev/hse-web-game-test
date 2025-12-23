export const ROOM_PROLOGUE_CONFIG = {
  id: 'roomprologue',
  width: 800,
  height: 300,
  background: '/assets/images/backgrounds/room2.jpg',
  backgroundMask: '/assets/images/backgrounds/room_mask2.jpg',
  initialPosition: { x: 0, y: 0 },
  lights: '/assets/images/backgrounds/room_light2.png',
  doors: [
    {
      id: "room_to_basement",
      position: { x: 1300, y: 310 },
      targetLocation: "basement",
      spawnCoords: { x: -180, y: -150 }
    }
  ],
  objects: [],
  zoneMessages: []
};