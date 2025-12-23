export const SCRAPYARD_CONFIG = {
  id: 'scrapyard',
  width: 1600,
  height: 600,
  background: '/assets/images/backgrounds/scrapyard.png',
  backgroundMask: '/assets/images/backgrounds/scrapyard_mask.png',
  initialPosition: { x: -180, y: -80 },
  doors: [
    {
      id: "scrapyard_to_basement",
      position: { x: 1800, y: 400 },
      targetLocation: "basement",
      spawnCoords: { x: -180, y: -150 }
    }
  ],
  objects: [
    {
      id: "mouse_scrapyard",
      type: "mouse",
      position: { x: 1300, y: 400 },
      sprite: "/assets/images/objects/mouse1.png"
    }
  ]
};