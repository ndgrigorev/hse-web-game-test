export const STREET_CONFIG = {
  id: 'street',
  width: 800,
  height: 300,
  background: '/assets/images/backgrounds/street.jpg',
  backgroundMask: '/assets/images/backgrounds/street_mask.jpg',
  initialPosition: { x: 290, y: -125 },
  doors: [
    {
      id: "street_to_room",
      position: { x: 220, y: 240 },
      targetLocation: "room",
      spawnCoords: { x: -750, y: -135 }
    },
    {
      id: "street_to_shop",
      position: { x: 1800, y: 240 },
      targetLocation: "shop",
      spawnCoords: { x: -150, y: -135 }
    }
  ],
  objects: [],
  zoneMessages: [
    {
      id: "street_with_food",
      text: "Продавщица права. Мышей становится только больше, а Виктор не работает. Так долго продолжаться не может.",
      duration: 7000,
      zone: {
        x_left: -1000,
        x_right: 2000
      },
      repeat: false,
      conditions: {
        chapter1: { rat_food_taken: true }
      }
    }
  ]
};