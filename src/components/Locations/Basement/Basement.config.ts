export const BASEMENT_CONFIG = {
  id: 'basement',
  width: 800,
  height: 300,
  background: '/assets/images/backgrounds/background2.jpg',
  backgroundMask: '/assets/images/backgrounds/background_mask2.jpg',
  initialPosition: { x: -90, y: -125 },
  doors: [
    {
      id: "basement_to_room",
      position: { x: 420, y: 270 },
      targetLocation: "room",
      spawnCoords: { x: -750, y: -135 }
    }
  ],
  objects: [
    {
      id: "mice_group_2",
      type: "mice2",
      position: { x: 1000, y: 330 },
      sprite: "/assets/images/objects/mice2.png"
    }
  ],
  messages: [],
  zoneMessages: [
    {
      id: "basement_entrance",
      text: "Мышам нужен корм.",
      duration: 3000,
      zone: {
        x_left: -300,
        x_right: -80
      },
      repeat: true
    }
  ]
};